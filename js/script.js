(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");
  const navBackdrop = document.querySelector("[data-nav-backdrop]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateHeaderHeight = () => {
    const height = Math.ceil(header?.getBoundingClientRect().height || 0);
    document.documentElement.style.setProperty("--header-height", `${height}px`);
    return height;
  };

  const forceOpaqueMenuSurface = () => {
    if (!nav) return;
    nav.style.setProperty("background-color", "#061724", "important");
    nav.style.setProperty(
      "background-image",
      "linear-gradient(180deg, #061724 0%, #071a2b 100%)",
      "important"
    );
  };

  const closeMenu = () => {
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    navBackdrop?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  };

  const sectionLinks = Array.from(document.querySelectorAll('a[href^="#"]'))
    .filter((link) => link.getAttribute("href") !== "#");

  const sectionHashes = new Set(
    sectionLinks
      .map((link) => link.getAttribute("href"))
      .filter((hash) => document.querySelector(hash))
  );

  const jumpToSection = (event, explicitHash = null) => {
    const hash = explicitHash || event?.currentTarget?.getAttribute("href") || location.hash;
    if (!sectionHashes.has(hash)) return;

    const section = document.querySelector(hash);
    if (!section) return;

    event?.preventDefault();
    closeMenu();

    const top = window.scrollY + section.getBoundingClientRect().top - updateHeaderHeight() + 1;
    window.scrollTo({
      top: Math.max(0, Math.round(top)),
      behavior: reducedMotion ? "auto" : "smooth",
    });

    if (location.hash !== hash) history.pushState(null, "", hash);
  };

  header?.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  toggle?.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    if (willOpen) forceOpaqueMenuSurface();
    toggle.setAttribute("aria-expanded", String(willOpen));
    nav?.classList.toggle("open", willOpen);
    navBackdrop?.setAttribute("aria-hidden", String(!willOpen));
    document.body.classList.toggle("nav-open", willOpen);
  });

  navBackdrop?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    updateHeaderHeight();
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => jumpToSection(event));
  });

  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const hash = `#${visible.target.id}`;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === hash;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, {
      rootMargin: `-${updateHeaderHeight()}px 0px -58% 0px`,
      threshold: [0.12, 0.35, 0.65],
    });
    observedSections.forEach((section) => activeObserver.observe(section));
  }

  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight, { passive: true });

  window.addEventListener("load", () => {
    updateHeaderHeight();
    if (sectionHashes.has(location.hash)) {
      requestAnimationFrame(() => jumpToSection(null, location.hash));
    }
  });
})();

/* === COMPATIBILIDAD MULTINAVEGADOR 21: INICIO === */
(() => {
  "use strict";

  const root = document.documentElement;
  const visualViewport = window.visualViewport || null;

  const updateVisualViewportHeight = () => {
    const viewportHeight = Math.max(
      1,
      Math.round(visualViewport ? visualViewport.height : window.innerHeight)
    );
    root.style.setProperty("--viewport-height", `${viewportHeight}px`);
  };

  const revealCriticalHeroContent = () => {
    document.querySelectorAll(".hero .reveal").forEach((element) => {
      element.classList.add("visible");
    });
  };

  const refreshViewport = () => {
    window.requestAnimationFrame(() => {
      updateVisualViewportHeight();
      revealCriticalHeroContent();
    });
  };

  updateVisualViewportHeight();
  revealCriticalHeroContent();

  window.addEventListener("pageshow", refreshViewport);
  window.addEventListener("orientationchange", refreshViewport);
  window.addEventListener("resize", refreshViewport, { passive: true });

  if (visualViewport) {
    visualViewport.addEventListener("resize", refreshViewport, { passive: true });
  }
})();
/* === COMPATIBILIDAD MULTINAVEGADOR 21: FIN === */
