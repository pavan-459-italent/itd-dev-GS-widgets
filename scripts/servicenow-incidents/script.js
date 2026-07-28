(function () {
  "use strict";

  var API_BASE = "https://compactly-written-jolt.ngrok-free.dev/api/servicenow/cases";
  var PANEL_ID = "sn-topic-incident-panel";

  /* ── helpers ─────────────────────────────────────────────────────────── */

  function esc(v) {
    var d = document.createElement("div");
    d.textContent = v || "";
    return d.innerHTML;
  }

  function isTopicPage() {
    // Strict URL-only detection: topic detail pages follow the pattern /type-ID/slug
    // e.g. /smartideas-95/add-dark-mode-546, /discussions-12/some-topic-title
    return /\/(?:discussions|questions|conversations|smartideas|ideas|articles)-\d+\/[^/?#]+/.test(
      window.location.pathname
    );
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

  /* ── API calls via Spring Boot connector ─────────────────────────────── */

  function apiGet() {
    return fetch(API_BASE + "?limit=50", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }).then(function (r) {
      if (!r.ok) throw new Error("Failed to load incidents (HTTP " + r.status + ")");
      return r.json();
    });
  }

  function apiCreate(payload) {
    return fetch(API_BASE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    }).then(function (r) {
      if (!r.ok) throw new Error("Failed to create incident (HTTP " + r.status + ")");
      return r.json();
    });
  }

  function apiEscalate(sysId, payload) {
    return fetch(API_BASE + "/" + encodeURIComponent(sysId) + "/escalate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    }).then(function (r) {
      if (!r.ok) throw new Error("Failed to escalate incident (HTTP " + r.status + ")");
      return r.json();
    });
  }

  /* ── styles ──────────────────────────────────────────────────────────── */

  function addStyles() {
    if (document.getElementById("sn-incident-css")) return;
    var s = document.createElement("style");
    s.id = "sn-incident-css";
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
      "#" + PANEL_ID + " .sn-card-title{font-weight:600;color:#1e1e2e;margin:0 0 4px}" +
      "#" + PANEL_ID + " .sn-card-meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:0.6875rem;color:#5a5a72}" +
      "#" + PANEL_ID + " .sn-badge{display:inline-block;padding:1px 7px;border-radius:999px;font-size:0.625rem;font-weight:600;color:#fff;background:#8a8aa3;text-transform:uppercase}" +
      "#" + PANEL_ID + " .sn-badge-critical,#" + PANEL_ID + " .sn-badge-high{background:#d9455f}" +
      "#" + PANEL_ID + " .sn-badge-moderate{background:#d68a1f}" +
      "#" + PANEL_ID + " .sn-badge-low{background:#3aa06a}" +
      "#" + PANEL_ID + " .sn-badge-new,#" + PANEL_ID + " .sn-badge-open{background:#0E6FFF}" +
      "#" + PANEL_ID + " .sn-badge-closed,#" + PANEL_ID + " .sn-badge-resolved{background:#6b7280}" +
      "#" + PANEL_ID + " .sn-badge-in-progress{background:#0E6FFF}" +
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
      "#" + PANEL_ID + " .sn-detail-desc{background:#fff;padding:10px;border-radius:6px;border:1px solid rgba(0,0,0,0.08);white-space:pre-wrap}";
    document.head.appendChild(s);
  }

  /* ── main widget ─────────────────────────────────────────────────────── */

  function init() {
    if (!isTopicPage() || document.getElementById(PANEL_ID)) return;

    var sidebar = document.querySelector(".qa-div-sidebar, aside, [class*='sidebar']");
    if (!sidebar) {
      setTimeout(init, 500);
      return;
    }

    addStyles();
    var topic = getTopic();

    var root = document.createElement("section");
    root.id = PANEL_ID;
    root.innerHTML =
      '<div class="sn-header">' +
        '<p class="sn-title">ServiceNow Incidents</p>' +
        '<div class="sn-actions">' +
          '<button type="button" class="sn-refresh" id="sn-refresh" title="Refresh">\u21BB</button>' +
          '<button type="button" class="sn-btn" id="sn-create-btn">Create Incident</button>' +
        '</div>' +
      '</div>' +
      '<div id="sn-msg-area"></div>' +
      '<div id="sn-body"><p class="sn-status">Loading incidents&hellip;</p></div>';

    sidebar.insertBefore(root, sidebar.firstChild);

    var body = root.querySelector("#sn-body");
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

    function findTopicIncident(incidents) {
      var topicUrl = topic.url.toLowerCase();
      for (var i = 0; i < incidents.length; i++) {
        var desc = String(incidents[i].description || "").toLowerCase();
        if (desc.indexOf(topicUrl) !== -1) return incidents[i];
      }
      return null;
    }

    /* ── detail view ──────────────────────────────────────────────────── */

    function renderDetail(inc) {
      createBtn.style.display = "none";
      body.innerHTML =
        '<div class="sn-card">' +
          '<p class="sn-card-title">' + esc(inc.caseNumber) + " — " + esc(inc.title) + "</p>" +
          '<div class="sn-card-meta">' +
            '<span class="sn-badge sn-badge-' + slugify(inc.status) + '">' + esc(inc.status) + "</span>" +
            '<span class="sn-badge sn-badge-' + slugify(inc.priority) + '">' + esc(inc.priority) + "</span>" +
            "<span>" + esc(formatDate(inc.createdDate)) + "</span>" +
          "</div>" +
        "</div>" +
        (inc.description ? '<div class="sn-detail-row"><div class="sn-detail-label">Description</div><div class="sn-detail-value sn-detail-desc">' + esc(inc.description) + "</div></div>" : "") +
        '<div class="sn-row">' +
          '<button type="button" class="sn-btn" id="sn-escalate-btn">Escalate</button>' +
          '<button type="button" class="sn-btn sn-btn-sec" id="sn-back-btn">Back</button>' +
        "</div>" +
        '<div id="sn-escalate-form"></div>';

      root.querySelector("#sn-back-btn").onclick = loadIncidents;
      root.querySelector("#sn-escalate-btn").onclick = function () {
        var container = root.querySelector("#sn-escalate-form");
        container.innerHTML =
          '<div class="sn-form-group" style="margin-top:12px">' +
            '<label class="sn-label">Reason *</label>' +
            '<textarea class="sn-textarea" id="sn-esc-reason" placeholder="Explain why this incident needs escalation"></textarea>' +
          "</div>" +
          '<div class="sn-row">' +
            '<button type="button" class="sn-btn" id="sn-esc-submit">Submit Escalation</button>' +
            '<button type="button" class="sn-btn sn-btn-sec" id="sn-esc-cancel">Cancel</button>' +
          "</div>";

        root.querySelector("#sn-esc-cancel").onclick = function () { container.innerHTML = ""; };
        root.querySelector("#sn-esc-submit").onclick = function () {
          var reason = root.querySelector("#sn-esc-reason").value.trim();
          if (!reason) { showMsg("Reason is required.", "error"); return; }
          var btn = root.querySelector("#sn-esc-submit");
          btn.disabled = true;
          btn.textContent = "Escalating...";
          clearMsg();
          apiEscalate(inc.sysId, { reason: reason, priority: "1", state: "2" })
            .then(function () {
              showMsg("Incident escalated successfully.", "success");
              loadIncidents();
            })
            .catch(function (e) {
              showMsg(e.message || "Escalation failed.", "error");
              btn.disabled = false;
              btn.textContent = "Submit Escalation";
            });
        };
      };
    }

    /* ── create view ──────────────────────────────────────────────────── */

    function renderCreate() {
      body.innerHTML =
        '<p class="sn-title" style="margin-bottom:12px">Create Incident</p>' +
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

      root.querySelector("#sn-c-cancel").onclick = loadIncidents;
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
            showMsg("Incident " + (result.caseNumber || "created") + " created successfully.", "success");
            loadIncidents();
          })
          .catch(function (e) {
            showMsg(e.message || "Failed to create incident.", "error");
            btn.disabled = false;
            btn.textContent = "Create";
          });
      };
    }

    /* ── load incidents ───────────────────────────────────────────────── */

    function loadIncidents() {
      refreshBtn.disabled = true;
      refreshBtn.classList.add("sn-spin");
      body.innerHTML = '<p class="sn-status">Loading incidents&hellip;</p>';
      createBtn.style.display = "";
      clearMsg();

      apiGet()
        .then(function (result) {
          var incidents = Array.isArray(result) ? result : result.result || result.data || [];
          var topicInc = findTopicIncident(incidents);

          if (topicInc) {
            renderDetail(topicInc);
          } else {
            body.innerHTML = '<p class="sn-status">No incident exists for this topic yet.</p>';
          }
        })
        .catch(function (e) {
          body.innerHTML =
            '<p class="sn-status">Failed to load incidents: ' + esc(e.message) + "</p>";
        })
        .finally(function () {
          refreshBtn.disabled = false;
          refreshBtn.classList.remove("sn-spin");
        });
    }

    refreshBtn.onclick = loadIncidents;
    createBtn.onclick = renderCreate;

    loadIncidents();
  }

  /* ── bootstrap ───────────────────────────────────────────────────────── */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 1000); });
  } else {
    setTimeout(init, 1000);
  }
})();
