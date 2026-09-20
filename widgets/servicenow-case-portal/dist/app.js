/* ── helpers ─────────────────────────────────────────────────────────── */

function esc(v) {
  var d = document.createElement("div");
  d.textContent = v || "";
  return d.innerHTML;
}

function stripMentions(v) {
  // Remove Gainsight user-mention tokens like [gs_user:email@example.com]
  // so they do not appear as raw text in the rendered description.
  return String(v || "").replace(/\[gs_user:[^\]]+\]/g, "");
}

function slugify(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  var d = new Date(String(dateStr).replace(" ", "T"));
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ── API calls via Gainsight Connectors SDK (no middleware) ────────────
   Connectors must be called via a fresh window.WidgetServiceSDK instance,
   not the `sdk` object passed to init() — the two are separate objects. */

function getConnectorSdk() {
  if (!window.WidgetServiceSDK) return null;
  return new window.WidgetServiceSDK();
}

function apiGetMine() {
  var sdk = getConnectorSdk();
  if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
  return sdk.connectors.execute({ permalink: "servicenow-my-cases", method: "GET" });
}

function apiCreate(payload) {
  var sdk = getConnectorSdk();
  if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
  return sdk.connectors.execute({ permalink: "servicenow-case-create", method: "POST", payload: payload });
}

function apiEscalate(sysId, payload) {
  var sdk = getConnectorSdk();
  if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
  return sdk.connectors.execute({
    permalink: "servicenow-case-escalate",
    method: "PATCH",
    pathParams: { sys_id: sysId },
    payload: payload,
  });
}

function apiAddComment(sysId, comment) {
  var sdk = getConnectorSdk();
  if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
  return sdk.connectors.execute({
    permalink: "servicenow-case-add-comment",
    method: "PATCH",
    pathParams: { sys_id: sysId },
    payload: { comment: comment },
  });
}

function apiGetActivities(sysId) {
  var sdk = getConnectorSdk();
  if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
  return sdk.connectors.execute({
    permalink: "servicenow-case-activities",
    method: "GET",
    queryParams: { sysparm_query: "element_id=" + sysId },
  });
}

var EMPTY_DETAIL_HTML =
  '<div class="cp-empty">' +
    '<svg class="cp-empty-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9.5l5 5v9.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M14.5 4v4.5a.5.5 0 0 0 .5.5H19" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M8 12.5h8M8 15.5h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
    "</svg>" +
    '<p class="cp-placeholder">Select a case from the list, or create a new one, to see details here.</p>' +
  "</div>";

var STAT_SKELETON_HTML = (function () {
  var html = "";
  for (var i = 0; i < 4; i++) html += '<div class="cp-skel cp-skel-stat"></div>';
  return html;
})();

var LIST_SKELETON_HTML = (function () {
  var html = "";
  for (var i = 0; i < 4; i++) html += '<div class="cp-skel cp-skel-card"></div>';
  return html;
})();

/* ── widget entry point ─────────────────────────────────────────────── */

export async function init(sdk) {
  await sdk.whenReady();
  var root = sdk.getContainer();

  var listBody = root.querySelector("#cp-list-body");
  var detailPane = root.querySelector("#cp-detail-pane");
  var statsArea = root.querySelector("#cp-stats");
  var toastArea = root.querySelector("#cp-toast-area");
  var refreshBtn = root.querySelector("#cp-refresh");
  var newCaseBtn = root.querySelector("#cp-new-case");

  var cases = [];
  var selectedSysId = null;

  function showToast(text, type) {
    var toast = document.createElement("div");
    toast.className = "cp-toast " + (type === "success" ? "cp-toast-ok" : "cp-toast-err");
    toast.textContent = text;
    toastArea.appendChild(toast);
    setTimeout(function () {
      toast.classList.add("cp-toast-out");
      setTimeout(function () { toast.remove(); }, 200);
    }, type === "success" ? 4000 : 6000);
  }

  /* ── KPI stat strip ────────────────────────────────────────────────── */

  var OPEN_STATUSES = { "New": 1, "In Progress": 1, "Awaiting Info": 1 };
  var RESOLVED_STATUSES = { "Resolved": 1, "Closed": 1 };
  var CRITICAL_PRIORITIES = { "Critical": 1, "High": 1 };

  function renderStats() {
    var open = 0, critical = 0, resolved = 0;
    cases.forEach(function (c) {
      if (OPEN_STATUSES[c.status]) open++;
      if (RESOLVED_STATUSES[c.status]) resolved++;
      if (CRITICAL_PRIORITIES[c.priority]) critical++;
    });

    statsArea.innerHTML =
      '<div class="cp-stat-tile cp-stat-tile--total"><p class="cp-stat-label">Total</p><p class="cp-stat-value">' + cases.length + "</p></div>" +
      '<div class="cp-stat-tile cp-stat-tile--open"><p class="cp-stat-label">Open</p><p class="cp-stat-value">' + open + "</p></div>" +
      '<div class="cp-stat-tile cp-stat-tile--critical"><p class="cp-stat-label">Critical / High</p><p class="cp-stat-value">' + critical + "</p></div>" +
      '<div class="cp-stat-tile cp-stat-tile--resolved"><p class="cp-stat-label">Resolved</p><p class="cp-stat-value">' + resolved + "</p></div>";
  }

  function findCase(sysId) {
    for (var i = 0; i < cases.length; i++) {
      if (cases[i].sysId === sysId) return cases[i];
    }
    return null;
  }

  /* ── list pane ─────────────────────────────────────────────────────── */

  function renderList() {
    if (!cases.length) {
      listBody.innerHTML =
        '<div class="cp-empty" style="min-height:160px">' +
          '<svg class="cp-empty-icon" style="width:32px;height:32px" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
          "</svg>" +
          '<p class="cp-placeholder">You have not created any ServiceNow cases yet.</p>' +
        "</div>";
      return;
    }

    var html = '<div class="cp-list">';
    cases.forEach(function (c, idx) {
      var active = c.sysId === selectedSysId ? " cp-active" : "";
      html +=
        '<div class="cp-card' + active + '" data-sys-id="' + esc(c.sysId) + '" style="animation-delay:' + (idx * 0.04) + 's">' +
          '<p class="cp-card-title" title="' + esc(c.caseNumber + " — " + c.title) + '">' +
            esc(c.caseNumber) + " — " + esc(c.title) +
          "</p>" +
          '<div class="cp-card-meta">' +
            '<span class="cp-badge cp-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span>" +
            '<span class="cp-badge cp-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span>" +
            "<span>" + esc(formatDate(c.createdDate)) + "</span>" +
          "</div>" +
        "</div>";
    });
    html += "</div>";
    listBody.innerHTML = html;

    listBody.querySelectorAll(".cp-card").forEach(function (card) {
      card.onclick = function () {
        selectCase(card.getAttribute("data-sys-id"));
      };
    });
  }

  function loadCases(preserveSelection) {
    refreshBtn.disabled = true;
    refreshBtn.classList.add("cp-spin");
    listBody.innerHTML = LIST_SKELETON_HTML;
    statsArea.innerHTML = STAT_SKELETON_HTML;

    return apiGetMine()
      .then(function (result) {
        cases = Array.isArray(result) ? result : result.result || result.data || [];
        if (!preserveSelection || !findCase(selectedSysId)) selectedSysId = null;
        renderStats();
        renderList();
        if (selectedSysId) {
          renderDetail(findCase(selectedSysId));
        } else if (!cases.length) {
          renderPlaceholder();
        }
      })
      .catch(function (e) {
        listBody.innerHTML =
          '<p class="cp-status">Could not load your cases. Please sign in to the community and try again.</p>';
        cases = [];
        renderStats();
      })
      .finally(function () {
        refreshBtn.disabled = false;
        refreshBtn.classList.remove("cp-spin");
      });
  }

  function selectCase(sysId) {
    selectedSysId = sysId;
    renderList();
    renderDetail(findCase(sysId));
  }

  /* ── detail pane ───────────────────────────────────────────────────── */

  function renderPlaceholder() {
    detailPane.innerHTML = EMPTY_DETAIL_HTML;
  }

  function renderDetail(c) {
    if (!c) { renderPlaceholder(); return; }

    detailPane.innerHTML =
      '<div class="cp-detail-header">' +
        '<div>' +
          '<p class="cp-detail-case-title">' + esc(c.caseNumber) + " — " + esc(c.title) + "</p>" +
          '<div class="cp-card-meta">' +
            '<span class="cp-badge cp-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span>" +
            '<span class="cp-badge cp-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span>" +
            "<span>Opened " + esc(formatDate(c.createdDate)) + "</span>" +
          "</div>" +
        "</div>" +
      "</div>" +
      (c.description
        ? '<div class="cp-detail-row"><div class="cp-detail-label">Description</div><div class="cp-detail-value cp-detail-desc">' + esc(stripMentions(c.description)) + "</div></div>"
        : "") +
      '<div class="cp-row" id="cp-detail-actions">' +
        '<button type="button" class="cp-btn cp-btn-primary" id="cp-escalate-btn">Escalate</button>' +
        '<button type="button" class="cp-btn cp-btn-sec" id="cp-comment-btn">Add Comment</button>' +
      "</div>" +
      '<div id="cp-escalate-form"></div>' +
      '<hr class="cp-divider">' +
      '<p class="cp-comments-title">Comments</p>' +
      '<div id="cp-comments-list"><p class="cp-status">Loading comments&hellip;</p></div>' +
      '<div id="cp-comment-composer" style="display:none">' +
        '<label class="cp-label">Add a comment</label>' +
        '<textarea class="cp-comment-input" id="cp-comment-text" placeholder="Enter your comment..."></textarea>' +
        '<div class="cp-row">' +
          '<button type="button" class="cp-btn cp-btn-primary" id="cp-comment-submit">Submit Comment</button>' +
          '<button type="button" class="cp-btn cp-btn-sec" id="cp-comment-cancel">Cancel</button>' +
        "</div>" +
      "</div>";

    var detailActions = detailPane.querySelector("#cp-detail-actions");

    detailPane.querySelector("#cp-escalate-btn").onclick = function () {
      var container = detailPane.querySelector("#cp-escalate-form");
      detailActions.style.display = "none";
      container.innerHTML =
        '<div class="cp-form-group" style="margin-top:12px">' +
          '<label class="cp-label">Reason *</label>' +
          '<textarea class="cp-textarea" id="cp-esc-reason" placeholder="Explain why this case needs escalation"></textarea>' +
        "</div>" +
        '<div class="cp-row">' +
          '<button type="button" class="cp-btn cp-btn-primary" id="cp-esc-submit">Submit Escalation</button>' +
          '<button type="button" class="cp-btn cp-btn-sec" id="cp-esc-cancel">Cancel</button>' +
        "</div>";

      detailPane.querySelector("#cp-esc-cancel").onclick = function () {
        container.innerHTML = "";
        detailActions.style.display = "";
      };
      detailPane.querySelector("#cp-esc-submit").onclick = function () {
        var reason = detailPane.querySelector("#cp-esc-reason").value.trim();
        if (!reason) { showToast("Reason is required.", "error"); return; }
        var btn = detailPane.querySelector("#cp-esc-submit");
        btn.disabled = true;
        btn.textContent = "Escalating...";
        apiEscalate(c.sysId, { reason: reason, priority: "1", state: "10" })
          .then(function () {
            showToast("Case escalated successfully.", "success");
            loadCases(true);
          })
          .catch(function (e) {
            showToast(e.message || "Escalation failed.", "error");
            btn.disabled = false;
            btn.textContent = "Submit Escalation";
          });
      };
    };

    detailPane.querySelector("#cp-comment-btn").onclick = function () {
      var composer = detailPane.querySelector("#cp-comment-composer");
      composer.style.display = "block";
      detailPane.querySelector("#cp-comment-text").focus();
    };

    detailPane.querySelector("#cp-comment-cancel").onclick = function () {
      detailPane.querySelector("#cp-comment-text").value = "";
      detailPane.querySelector("#cp-comment-composer").style.display = "none";
    };

    detailPane.querySelector("#cp-comment-submit").onclick = function () {
      var text = detailPane.querySelector("#cp-comment-text").value.trim();
      if (!text) { showToast("Comment is required.", "error"); return; }
      var btn = detailPane.querySelector("#cp-comment-submit");
      btn.disabled = true;
      btn.textContent = "Submitting...";
      apiAddComment(c.sysId, text)
        .then(function () {
          showToast("Comment added successfully.", "success");
          detailPane.querySelector("#cp-comment-text").value = "";
          detailPane.querySelector("#cp-comment-composer").style.display = "none";
          loadComments(c.sysId);
        })
        .catch(function (e) {
          showToast(e.message || "Failed to add comment.", "error");
          btn.disabled = false;
          btn.textContent = "Submit Comment";
        });
    };

    function loadComments(sysId) {
      var list = detailPane.querySelector("#cp-comments-list");
      list.innerHTML = '<p class="cp-status">Loading comments&hellip;</p>';
      apiGetActivities(sysId)
        .then(function (comments) { renderComments(comments); })
        .catch(function (e) {
          list.innerHTML = '<p class="cp-comment-empty">Could not load comments: ' + esc(e.message) + "</p>";
        });
    }

    function renderComments(comments) {
      var list = detailPane.querySelector("#cp-comments-list");
      if (!comments || !comments.length) {
        list.innerHTML = '<p class="cp-comment-empty">No comments yet.</p>';
        return;
      }
      var html = "";
      comments.forEach(function (cm) {
        html +=
          '<div class="cp-comment-item">' +
            '<p class="cp-comment-text">' + esc(cm.comment) + "</p>" +
            '<p class="cp-comment-meta">' + esc(cm.createdBy || "System") + " · " + esc(formatDate(cm.createdOn)) + "</p>" +
          "</div>";
      });
      list.innerHTML = html;
    }

    loadComments(c.sysId);
  }

  /* ── create case form ─────────────────────────────────────────────── */

  function renderCreateForm() {
    selectedSysId = null;
    renderList();

    detailPane.innerHTML =
      '<p class="cp-pane-title" style="margin-bottom:14px">New Case</p>' +
      '<div class="cp-form-group">' +
        '<label class="cp-label">Title *</label>' +
        '<input class="cp-input" id="cp-c-title" placeholder="Briefly describe your issue">' +
      "</div>" +
      '<div class="cp-form-group">' +
        '<label class="cp-label">Description</label>' +
        '<textarea class="cp-textarea" id="cp-c-desc" placeholder="Detailed description"></textarea>' +
      "</div>" +
      '<div class="cp-form-group">' +
        '<label class="cp-label">Priority</label>' +
        '<select class="cp-select" id="cp-c-priority">' +
          '<option value="1">Critical</option>' +
          '<option value="2">High</option>' +
          '<option value="3" selected>Moderate</option>' +
          '<option value="4">Low</option>' +
        "</select>" +
      "</div>" +
      '<div class="cp-form-group">' +
        '<label class="cp-label">Category</label>' +
        '<input class="cp-input" id="cp-c-category" placeholder="e.g. Network">' +
      "</div>" +
      '<div class="cp-row">' +
        '<button type="button" class="cp-btn cp-btn-primary" id="cp-c-submit">Create Case</button>' +
        '<button type="button" class="cp-btn cp-btn-sec" id="cp-c-cancel">Cancel</button>' +
      "</div>";

    detailPane.querySelector("#cp-c-cancel").onclick = renderPlaceholder;
    detailPane.querySelector("#cp-c-submit").onclick = function () {
      var titleVal = detailPane.querySelector("#cp-c-title").value.trim();
      if (!titleVal) { showToast("Title is required.", "error"); return; }

      var payload = {
        title: titleVal,
        description: detailPane.querySelector("#cp-c-desc").value.trim(),
        priority: detailPane.querySelector("#cp-c-priority").value,
      };
      var cat = detailPane.querySelector("#cp-c-category").value.trim();
      if (cat) payload.category = cat;

      var btn = detailPane.querySelector("#cp-c-submit");
      btn.disabled = true;
      btn.textContent = "Creating...";

      apiCreate(payload)
        .then(function (result) {
          showToast("Case " + (result.caseNumber || "") + " created successfully.", "success");
          selectedSysId = result && result.sysId ? result.sysId : null;
          loadCases(true);
        })
        .catch(function (e) {
          showToast(e.message || "Failed to create case.", "error");
          btn.disabled = false;
          btn.textContent = "Create Case";
        });
    };
  }

  /* ── wire up and boot ─────────────────────────────────────────────── */

  refreshBtn.onclick = function () { loadCases(true); };
  newCaseBtn.onclick = renderCreateForm;

  sdk.on("destroy", function () {
    refreshBtn.onclick = null;
    newCaseBtn.onclick = null;
  });

  loadCases(false);
}
