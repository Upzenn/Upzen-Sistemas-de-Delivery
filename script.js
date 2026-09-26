(() => {
  "use strict";

  const config = window.UPZEN_CONFIG || {
    INSTAGRAM: "#",
    WHATSAPP: "#",
    ACAI_SPACE: "#",
    HAMBURGUERIA: "#",
    PIZZARIA: "#",
    CONFEITARIA: "#"
  };

  // LINKS DIRETOS: altere somente o config.js.
  const projects = [
    {
      name: "Açaí SPACE",
      category: "Açaíteria",
      description: "Catálogo digital interativo com montagem personalizada e pedidos pelo WhatsApp.",
      url: config.ACAI_SPACE,
      featured: true
    },
    {
      name: "Hamburgueria",
      category: "Hamburgueria",
      description: "Projeto demonstrativo de catálogo digital para hamburgueria.",
      url: config.HAMBURGUERIA
    },
    {
      name: "Pizzaria",
      category: "Pizzaria",
      description: "Projeto demonstrativo de catálogo digital para pizzaria.",
      url: config.PIZZARIA
    },
    {
      name: "Confeitaria",
      category: "Confeitaria",
      description: "Projeto demonstrativo de catálogo digital para confeitaria.",
      url: config.CONFEITARIA
    }
  ];

  const projectsGrid = document.querySelector("#projects-grid");

  function açaíMockup() {
    return `
      <div class="project-device" aria-hidden="true">
        <div class="project-screen">
          <div class="bar"></div>
          <div class="hero-shot">AÇAÍ SPACE</div>
          <div class="screen-line"></div>
          <div class="screen-line short"></div>
          <div class="screen-line"></div>
          <div class="screen-line short"></div>
        </div>
      </div>
    `;
  }

  function comingMockup() {
    return `
      <div class="skeleton-ui" aria-hidden="true">
        <span></span>
        <b></b>
        <i></i>
        <i style="width:55%"></i>
      </div>
    `;
  }

  function projectCard(project) {
    const action = `<a class="button button-small" href="${project.url}" target="_blank" rel="noopener noreferrer">Experimentar projeto <span>↗</span></a>`;

    return `
      <article class="project-card ${project.featured ? "featured" : ""} reveal">
        <div class="project-media">
          ${project.featured ? açaíMockup() : comingMockup()}
        </div>
        <div class="project-content">
          <div class="project-copy">
            <span class="project-category">${project.category}</span>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </div>
          <div class="project-actions">${action}</div>
        </div>
      </article>
    `;
  }

  if (projectsGrid) projectsGrid.innerHTML = projects.map(projectCard).join("");

  const wa = document.querySelector("#whatsapp-cta");
  const waNote = document.querySelector("#whatsapp-note");
  if (wa) {
    wa.href = config.WHATSAPP;
  wa.target = "_blank";
  wa.rel = "noopener noreferrer";
  wa.classList.remove("disabled");
  wa.removeAttribute("aria-disabled");
    if (waNote) waNote.textContent = "Fale diretamente comigo pelo WhatsApp.";
  }

  const ig = document.querySelector("#instagram-link");
  if (ig) {
    ig.href = config.INSTAGRAM;
  ig.target = "_blank";
  ig.rel = "noopener noreferrer";
    ig.removeAttribute("aria-disabled");
  }

  const navbar = document.querySelector("#navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuToggle && navLinks) menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  if (navLinks) navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("scroll", () => {
    if (navbar) navbar.style.boxShadow = window.scrollY > 8 ? "0 10px 30px rgba(0,0,0,.12)" : "none";
  }, { passive: true });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      // O href pode ter sido preenchido pelo config.js depois que o listener foi criado.
      // Só interceptamos links que continuam sendo âncoras internas.
      const id = anchor.getAttribute("href") || "";
      if (!id.startsWith("#") || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });
})();
