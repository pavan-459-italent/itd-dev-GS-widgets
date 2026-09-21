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

function debounce(fn, wait) {
  var timer = null;
  return function () {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(null, args); }, wait);
  };
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

var EMPTY_ROW_HTML =
  '<tr><td colspan="7">' +
    '<div class="cp-empty">' +
      '<svg class="cp-empty-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>" +
      '<p class="cp-placeholder">No cases match your filters.</p>' +
    "</div>" +
  "</td></tr>";

var SKELETON_ROWS_HTML = (function () {
  var row =
    "<tr>" +
      '<td><div class="cp-skel cp-skel-cell" style="width:16px"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell"></div></td>' +
      '<td><div class="cp-skel cp-skel-cell" style="width:24px"></div></td>' +
    "</tr>";
  return row + row + row + row + row;
})();

var EDIT_ICON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M4 20l.9-4L16.5 4.4a1.5 1.5 0 0 1 2.1 0l1 1a1.5 1.5 0 0 1 0 2.1L8 19.1 4 20Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
  "</svg>";

/* ── widget entry point ─────────────────────────────────────────────── */

export async function init(sdk) {
  await sdk.whenReady();
  var root = sdk.getContainer();

  var tableBody = root.querySelector("#cp-table-body");
  var countEl = root.querySelector("#cp-f-count");
  var toastArea = root.querySelector("#cp-toast-area");
  var refreshBtn = root.querySelector("#cp-refresh");
  var newCaseBtn = root.querySelector("#cp-new-case");
  var searchInput = root.querySelector("#cp-f-search");
  var statusSelect = root.querySelector("#cp-f-status");
  var prioritySelect = root.querySelector("#cp-f-priority");
  var clearBtn = root.querySelector("#cp-f-clear");
  var modalBackdrop = root.querySelector("#cp-modal-backdrop");
  var modalBody = root.querySelector("#cp-modal-body");
  var modalClose = root.querySelector("#cp-modal-close");
  var theadRow = root.querySelector("thead tr");

  var allCases = [];
  var expandedSysId = null;
  var commentsCache = {};
  var filters = { search: "", status: "", priority: "" };
  var sort = { field: "createdDate", dir: "desc" };

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

  function findCase(sysId) {
    for (var i = 0; i < allCases.length; i++) {
      if (allCases[i].sysId === sysId) return allCases[i];
    }
    return null;
  }

  /* ── filtering + sorting (client-side) ────────────────────────────── */

  function getVisibleCases() {
    var q = filters.search.trim().toLowerCase();
    var list = allCases.filter(function (c) {
      if (filters.status && c.status !== filters.status) return false;
      if (filters.priority && c.priority !== filters.priority) return false;
      if (q) {
        var hay = (
          (c.caseNumber || "") + " " +
          (c.title || "") + " " +
          (c.description || "")
        ).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    var field = sort.field;
    var dir = sort.dir === "asc" ? 1 : -1;
    list.sort(function (a, b) {
      var av = a[field] || "";
      var bv = b[field] || "";
      if (field === "createdDate") {
        av = new Date(String(av).replace(" ", "T")).getTime() || 0;
        bv = new Date(String(bv).replace(" ", "T")).getTime() || 0;
        return (av - bv) * dir;
      }
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

    return list;
  }

  function updateSortIndicators() {
    theadRow.querySelectorAll("th[data-sort]").forEach(function (th) {
      th.classList.remove("cp-sort-asc", "cp-sort-desc");
      if (th.getAttribute("data-sort") === sort.field) {
        th.classList.add(sort.dir === "asc" ? "cp-sort-asc" : "cp-sort-desc");
      }
    });
  }

  theadRow.querySelectorAll("th[data-sort]").forEach(function (th) {
    th.onclick = function () {
      var field = th.getAttribute("data-sort");
      if (sort.field === field) {
        sort.dir = sort.dir === "asc" ? "desc" : "asc";
      } else {
        sort.field = field;
        sort.dir = "asc";
      }
      updateSortIndicators();
      renderTable();
    };
  });
  updateSortIndicators();

  /* ── table rendering ───────────────────────────────────────────────── */

  function renderTable() {
    var visible = getVisibleCases();
    countEl.textContent = visible.length + " of " + allCases.length + " case" + (allCases.length === 1 ? "" : "s");

    if (!visible.length) {
      tableBody.innerHTML = allCases.length ? EMPTY_ROW_HTML : (
        '<tr><td colspan="7"><div class="cp-empty">' +
          '<svg class="cp-empty-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9.5l5 5v9.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
            '<path d="M14.5 4v4.5a.5.5 0 0 0 .5.5H19" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' +
          "</svg>" +
          '<p class="cp-placeholder">You have not created any ServiceNow cases yet.</p>' +
        "</div></td></tr>"
      );
      return;
    }

    var html = "";
    visible.forEach(function (c) {
      var isExpanded = c.sysId === expandedSysId;
      html +=
        '<tr class="cp-row' + (isExpanded ? " cp-row-expanded" : "") + '" data-sys-id="' + esc(c.sysId) + '">' +
          "<td></td>" +
          "<td>" + esc(c.caseNumber) + "</td>" +
          '<td class="cp-td-title" title="' + esc(c.title) + '">' + esc(c.title) + "</td>" +
          '<td><span class="cp-badge cp-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span></td>" +
          '<td><span class="cp-badge cp-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span></td>" +
          '<td class="cp-td-muted">' + esc(formatDate(c.createdDate)) + "</td>" +
          "<td>" +
            '<button type="button" class="cp-edit-btn' + (isExpanded ? " cp-edit-btn-active" : "") + '" data-edit-sys-id="' + esc(c.sysId) + '" title="Edit / escalate / comment">' +
              EDIT_ICON_SVG +
            "</button>" +
          "</td>" +
        "</tr>";
      if (isExpanded) {
        html += '<tr class="cp-expand-row"><td colspan="7"><div class="cp-expand-panel" id="cp-expand-panel"></div></td></tr>';
      }
    });
    tableBody.innerHTML = html;

    tableBody.querySelectorAll("[data-edit-sys-id]").forEach(function (btn) {
      btn.onclick = function () {
        var sysId = btn.getAttribute("data-edit-sys-id");
        expandedSysId = expandedSysId === sysId ? null : sysId;
        renderTable();
      };
    });

    if (expandedSysId) {
      var panel = tableBody.querySelector("#cp-expand-panel");
      if (panel) renderExpandPanel(panel, findCase(expandedSysId));
    }
  }

  /* ── inline expand panel: description, escalate, comments ───────────── */

  function renderExpandPanel(panel, c) {
    if (!c) return;

    panel.innerHTML =
      '<div class="cp-expand-grid">' +
        '<div>' +
          (c.description
            ? '<div class="cp-detail-row"><div class="cp-detail-label">Description</div><div class="cp-detail-value cp-detail-desc">' + esc(stripMentions(c.description)) + "</div></div>"
            : '<p class="cp-status">No description provided.</p>') +
          '<div class="cp-row" id="cp-detail-actions">' +
            '<button type="button" class="cp-btn cp-btn-primary cp-btn-sm" id="cp-escalate-btn">Escalate</button>' +
          "</div>" +
          '<div id="cp-escalate-form"></div>' +
        "</div>" +
        '<div>' +
          '<p class="cp-comments-title">Comments</p>' +
          '<div class="cp-comments-list" id="cp-comments-list"><p class="cp-status">Loading comments&hellip;</p></div>' +
          '<label class="cp-label">Add a comment</label>' +
          '<textarea class="cp-comment-input" id="cp-comment-text" placeholder="Enter your comment..."></textarea>' +
          '<button type="button" class="cp-btn cp-btn-primary cp-btn-sm" id="cp-comment-submit">Submit Comment</button>' +
        "</div>" +
      "</div>";

    var detailActions = panel.querySelector("#cp-detail-actions");

    panel.querySelector("#cp-escalate-btn").onclick = function () {
      var container = panel.querySelector("#cp-escalate-form");
      detailActions.style.display = "none";
      container.innerHTML =
        '<div class="cp-form-group" style="margin-top:10px">' +
          '<label class="cp-label">Reason *</label>' +
          '<textarea class="cp-textarea" id="cp-esc-reason" placeholder="Explain why this case needs escalation"></textarea>' +
        "</div>" +
        '<div class="cp-row">' +
          '<button type="button" class="cp-btn cp-btn-primary cp-btn-sm" id="cp-esc-submit">Submit Escalation</button>' +
          '<button type="button" class="cp-btn cp-btn-sec cp-btn-sm" id="cp-esc-cancel">Cancel</button>' +
        "</div>";

      panel.querySelector("#cp-esc-cancel").onclick = function () {
        container.innerHTML = "";
        detailActions.style.display = "";
      };
      panel.querySelector("#cp-esc-submit").onclick = function () {
        var reason = panel.querySelector("#cp-esc-reason").value.trim();
        if (!reason) { showToast("Reason is required.", "error"); return; }
        var btn = panel.querySelector("#cp-esc-submit");
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

    panel.querySelector("#cp-comment-submit").onclick = function () {
      var text = panel.querySelector("#cp-comment-text").value.trim();
      if (!text) { showToast("Comment is required.", "error"); return; }
      var btn = panel.querySelector("#cp-comment-submit");
      btn.disabled = true;
      btn.textContent = "Submitting...";
      apiAddComment(c.sysId, text)
        .then(function () {
          showToast("Comment added successfully.", "success");
          panel.querySelector("#cp-comment-text").value = "";
          delete commentsCache[c.sysId];
          loadComments(c.sysId, panel);
        })
        .catch(function (e) {
          showToast(e.message || "Failed to add comment.", "error");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "Submit Comment";
        });
    };

    loadComments(c.sysId, panel);
  }

  function loadComments(sysId, panel) {
    var list = panel.querySelector("#cp-comments-list");
    if (commentsCache[sysId]) {
      renderComments(list, commentsCache[sysId]);
      return;
    }
    list.innerHTML = '<p class="cp-status">Loading comments&hellip;</p>';
    apiGetActivities(sysId)
      .then(function (comments) {
        commentsCache[sysId] = comments || [];
        renderComments(list, commentsCache[sysId]);
      })
      .catch(function (e) {
        list.innerHTML = '<p class="cp-comment-empty">Could not load comments: ' + esc(e.message) + "</p>";
      });
  }

  function renderComments(list, comments) {
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

  /* ── load cases ────────────────────────────────────────────────────── */

  function loadCases(preserveExpanded) {
    refreshBtn.disabled = true;
    refreshBtn.classList.add("cp-spin");
    tableBody.innerHTML = SKELETON_ROWS_HTML;
    countEl.textContent = "";

    return apiGetMine()
      .then(function (result) {
        allCases = Array.isArray(result) ? result : result.result || result.data || [];
        if (!preserveExpanded || !findCase(expandedSysId)) expandedSysId = null;
        renderTable();
      })
      .catch(function () {
        tableBody.innerHTML =
          '<tr><td colspan="7"><p class="cp-status">Could not load your cases. Please sign in to the community and try again.</p></td></tr>';
        allCases = [];
        countEl.textContent = "";
      })
      .finally(function () {
        refreshBtn.disabled = false;
        refreshBtn.classList.remove("cp-spin");
      });
  }

  /* ── client-side filters: debounced search + instant selects ────────── */

  var applyFiltersDebounced = debounce(function () {
    filters.search = searchInput.value;
    renderTable();
  }, 300);

  searchInput.oninput = applyFiltersDebounced;
  statusSelect.onchange = function () { filters.status = statusSelect.value; renderTable(); };
  prioritySelect.onchange = function () { filters.priority = prioritySelect.value; renderTable(); };
  clearBtn.onclick = function () {
    searchInput.value = "";
    statusSelect.value = "";
    prioritySelect.value = "";
    filters = { search: "", status: "", priority: "" };
    renderTable();
  };

  /* ── new case modal ────────────────────────────────────────────────── */

  function openModal() {
    modalBody.innerHTML =
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
        '<select class="cp-select" id="cp-c-priority" style="width:100%">' +
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

    modalBackdrop.style.display = "flex";
    modalBody.querySelector("#cp-c-title").focus();

    modalBody.querySelector("#cp-c-cancel").onclick = closeModal;
    modalBody.querySelector("#cp-c-submit").onclick = function () {
      var titleVal = modalBody.querySelector("#cp-c-title").value.trim();
      if (!titleVal) { showToast("Title is required.", "error"); return; }

      var payload = {
        title: titleVal,
        description: modalBody.querySelector("#cp-c-desc").value.trim(),
        priority: modalBody.querySelector("#cp-c-priority").value,
      };
      var cat = modalBody.querySelector("#cp-c-category").value.trim();
      if (cat) payload.category = cat;

      var btn = modalBody.querySelector("#cp-c-submit");
      btn.disabled = true;
      btn.textContent = "Creating...";

      apiCreate(payload)
        .then(function (result) {
          showToast("Case " + (result.caseNumber || "") + " created successfully.", "success");
          expandedSysId = result && result.sysId ? result.sysId : null;
          closeModal();
          loadCases(true);
        })
        .catch(function (e) {
          showToast(e.message || "Failed to create case.", "error");
          btn.disabled = false;
          btn.textContent = "Create Case";
        });
    };
  }

  function closeModal() {
    modalBackdrop.style.display = "none";
    modalBody.innerHTML = "";
  }

  modalClose.onclick = closeModal;
  modalBackdrop.onclick = function (evt) {
    if (evt.target === modalBackdrop) closeModal();
  };

  /* ── wire up and boot ─────────────────────────────────────────────── */

  refreshBtn.onclick = function () { loadCases(true); };
  newCaseBtn.onclick = openModal;

  sdk.on("destroy", function () {
    refreshBtn.onclick = null;
    newCaseBtn.onclick = null;
  });

  loadCases(false);
}
