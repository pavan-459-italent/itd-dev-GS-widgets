(function () {
  "use strict";

  var PANEL_ID = "sn-my-cases-panel";

  /* ── helpers ─────────────────────────────────────────────────────────── */

  function esc(v) {
    var d = document.createElement("div");
    d.textContent = v || "";
    return d.innerHTML;
  }

  function isTopicPage() {
    return /^\/[^/]+-\d+\/[^/?#]+/.test(window.location.pathname);
  }

  function findSidebar() {
    var selectors = [".module.Sidebarmodule", ".qa-div-sidebar", "aside", "[class*='sidebar']"];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el) return el;
    }
    return null;
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

  /* ── API calls via Gainsight Connectors SDK (no middleware) ────────── */

  function getSdk() {
    if (!window.WidgetServiceSDK) return null;
    return new window.WidgetServiceSDK();
  }

  function apiGetMine() {
    var sdk = getSdk();
    if (!sdk) return Promise.reject(new Error("Connector SDK unavailable"));
    return sdk.connectors.execute({
      permalink: "servicenow-my-cases",
      method: "GET",
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

  /* ── styles ──────────────────────────────────────────────────────────── */

  function addStyles() {
    if (document.getElementById("sn-my-cases-css")) return;
    var s = document.createElement("style");
    s.id = "sn-my-cases-css";
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
      "#" + PANEL_ID + " .sn-list{display:flex;flex-direction:column;gap:8px;max-height:270px;overflow-y:auto}" +
      "#" + PANEL_ID + " .sn-card{padding:10px;border:1px solid #bfdbfe;border-radius:8px;background:#fff;font-size:0.8125rem;cursor:pointer}" +
      "#" + PANEL_ID + " .sn-card:hover{border-color:#0E6FFF}" +
      "#" + PANEL_ID + " .sn-card-title{font-weight:600;color:#1e1e2e;margin:0 0 4px;line-height:1.3;min-height:2.6em;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis}" +
      "#" + PANEL_ID + " .sn-chevron{display:inline-block;margin-left:6px;font-size:0.7em;color:#5a5a72;transition:transform 0.15s ease}" +
      "#" + PANEL_ID + " .sn-card.sn-expanded .sn-chevron{transform:rotate(180deg)}" +
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
      "#" + PANEL_ID + " .sn-textarea{width:100%;padding:8px 10px;font-family:inherit;font-size:0.8125rem;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-sizing:border-box;min-height:80px;resize:vertical}" +
      "#" + PANEL_ID + " .sn-row{display:flex;gap:10px;margin-top:12px}" +
      "#" + PANEL_ID + " .sn-detail-row{margin-bottom:8px}" +
      "#" + PANEL_ID + " .sn-detail-label{font-size:0.6875rem;font-weight:600;color:#444458;text-transform:uppercase;margin-bottom:2px}" +
      "#" + PANEL_ID + " .sn-detail-value{color:#1e1e2e;line-height:1.4;font-size:0.8125rem}" +
      "#" + PANEL_ID + " .sn-detail-desc{background:#fff;padding:10px;border-radius:6px;border:1px solid rgba(0,0,0,0.08);white-space:pre-wrap}";
    document.head.appendChild(s);
  }

  /* ── main widget ─────────────────────────────────────────────────────── */

  function init() {
    if (isTopicPage() || document.getElementById(PANEL_ID)) return;

    if (!window.WidgetServiceSDK) {
      setTimeout(init, 500);
      return;
    }

    var sidebar = findSidebar();
    if (!sidebar) {
      setTimeout(init, 500);
      return;
    }

    addStyles();

    var root = document.createElement("section");
    root.id = PANEL_ID;
    root.innerHTML =
      '<div class="sn-header">' +
        '<p class="sn-title">My ServiceNow Cases</p>' +
        '<div class="sn-actions">' +
          '<button type="button" class="sn-refresh" id="sn-my-refresh" title="Refresh">\u21BB</button>' +
        '</div>' +
      '</div>' +
      '<div id="sn-my-msg-area"></div>' +
      '<div id="sn-my-body"><p class="sn-status">Loading your cases&hellip;</p></div>';

    sidebar.insertBefore(root, sidebar.firstChild);

    var body = root.querySelector("#sn-my-body");
    var msgArea = root.querySelector("#sn-my-msg-area");
    var refreshBtn = root.querySelector("#sn-my-refresh");

    function showMsg(text, type) {
      msgArea.innerHTML =
        '<div class="sn-msg ' + (type === "success" ? "sn-msg-ok" : "sn-msg-err") + '">' +
        esc(text) + "</div>";
      if (type === "success") setTimeout(function () { msgArea.innerHTML = ""; }, 5000);
    }

    function clearMsg() { msgArea.innerHTML = ""; }

    /* ── list view (accordion: expand in place) ──────────────────────── */

    function renderList(cases) {
      if (!cases.length) {
        body.innerHTML = '<p class="sn-status">You have not created any ServiceNow cases yet.</p>';
        return;
      }

      var html = '<div class="sn-list">';
      cases.forEach(function (c, idx) {
        html +=
          '<div class="sn-card" data-idx="' + idx + '">' +
            '<p class="sn-card-title" title="' + esc(c.caseNumber + " \u2014 " + c.title) + '">' + esc(c.caseNumber) + " \u2014 " + esc(c.title) + '<span class="sn-chevron">\u25BC</span></p>' +
            '<div class="sn-card-meta">' +
              '<span class="sn-badge sn-badge-' + slugify(c.status) + '">' + esc(c.status) + "</span>" +
              '<span class="sn-badge sn-badge-' + slugify(c.priority) + '">' + esc(c.priority) + "</span>" +
              "<span>" + esc(formatDate(c.createdDate)) + "</span>" +
            "</div>" +
            '<div class="sn-card-detail" data-detail="' + idx + '" style="display:none"></div>' +
          "</div>";
      });
      html += "</div>";
      body.innerHTML = html;

      function collapseAll() {
        body.querySelectorAll(".sn-card-detail").forEach(function (d) { d.style.display = "none"; });
        body.querySelectorAll(".sn-card").forEach(function (cd) { cd.classList.remove("sn-expanded"); });
      }

      body.querySelectorAll(".sn-card").forEach(function (card) {
        card.onclick = function (evt) {
          if (evt.target.closest(".sn-card-detail")) return;
          var idx = parseInt(card.getAttribute("data-idx"), 10);
          var c = cases[idx];
          var detail = card.querySelector(".sn-card-detail");
          var isOpen = detail.style.display !== "none";
          collapseAll();
          if (isOpen) return;

          card.classList.add("sn-expanded");
          detail.style.display = "";
          detail.innerHTML =
            (c.description ? '<div class="sn-detail-row" style="margin-top:8px"><div class="sn-detail-label">Description</div><div class="sn-detail-value sn-detail-desc">' + esc(c.description) + "</div></div>" : "") +
            '<div class="sn-row" data-actions="' + idx + '">' +
              '<button type="button" class="sn-btn" data-escalate="' + idx + '">Escalate</button>' +
              '<button type="button" class="sn-btn sn-btn-sec" data-close="' + idx + '">Close</button>' +
            "</div>" +
            '<div data-esc-form="' + idx + '"></div>';

          detail.querySelector("[data-close]").onclick = function (e) {
            e.stopPropagation();
            collapseAll();
          };

          var actions = detail.querySelector("[data-actions]");

          detail.querySelector("[data-escalate]").onclick = function (e) {
            e.stopPropagation();
            var formHolder = detail.querySelector("[data-esc-form]");
            actions.style.display = "none";
            formHolder.innerHTML =
              '<div class="sn-form-group" style="margin-top:12px">' +
                '<label class="sn-label">Reason *</label>' +
                '<textarea class="sn-textarea" data-esc-reason placeholder="Explain why this case needs escalation"></textarea>' +
              "</div>" +
              '<div class="sn-row">' +
                '<button type="button" class="sn-btn" data-esc-submit>Submit Escalation</button>' +
                '<button type="button" class="sn-btn sn-btn-sec" data-esc-cancel>Cancel</button>' +
              "</div>";

            formHolder.querySelector("[data-esc-cancel]").onclick = function (ev) {
              ev.stopPropagation();
              formHolder.innerHTML = "";
              actions.style.display = "";
            };
            formHolder.querySelector("[data-esc-submit]").onclick = function (ev) {
              ev.stopPropagation();
              var reason = formHolder.querySelector("[data-esc-reason]").value.trim();
              if (!reason) { showMsg("Reason is required.", "error"); return; }
              var btn = formHolder.querySelector("[data-esc-submit]");
              btn.disabled = true;
              btn.textContent = "Escalating...";
              clearMsg();
              apiEscalate(c.sysId, { reason: reason, priority: "1", state: "10" })
                .then(function () {
                  showMsg("Case escalated successfully.", "success");
                  loadMyCases();
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

    /* ── load cases ───────────────────────────────────────────────────── */

    function loadMyCases() {
      refreshBtn.disabled = true;
      refreshBtn.classList.add("sn-spin");
      body.innerHTML = '<p class="sn-status">Loading your cases&hellip;</p>';
      clearMsg();

      apiGetMine()
        .then(function (result) {
          var cases = Array.isArray(result) ? result : result.result || result.data || [];
          renderList(cases);
        })
        .catch(function (e) {
          body.innerHTML =
            '<p class="sn-status">Failed to load your cases: ' + esc(e.message) + "</p>";
        })
        .finally(function () {
          refreshBtn.disabled = false;
          refreshBtn.classList.remove("sn-spin");
        });
    }

    refreshBtn.onclick = loadMyCases;

    loadMyCases();
  }

  /* ── bootstrap ───────────────────────────────────────────────────────── */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 1000); });
  } else {
    setTimeout(init, 1000);
  }
})();
