(function () {
  "use strict";

  var PANEL_ID = "sn-topic-case-panel";

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

  function isTopicPage() {
    return /^\/[^/]+-\d+\/[^/?#]+/.test(window.location.pathname);
  }

  function getTopic() {
    var h = document.querySelector("h1");
    return {
      title: h ? h.textContent.trim() : "Community topic",
      url: (window.location.origin + window.location.pathname).replace(
        /\/+$/,
        ""
      ),
    };
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

  /* ── deflection helpers ─────────────────────────────────────────────── */

function isDeflectionAvailable() {
  return typeof window !== "undefined" && window.ChWebSdk && typeof window.ChWebSdk.Content === "object" && typeof window.ChWebSdk.Content.search === "function";
}

function getChWebSdk() {
  if (!isDeflectionAvailable()) return null;
  return window.ChWebSdk;
}

function getContentTypeLabel(contentType) {
  var map = {
    article: "Knowledge Base Article",
    question: "Community Question",
    discussion: "Community Discussion",
    conversation: "Community Conversation",
    idea: "Ideation",
    productUpdate: "Product Update",
    event: "Event"
  };
  return map[contentType] || "Community Content";
}

function groupResultsBySource(results) {
  var kb = [];
  var community = [];
  var i, r;
  for (i = 0; i < results.length; i++) {
    r = results[i];
    if (String(r.contentType || "").toLowerCase() === "article") {
      kb.push(r);
    } else {
      community.push(r);
    }
  }
  return { kb: kb, community: community };
}

function resetToInitialState() {
  createBtn.style.display = "block";
  body.innerHTML = "";
  loadCases();
}

  /* ── API calls via Gainsight Connectors SDK (no middleware) ────────── */

  function getSdk() {
    if (!window.WidgetServiceSDK) return null;
    return new window.WidgetServiceSDK();
  }

  function apiGet() {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-cases",
      method: "GET",
    });
  }

  function apiCreate(payload) {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-case-create",
      method: "POST",
      payload: payload,
    });
  }

  function apiEscalate(sysId, payload) {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-case-escalate",
      method: "PATCH",
      pathParams: { sys_id: sysId },
      payload: payload,
    });
  }

  function apiGetMine() {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-my-cases",
      method: "GET",
    });
  }

  function apiAddComment(sysId, comment) {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-case-add-comment",
      method: "PATCH",
      pathParams: { sys_id: sysId },
      payload: { comment: comment },
    });
  }

  function apiGetActivities(sysId) {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-case-activities",
      method: "GET",
      pathParams: { sys_id: sysId },
    });
  }

  /* ── styles ──────────────────────────────────────────────────────────── */

  function addStyles() {
    if (document.getElementById("sn-case-css")) return;
    var s = document.createElement("style");
    s.id = "sn-case-css";
    s.textContent =
      "#" + PANEL_ID + "{padding:16px;font-family:'Inter',system-ui,-apple-system,sans-serif;border-radius:12px;background:#DCF3FA;box-shadow:inset 5px 0 0 0 #4FC1E8,0 1px 3px rgba(0,0,0,0.10),0 1px 2px rgba(0,0,0,0.06);color:#1e1e2e;box-sizing:border-box;max-width:480px;margin:0 0 16px 0}" +
      "#" + PANEL_ID + " .sn-header{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px}" +
      "#" + PANEL_ID + " .sn-title{margin:0;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#444458}" +
      "#" + PANEL_ID + " .sn-actions{display:flex;align-items:center;gap:8px}" +
      "#" + PANEL_ID + " .sn-btn{font-family:inherit;font-size:0.75rem;font-weight:600;padding:6px 12px;border-radius:6px;border:1px solid rgba(0,0,0,0.12);cursor:pointer;background:#0E6FFF;color:#fff;border-color:#0E6FFF}" +
      "#" + PANEL_ID + " .sn-btn:hover:not(:disabled){background:#094db5}" +
      "#" + PANEL_ID + " .sn-btn-sec{background:#fff;color:#1e1e2e;border-color:rgba(0,0,0,0.12)}" +
      "#" + PANEL_ID + " .sn-btn-sec:hover:not(:disabled){background:#4FC1E8;color:#fff}" +
      "#" + PANEL_ID + " .sn-btn:disabled{opacity:0.5;cursor:not-allowed}" +
      "#" + PANEL_ID + " .sn-refresh{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;font-size:0.875rem;line-height:1;color:#1e1e2e;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:6px;cursor:pointer}" +
      "#" + PANEL_ID + " .sn-refresh:hover:not(:disabled){background:#4FC1E8;color:#fff}" +
      "#" + PANEL_ID + " .sn-refresh:disabled{opacity:0.4;cursor:not-allowed}" +
      "#" + PANEL_ID + " .sn-spin{animation:sn-spin 0.6s linear infinite}" +
      "@keyframes sn-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}" +
      "#" + PANEL_ID + " .sn-status{font-size:0.75rem;color:#5a5a72;padding:8px 0}" +
      "#" + PANEL_ID + " .sn-card{padding:10px;border:1px solid #bfdbfe;border-radius:8px;background:#fff;font-size:0.8125rem;margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-card-title{font-weight:600;color:#1e1e2e;margin:0 0 4px;line-height:1.3;min-height:2.6em;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis}" +
      "#" + PANEL_ID + " .sn-card-meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:0.6875rem;color:#5a5a72}" +
      "#" + PANEL_ID + " .sn-badge{display:inline-block;padding:1px 7px;border-radius:999px;font-size:0.625rem;font-weight:600;color:#fff;background:#8a8aa3;text-transform:uppercase}" +
      "#" + PANEL_ID + " .sn-badge-critical,#" + PANEL_ID + " .sn-badge-high{background:#d9455f}" +
      "#" + PANEL_ID + " .sn-badge-moderate{background:#d68a1f}" +
      "#" + PANEL_ID + " .sn-badge-low{background:#3aa06a}" +
      "#" + PANEL_ID + " .sn-badge-new,#" + PANEL_ID + " .sn-badge-open,#" + PANEL_ID + " .sn-badge-in-progress{background:#0E6FFF}" +
      "#" + PANEL_ID + " .sn-badge-closed,#" + PANEL_ID + " .sn-badge-resolved,#" + PANEL_ID + " .sn-badge-cancelled{background:#6b7280}" +
      "#" + PANEL_ID + " .sn-badge-awaiting-info{background:#d68a1f}" +
      "#" + PANEL_ID + " .sn-msg{padding:10px;border-radius:6px;font-size:0.8125rem;margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-msg-ok{background:#e6f9ed;color:#1f7a3d}" +
      "#" + PANEL_ID + " .sn-msg-err{background:#fdecec;color:#9e2b2b}" +
      "#" + PANEL_ID + " .sn-form-group{margin-bottom:10px}" +
      "#" + PANEL_ID + " .sn-label{display:block;font-size:0.75rem;font-weight:600;color:#444458;margin-bottom:4px}" +
      "#" + PANEL_ID + " .sn-input,#" + PANEL_ID + " .sn-textarea,#" + PANEL_ID + " .sn-select{width:100%;padding:8px 10px;font-family:inherit;font-size:0.8125rem;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-sizing:border-box}" +
      "#" + PANEL_ID + " .sn-textarea{min-height:80px;resize:vertical}" +
      "#" + PANEL_ID + " .sn-row{display:flex;gap:10px;margin-top:12px}" +
      "#" + PANEL_ID + " .sn-detail-row{margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-detail-label{font-size:0.6875rem;font-weight:600;color:#444458;text-transform:uppercase;margin-bottom:2px}" +
      "#" + PANEL_ID + " .sn-detail-value{color:#1e1e2e;line-height:1.4;font-size:0.8125rem}" +
      "#" + PANEL_ID + " .sn-detail-desc{background:#fff;padding:10px;border-radius:6px;border:1px solid rgba(0,0,0,0.08);white-space:pre-wrap}" +
      "#" + PANEL_ID + " .sn-divider{border:none;border-top:1px dashed #7fb8d6;margin:16px 0 12px}" +
      "#" + PANEL_ID + " .sn-subheader{margin:0 0 8px;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#0a5a8a}" +
      "#" + PANEL_ID + " .sn-mine-list{display:flex;flex-direction:column;gap:8px;max-height:270px;overflow-y:auto}" +
      "#" + PANEL_ID + " .sn-mine-card{padding:10px;border:1px solid #d8ecf4;border-left:3px solid #4FC1E8;border-radius:8px;background:#f7fcfe;font-size:0.8125rem;cursor:pointer}" +
      "#" + PANEL_ID + " .sn-mine-card:hover{border-color:#0E6FFF}" +
      "#" + PANEL_ID + " #sn-back-btn{display:none}" +
      "#" + PANEL_ID + " .sn-deflect-intro{font-size:0.8125rem;color:#5a5a72;margin-bottom:12px}" +
      "#" + PANEL_ID + " .sn-deflect-input{width:100%;padding:8px 10px;font-family:inherit;font-size:0.8125rem;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-sizing:border-box;min-height:60px;resize:vertical;margin-bottom:10px}" +
      "#" + PANEL_ID + " .sn-deflect-actions{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}" +
      "#" + PANEL_ID + " .sn-deflect-results{margin-top:12px}" +
      "#" + PANEL_ID + " .sn-deflect-section{margin-bottom:12px}" +
      "#" + PANEL_ID + " .sn-deflect-section-title{margin:0 0 6px;font-size:0.6875rem;font-weight:700;text-transform:uppercase;color:#444458}" +
      "#" + PANEL_ID + " .sn-deflect-item{padding:10px;border:1px solid #d8ecf4;border-left:3px solid #4FC1E8;border-radius:8px;background:#f7fcfe;font-size:0.8125rem;margin-bottom:8px;cursor:pointer}" +
      "#" + PANEL_ID + " .sn-deflect-item:hover{border-color:#0E6FFF}" +
      "#" + PANEL_ID + " .sn-deflect-item-title{font-weight:600;color:#1e1e2e;margin:0 0 4px}" +
      "#" + PANEL_ID + " .sn-deflect-item-excerpt{color:#5a5a72;font-size:0.75rem;line-height:1.4;margin:0 0 6px}" +
      "#" + PANEL_ID + " .sn-deflect-item-meta{font-size:0.6875rem;color:#8a8aa3}" +
      "#" + PANEL_ID + " .sn-deflect-empty{font-size:0.8125rem;color:#5a5a72;padding:8px 0}" +
      "#" + PANEL_ID + " .sn-deflect-solved{margin-top:12px;padding:10px;border-radius:6px;background:#e6f9ed;color:#1f7a3d;font-size:0.8125rem}" +
      "#" + PANEL_ID + " .sn-comments{margin-top:12px}" +
      "#" + PANEL_ID + " .sn-comments-title{margin:0 0 8px;font-size:0.6875rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#444458}" +
      "#" + PANEL_ID + " .sn-comment-item{padding:10px;border:1px solid rgba(0,0,0,0.08);border-radius:8px;background:#fff;font-size:0.8125rem;margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-comment-text{margin:0 0 6px;color:#1e1e2e;white-space:pre-wrap;word-break:break-word}" +
      "#" + PANEL_ID + " .sn-comment-meta{font-size:0.6875rem;color:#8a8aa3}" +
      "#" + PANEL_ID + " .sn-comment-empty{font-size:0.8125rem;color:#5a5a72;padding:8px 0}" +
      "#" + PANEL_ID + " .sn-comment-composer{margin-top:12px}" +
      "#" + PANEL_ID + " .sn-comment-input{width:100%;padding:8px 10px;font-family:inherit;font-size:0.8125rem;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-sizing:border-box;min-height:70px;resize:vertical;margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-chevron{display:inline-block;margin-left:6px;font-size:0.7em;color:#5a5a72;transition:transform 0.15s ease}" +
      "#" + PANEL_ID + " .sn-mine-card.sn-expanded .sn-chevron{transform:rotate(180deg)}";
    document.head.appendChild(s);
  }

  /* ── main widget ─────────────────────────────────────────────────────── */

  function init() {
    if (!isTopicPage() || document.getElementById(PANEL_ID)) return;

    if (!window.WidgetServiceSDK) {
      setTimeout(init, 500);
      return;
    }

    var sidebar =
      document.querySelector(".module.Sidebarmodule") ||
      document.querySelector(".qa-div-sidebar, aside, [class*='sidebar']");
    if (!sidebar) {
      setTimeout(init, 500);
      return;
    }

    /* Probe authentication before rendering anything: this panel must only
       be shown to logged-in Community users, never anonymous visitors. */
    apiGetMine()
      .then(function () { start(sidebar); })
      .catch(function () {
        // servicenow-my-cases only fails when the visitor is not authenticated;
        // treat any failure here as "not logged in" and do not render the panel.
      });
  }

  function start(sidebar) {
    addStyles();
    var topic = getTopic();

    var root = document.createElement("section");
    root.id = PANEL_ID;
    root.innerHTML =
      '<div class="sn-header">' +
        '<p class="sn-title">Support Cases</p>' +
        '<div class="sn-actions">' +
          '<button type="button" class="sn-refresh" id="sn-refresh" title="Refresh">\u21BB</button>' +
          '<button type="button" class="sn-btn" id="sn-create-btn">Create Case</button>' +
        '</div>' +
      '</div>' +
      '<div id="sn-msg-area"></div>' +
      '<p class="sn-subheader">Related Case</p>' +
      '<div id="sn-body"><p class="sn-status">Loading cases&hellip;</p></div>' +
      '<hr class="sn-divider">' +
      '<p class="sn-subheader">My ServiceNow Cases</p>' +
      '<div id="sn-mine-body"><p class="sn-status">Loading your cases&hellip;</p></div>';

    sidebar.insertBefore(root, sidebar.firstChild);

    var body = root.querySelector("#sn-body");
    var mineBody = root.querySelector("#sn-mine-body");
    var msgArea = root.querySelector("#sn-msg-area");
    var refreshBtn = root.querySelector("#sn-refresh");
    var createBtn = root.querySelector("#sn-create-btn");

    function showMsg(text, type) {
      msgArea.innerHTML =
        '<div class="sn-msg ' + (type === "success" ? "sn-msg-ok" : "sn-msg-err") + '">' +
        esc(text) + "</div>";
      if (type === "success") setTimeout(function () { msgArea.innerHTML = ""; }, 5000);
    }

    function clearMsg() { msgArea.innerHTML = ""; }

    function findTopicCase(cases) {
      var topicUrl = topic.url.toLowerCase();
      var topicTitle = topic.title.toLowerCase().trim();
      var i, desc, caseTitle;

      for (i = 0; i < cases.length; i++) {
        desc = String(cases[i].description || "").toLowerCase();
        if (desc.indexOf(topicUrl) !== -1) return cases[i];
      }

      if (topicTitle) {
        for (i = 0; i < cases.length; i++) {
          caseTitle = String(cases[i].title || "").toLowerCase();
          if (caseTitle.indexOf("[community]") !== -1 && caseTitle.indexOf(topicTitle) !== -1) return cases[i];
        }
      }

      var pathOnly = window.location.pathname.toLowerCase().replace(/\/+$/, "");
      for (i = 0; i < cases.length; i++) {
        desc = String(cases[i].description || "").toLowerCase();
        if (desc.indexOf(pathOnly) !== -1) return cases[i];
      }

      return null;
    }

    /* ── my other cases (below the topic case) ──────────────────────────── */

    function renderMineList(cases) {
      if (!cases.length) {
        mineBody.innerHTML = '<p class="sn-status">You have no other open cases.</p>';
        return;
      }

      var html = '<div class="sn-mine-list">';
      cases.forEach(function (c, idx) {
        html +=
          '<div class="sn-mine-card" data-mine-idx="' + idx + '">' +
            '<p class="sn-card-title" title="' + esc(c.caseNumber + " — " + c.title) + '">' + esc(c.caseNumber) + " — " + esc(c.title) + '<span class="sn-chevron">\u25BC</span></p>' +
            '<div class="sn-card-meta">' +
              '<span class="sn-badge sn-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span>" +
              '<span class="sn-badge sn-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span>" +
              "<span>" + esc(formatDate(c.createdDate)) + "</span>" +
            "</div>" +
            '<div class="sn-mine-detail" data-mine-detail="' + idx + '" style="display:none"></div>' +
          "</div>";
      });
      html += "</div>";
      mineBody.innerHTML = html;

      function collapseAll() {
        mineBody.querySelectorAll(".sn-mine-detail").forEach(function (d) { d.style.display = "none"; });
        mineBody.querySelectorAll(".sn-mine-card").forEach(function (cd) { cd.classList.remove("sn-expanded"); });
      }

      mineBody.querySelectorAll(".sn-mine-card").forEach(function (card) {
        card.onclick = function (evt) {
          if (evt.target.closest(".sn-mine-detail")) return;
          var idx = parseInt(card.getAttribute("data-mine-idx"), 10);
          var c = cases[idx];
          var detail = card.querySelector(".sn-mine-detail");
          var isOpen = detail.style.display !== "none";
          collapseAll();
          if (isOpen) return;

          card.classList.add("sn-expanded");
          detail.style.display = "";
          detail.innerHTML =
            (c.description ? '<div class="sn-detail-row" style="margin-top:8px"><div class="sn-detail-label">Description</div><div class="sn-detail-value sn-detail-desc">' + esc(stripMentions(c.description)) + "</div></div>" : "") +
            '<div class="sn-row" data-mine-actions="' + idx + '">' +
              '<button type="button" class="sn-btn" data-mine-escalate="' + idx + '">Escalate</button>' +
              '<button type="button" class="sn-btn sn-btn-sec" data-mine-close="' + idx + '">Close</button>' +
            "</div>" +
            '<div data-mine-esc-form="' + idx + '"></div>';

          detail.querySelector("[data-mine-close]").onclick = function (e) {
            e.stopPropagation();
            collapseAll();
          };

          var mineActions = detail.querySelector("[data-mine-actions]");

          detail.querySelector("[data-mine-escalate]").onclick = function (e) {
            e.stopPropagation();
            var formHolder = detail.querySelector("[data-mine-esc-form]");
            mineActions.style.display = "none";
            formHolder.innerHTML =
              '<div class="sn-form-group" style="margin-top:12px">' +
                '<label class="sn-label">Reason *</label>' +
                '<textarea class="sn-textarea" data-mine-esc-reason></textarea>' +
              "</div>" +
              '<div class="sn-row">' +
                '<button type="button" class="sn-btn" data-mine-esc-submit>Submit Escalation</button>' +
                '<button type="button" class="sn-btn sn-btn-sec" data-mine-esc-cancel>Cancel</button>' +
              "</div>";

            formHolder.querySelector("[data-mine-esc-cancel]").onclick = function (ev) {
              ev.stopPropagation();
              formHolder.innerHTML = "";
              mineActions.style.display = "";
            };
            formHolder.querySelector("[data-mine-esc-submit]").onclick = function (ev) {
              ev.stopPropagation();
              var reason = formHolder.querySelector("[data-mine-esc-reason]").value.trim();
              if (!reason) { showMsg("Reason is required.", "error"); return; }
              var btn = formHolder.querySelector("[data-mine-esc-submit]");
              btn.disabled = true;
              btn.textContent = "Escalating...";
              clearMsg();
              apiEscalate(c.sysId, { reason: reason, priority: "1", state: "10" })
                .then(function () {
                  showMsg("Case escalated successfully.", "success");
                  loadMine();
                })
                .catch(function (err) {
                  showMsg(err.message || "Escalation failed.", "error");
                  btn.disabled = false;
                  btn.textContent = "Submit Escalation";
                });
            };
          };
        };
      });
    }

    var currentTopicSysId = null;

    function loadMine() {
      mineBody.innerHTML = '<p class="sn-status">Loading your cases&hellip;</p>';
      apiGetMine()
        .then(function (result) {
          var mine = Array.isArray(result) ? result : result.result || result.data || [];
          if (currentTopicSysId) {
            mine = mine.filter(function (c) { return c.sysId !== currentTopicSysId; });
          }
          renderMineList(mine);
        })
        .catch(function (e) {
          mineBody.innerHTML = '<p class="sn-status">Failed to load your cases: ' + esc(e.message) + "</p>";
        });
    }

    /* ── detail view ──────────────────────────────────────────────────── */

    function renderDetail(c) {
      createBtn.style.display = "none";
      body.innerHTML =
        '<div class="sn-card">' +
          '<p class="sn-card-title">' + esc(c.caseNumber) + " — " + esc(c.title) + "</p>" +
          '<div class="sn-card-meta">' +
            '<span class="sn-badge sn-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span>" +
            '<span class="sn-badge sn-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span>" +
            "<span>" + esc(formatDate(c.createdDate)) + "</span>" +
          "</div>" +
        "</div>" +
        (c.description ? '<div class="sn-detail-row"><div class="sn-detail-label">Description</div><div class="sn-detail-value sn-detail-desc">' + esc(stripMentions(c.description)) + "</div></div>" : "") +
        '<div class="sn-row" id="sn-detail-actions">' +
          '<button type="button" class="sn-btn" id="sn-escalate-btn">Escalate</button>' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-comment-btn">Add Comment</button>' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-back-btn">Back</button>' +
        "</div>" +
        '<div id="sn-escalate-form"></div>' +
        '<div class="sn-comments" id="sn-comments-section">' +
          '<p class="sn-comments-title">Comments</p>' +
          '<div id="sn-comments-list"><p class="sn-status">Loading comments...</p></div>' +
          '<div class="sn-comment-composer" style="display:none" id="sn-comment-composer">'
            '<label class="sn-label">Add a comment</label>' +
            '<textarea class="sn-comment-input" id="sn-comment-text" placeholder="Enter your comment..."></textarea>' +
            '<div class="sn-row">' +
              '<button type="button" class="sn-btn" id="sn-comment-submit">Submit Comment</button>' +
              '<button type="button" class="sn-btn sn-btn-sec" id="sn-comment-cancel">Cancel</button>' +
            "</div>" +
          "</div>" +
        "</div>";

      var detailActions = root.querySelector("#sn-detail-actions");

      root.querySelector("#sn-back-btn").onclick = loadCases;
      root.querySelector("#sn-escalate-btn").onclick = function () {
        var container = root.querySelector("#sn-escalate-form");
        detailActions.style.display = "none";
        container.innerHTML =
          '<div class="sn-form-group" style="margin-top:12px">' +
            '<label class="sn-label">Reason *</label>' +
            '<textarea class="sn-textarea" id="sn-esc-reason" placeholder="Explain why this case needs escalation"></textarea>' +
          "</div>" +
          '<div class="sn-row">' +
            '<button type="button" class="sn-btn" id="sn-esc-submit">Submit Escalation</button>' +
            '<button type="button" class="sn-btn sn-btn-sec" id="sn-esc-cancel">Cancel</button>' +
          "</div>";

        root.querySelector("#sn-esc-cancel").onclick = function () {
          container.innerHTML = "";
          detailActions.style.display = "";
        };
        root.querySelector("#sn-esc-submit").onclick = function () {
          var reason = root.querySelector("#sn-esc-reason").value.trim();
          if (!reason) { showMsg("Reason is required.", "error"); return; }
          var btn = root.querySelector("#sn-esc-submit");
          btn.disabled = true;
          btn.textContent = "Escalating...";
          clearMsg();
          apiEscalate(c.sysId, { reason: reason, priority: "1", state: "10" })
            .then(function (result) {
              showMsg("Case escalated successfully.", "success");
              if (result && result.sysId) {
                currentTopicSysId = result.sysId;
                renderDetail(result);
                loadMine();
              } else {
                setTimeout(loadCases, 1500);
              }
            })
            .catch(function (e) {
              showMsg(e.message || "Escalation failed.", "error");
              btn.disabled = false;
              btn.textContent = "Submit Escalation";
            });
        };
      };

      // Comments
      root.querySelector("#sn-comment-btn").onclick = function () {
        var section = root.querySelector("#sn-comments-section");
        var composer = root.querySelector("#sn-comment-composer");
        section.style.display = "block";
        composer.style.display = "block";
        root.querySelector("#sn-comment-text").focus();
      };

      root.querySelector("#sn-comment-cancel").onclick = function () {
        root.querySelector("#sn-comment-text").value = "";
        root.querySelector("#sn-comment-composer").style.display = "none";
      };

      root.querySelector("#sn-comment-submit").onclick = function () {
        var text = root.querySelector("#sn-comment-text").value.trim();
        if (!text) { showMsg("Comment is required.", "error"); return; }
        var btn = root.querySelector("#sn-comment-submit");
        btn.disabled = true;
        btn.textContent = "Submitting...";
        clearMsg();
        apiAddComment(c.sysId, text)
          .then(function () {
            showMsg("Comment added successfully.", "success");
            root.querySelector("#sn-comment-text").value = "";
            root.querySelector("#sn-comment-composer").style.display = "none";
            loadComments(c.sysId);
          })
          .catch(function (e) {
            showMsg(e.message || "Failed to add comment.", "error");
            btn.disabled = false;
            btn.textContent = "Submit Comment";
          });
      };

      function loadComments(sysId) {
        var list = root.querySelector("#sn-comments-list");
        list.innerHTML = '<p class="sn-status">Loading comments...</p>';
        apiGetActivities(sysId)
          .then(function (comments) {
            renderComments(comments);
          })
          .catch(function (e) {
            list.innerHTML = '<p class="sn-comment-empty">Could not load comments: ' + esc(e.message) + "</p>";
          });
      }

      function renderComments(comments) {
        var list = root.querySelector("#sn-comments-list");
        if (!comments || !comments.length) {
          list.innerHTML = '<p class="sn-comment-empty">No comments yet.</p>';
          return;
        }
        var html = "";
        var i, cm;
        for (i = 0; i < comments.length; i++) {
          cm = comments[i];
          html +=
            '<div class="sn-comment-item">' +
              '<p class="sn-comment-text">' + esc(cm.comment) + "</p>" +
              '<p class="sn-comment-meta">' + esc(cm.createdBy || "System") + " · " + esc(formatDate(cm.createdOn)) + "</p>" +
            "</div>";
        }
        list.innerHTML = html;
      }

      loadComments(c.sysId);
    }

        /* ── deflection view ──────────────────────────────────────────────── */

    function renderDeflection() {
      createBtn.style.display = "none";
      body.innerHTML =
        '<p class="sn-title" style="margin-bottom:8px">Find a Solution</p>' +
        '<p class="sn-deflect-intro">Describe your issue below and we\'ll search our Community and Knowledge Base for relevant articles before creating a ServiceNow case.</p>' +
        '<div class="sn-form-group">' +
          '<label class="sn-label">What do you need help with? *</label>' +
          '<textarea class="sn-deflect-input" id="sn-d-query" placeholder="e.g. \'How do I reset my password?\'"></textarea>' +
        "</div>" +
        '<div class="sn-deflect-actions">' +
          '<button type="button" class="sn-btn" id="sn-d-search">Search for Solutions</button>' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-d-skip">Skip & Create Case</button>' +
        "</div>" +
        '<div id="sn-d-results"></div>';

      var queryInput = root.querySelector("#sn-d-query");
      var resultsArea = root.querySelector("#sn-d-results");

      root.querySelector("#sn-d-skip").onclick = renderCreate;

      function showSearching() {
        resultsArea.innerHTML = '<p class="sn-status">Searching Community and Knowledge Base...</p>';
      }

      function showResults(results) {
        if (!results || !results.length) {
          resultsArea.innerHTML =
            '<p class="sn-deflect-empty">No relevant results found. You can still create a ServiceNow case.</p>' +
            '<div class="sn-row">' +
              '<button type="button" class="sn-btn" id="sn-d-create-anyway">Create Case</button>' +
            "</div>";
          root.querySelector("#sn-d-create-anyway").onclick = renderCreate;
          return;
        }

        var grouped = groupResultsBySource(results);
        var html = "";
        var sectionHtml = "";

        if (grouped.kb.length) {
          sectionHtml = '<div class="sn-deflect-section">' +
            '<p class="sn-deflect-section-title">Knowledge Base Articles</p>';
          sectionHtml += renderResultItems(grouped.kb);
          sectionHtml += "</div>";
          html += sectionHtml;
        }

        if (grouped.community.length) {
          sectionHtml = '<div class="sn-deflect-section">' +
            '<p class="sn-deflect-section-title">Community Content</p>';
          sectionHtml += renderResultItems(grouped.community);
          sectionHtml += "</div>";
          html += sectionHtml;
        }

        html += '<div class="sn-deflect-actions" style="margin-top:12px">' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-d-solved">This solved my issue</button>' +
          '<button type="button" class="sn-btn" id="sn-d-still-need-help">I still need help — Create Case</button>' +
        "</div>";

        resultsArea.innerHTML = html;

        // Wire up "still need help"
        root.querySelector("#sn-d-still-need-help").onclick = renderCreate;

        // Wire up "solved"
        root.querySelector("#sn-d-solved").onclick = function () {
          recordDeflection(query, list.length, true);
          body.innerHTML =
            '<p class="sn-title" style="margin-bottom:8px">Great!</p>' +
            '<p class="sn-deflect-solved">We\'re glad the suggested content helped. No ServiceNow case will be created.</p>' +
            '<div class="sn-row" style="margin-top:12px">' +
              '<button type="button" class="sn-btn sn-btn-sec" id="sn-d-reset">Back to Topic</button>' +
            "</div>";
          root.querySelector("#sn-d-reset").onclick = resetToInitialState;
        };

        // Wire up each result link to open in new tab
        resultsArea.querySelectorAll(".sn-deflect-item").forEach(function (item) {
          item.onclick = function (evt) {
            if (evt.target.closest("a")) return;
            var url = item.getAttribute("data-url");
            if (url) window.open(url, "_blank");
          };
        });
      }

      function renderResultItems(items) {
        var i, r, html = "";
        for (i = 0; i < items.length; i++) {
          r = items[i];
          html +=
            '<div class="sn-deflect-item" data-url="' + esc(r.url || "") + '">' +
              '<p class="sn-deflect-item-title">' + esc(r.title || "Untitled") + "</p>" +
              '<p class="sn-deflect-item-excerpt">' + esc(r.excerpt || "") + "</p>" +
              '<p class="sn-deflect-item-meta">' + esc(getContentTypeLabel(r.contentType)) +
                (r.numberOfViews !== undefined ? " · " + r.numberOfViews + " views" : "") +
              "</p>" +
            "</div>";
        }
        return html;
      }

      function recordDeflection(query, resultCount, solved) {
        // Optional: send deflection telemetry to an analytics endpoint or connector.
        // For now, log to console. Replace with your telemetry call if needed.
        if (window.console && window.console.log) {
          console.log("[ServiceNow Deflection] query='" + query + "' results=" + resultCount + " solved=" + solved);
        }
      }

      root.querySelector("#sn-d-search").onclick = function () {
        var query = queryInput.value.trim();
        if (!query) {
          showMsg("Please describe your issue before searching.", "error");
          return;
        }

        var sdk = getChWebSdk();
        if (!sdk) {
          // ChWebSdk not available — fall back to create form
          renderCreate();
          return;
        }

        showSearching();
        clearMsg();

        sdk.Content.search(query, { limit: 10, page: 0, fetchMetadata: true })
          .then(function (results) {
            var list = Array.isArray(results) ? results : [];
            recordDeflection(query, list.length, false);
            showResults(list);
          })
          .catch(function (err) {
            resultsArea.innerHTML =
              '<p class="sn-deflect-empty">Search failed. You can still create a ServiceNow case.</p>' +
              '<div class="sn-row">' +
                '<button type="button" class="sn-btn" id="sn-d-create-on-error">Create Case</button>' +
              "</div>";
            root.querySelector("#sn-d-create-on-error").onclick = renderCreate;
          });
      };

      queryInput.focus();
    }

    /* ── create view ──────────────────────────────────────────────────── */

    function renderCreate() {
      body.innerHTML =
        '<p class="sn-title" style="margin-bottom:12px">Create Case</p>' +
        '<div class="sn-form-group">' +
          '<label class="sn-label">Title *</label>' +
          '<input class="sn-input" id="sn-c-title" value="' + esc("[Community] " + topic.title) + '">' +
        "</div>" +
        '<div class="sn-form-group">' +
          '<label class="sn-label">Description</label>' +
          '<textarea class="sn-textarea" id="sn-c-desc" placeholder="Detailed description"></textarea>' +
        "</div>" +
        '<div class="sn-form-group">' +
          '<label class="sn-label">Priority</label>' +
          '<select class="sn-select" id="sn-c-priority">' +
            '<option value="1">Critical</option>' +
            '<option value="2">High</option>' +
            '<option value="3" selected>Moderate</option>' +
            '<option value="4">Low</option>' +
          "</select>" +
        "</div>" +
        '<div class="sn-form-group">' +
          '<label class="sn-label">Category</label>' +
          '<input class="sn-input" id="sn-c-category" placeholder="e.g. Network">' +
        "</div>" +
        '<div class="sn-row">' +
          '<button type="button" class="sn-btn" id="sn-c-submit">Create</button>' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-c-cancel">Cancel</button>' +
        "</div>";

      root.querySelector("#sn-c-cancel").onclick = loadCases;
      root.querySelector("#sn-c-submit").onclick = function () {
        var titleVal = root.querySelector("#sn-c-title").value.trim();
        if (!titleVal) { showMsg("Title is required.", "error"); return; }

        var descParts = ["Created from Gainsight Community topic: " + topic.url];
        var descVal = root.querySelector("#sn-c-desc").value.trim();
        if (descVal) descParts.push("", "Additional details:", descVal);

        var payload = {
          title: titleVal,
          description: descParts.join("\n"),
          priority: root.querySelector("#sn-c-priority").value,
        };
        var cat = root.querySelector("#sn-c-category").value.trim();
        if (cat) payload.category = cat;

        var btn = root.querySelector("#sn-c-submit");
        btn.disabled = true;
        btn.textContent = "Creating...";
        clearMsg();

        apiCreate(payload)
          .then(function (result) {
            showMsg("Case " + (result.caseNumber || "created") + " created successfully.", "success");
            if (result && result.sysId) {
              currentTopicSysId = result.sysId;
              renderDetail(result);
              loadMine();
            } else {
              setTimeout(loadCases, 1500);
            }
          })
          .catch(function (e) {
            showMsg(e.message || "Failed to create case.", "error");
            btn.disabled = false;
            btn.textContent = "Create";
          });
      };
    }

    /* ── load cases ───────────────────────────────────────────────────── */

    function loadCases() {
      refreshBtn.disabled = true;
      refreshBtn.classList.add("sn-spin");
      body.innerHTML = '<p class="sn-status">Loading cases&hellip;</p>';
      createBtn.style.display = "";
      clearMsg();

      apiGet()
        .then(function (result) {
          var cases = Array.isArray(result) ? result : result.result || result.data || [];
          var topicCase = findTopicCase(cases);
          currentTopicSysId = topicCase ? topicCase.sysId : null;

          if (topicCase) {
            renderDetail(topicCase);
          } else {
            body.innerHTML = '<p class="sn-status">No case exists for this topic yet.</p>';
          }
          loadMine();
        })
        .catch(function (e) {
          body.innerHTML =
            '<p class="sn-status">Failed to load cases: ' + esc(e.message) + "</p>";
          currentTopicSysId = null;
          loadMine();
        })
        .finally(function () {
          refreshBtn.disabled = false;
          refreshBtn.classList.remove("sn-spin");
        });
    }

    refreshBtn.onclick = loadCases;
    // createBtn.onclick = renderCreate;
    createBtn.onclick = function () {
      if (isDeflectionAvailable()) {
        renderDeflection();
      } else {
        renderCreate();
      }
};

    loadCases();
  }

  /* ── bootstrap ───────────────────────────────────────────────────────── */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 1000); });
  } else {
    setTimeout(init, 1000);
  }
})();
