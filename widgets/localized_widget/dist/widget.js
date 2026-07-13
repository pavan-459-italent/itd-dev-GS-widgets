import { jsx as t, jsxs as r } from "react/jsx-runtime";
import { createRoot as c } from "react-dom/client";
const n = {
  en: {
    title: "Welcome to Our Community",
    body: "We’re glad you’re here! This community is your space to ask questions, share ideas, and connect with other members. Here’s how to get started:",
    step1: "Complete your profile so others can get to know you.",
    step2: "Browse popular topics and join the conversations that interest you.",
    step3: "Post your first question or share an idea — the community is here to help.",
    cta: "Explore Topics →",
    footer: "Content displayed in your detected language."
  },
  es: {
    title: "Bienvenido a Nuestra Comunidad",
    body: "¡Nos alegra que estés aquí! Esta comunidad es tu espacio para hacer preguntas, compartir ideas y conectar con otros miembros. Así es como puedes empezar:",
    step1: "Completa tu perfil para que otros te conozcan.",
    step2: "Explora los temas populares y únete a las conversaciones que te interesen.",
    step3: "Publica tu primera pregunta o comparte una idea — la comunidad está aquí para ayudarte.",
    cta: "Explorar Temas →",
    footer: "Contenido mostrado en tu idioma detectado."
  },
  fr: {
    title: "Bienvenue dans Notre Communauté",
    body: "Nous sommes ravis de vous accueillir ! Cette communauté est votre espace pour poser des questions, partager des idées et échanger avec d’autres membres. Voici comment commencer :",
    step1: "Complétez votre profil pour que les autres puissent faire votre connaissance.",
    step2: "Parcourez les sujets populaires et rejoignez les conversations qui vous intéressent.",
    step3: "Publiez votre première question ou partagez une idée — la communauté est là pour vous aider.",
    cta: "Explorer les Sujets →",
    footer: "Contenu affiché dans votre langue détectée."
  },
  de: {
    title: "Willkommen in Unserer Community",
    body: "Schön, dass Sie hier sind! Diese Community ist Ihr Raum, um Fragen zu stellen, Ideen zu teilen und sich mit anderen Mitgliedern zu vernetzen. So starten Sie:",
    step1: "Vervollständigen Sie Ihr Profil, damit andere Sie kennenlernen können.",
    step2: "Entdecken Sie beliebte Themen und beteiligen Sie sich an Gesprächen, die Sie interessieren.",
    step3: "Stellen Sie Ihre erste Frage oder teilen Sie eine Idee — die Community ist da, um zu helfen.",
    cta: "Themen Entdecken →",
    footer: "Inhalt wird in Ihrer erkannten Sprache angezeigt."
  },
  pt: {
    title: "Bem-vindo à Nossa Comunidade",
    body: "Estamos felizes por você estar aqui! Esta comunidade é o seu espaço para fazer perguntas, compartilhar ideias e se conectar com outros membros. Veja como começar:",
    step1: "Complete seu perfil para que outros possam conhecê-lo.",
    step2: "Explore os tópicos populares e participe das conversas que te interessam.",
    step3: "Publique sua primeira pergunta ou compartilhe uma ideia — a comunidade está aqui para ajudar.",
    cta: "Explorar Tópicos →",
    footer: "Conteúdo exibido no seu idioma detectado."
  }
};
function l(e) {
  return n[e] ?? n.en;
}
function u() {
  const e = document.documentElement.lang || new URLSearchParams(window.location.search).get("lang"), s = e == null ? void 0 : e.trim().toLowerCase().split(/[-_]/)[0];
  return s && s in n ? s : "en";
}
function d({ accentColor: e }) {
  const s = u(), o = l(s);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "lw-root",
      style: { "--lw-accent-color": e },
      children: /* @__PURE__ */ r("div", { className: "lw-card", children: [
        /* @__PURE__ */ r("div", { className: "lw-header", children: [
          /* @__PURE__ */ t("div", { className: "lw-icon", children: "🌐" }),
          /* @__PURE__ */ t("h2", { className: "lw-title", children: o.title }),
          /* @__PURE__ */ t("span", { className: "lw-badge", children: s })
        ] }),
        /* @__PURE__ */ t("p", { className: "lw-body", children: o.body }),
        /* @__PURE__ */ t("ol", { className: "lw-steps", children: [o.step1, o.step2, o.step3].map((a, i) => /* @__PURE__ */ r("li", { className: "lw-step", children: [
          /* @__PURE__ */ t("span", { className: "lw-step-num", children: i + 1 }),
          /* @__PURE__ */ t("span", { className: "lw-step-text", children: a })
        ] }, i)) }),
        /* @__PURE__ */ t("a", { href: "#", className: "lw-cta", children: o.cta }),
        /* @__PURE__ */ t("div", { className: "lw-footer", children: o.footer })
      ] })
    }
  );
}
async function h(e) {
  const o = (await e.whenReady()).getProps();
  console.log(o);
  const a = c(e.shadowRoot);
  a.render(/* @__PURE__ */ t(d, { accentColor: o.accent_color })), e.on("destroy", () => a.unmount());
}
export {
  h as init
};
