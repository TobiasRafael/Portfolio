(() => {
  "use strict";

  const root = document.documentElement;

  /* ---------- Theme toggle (persisted per visitor) ---------- */
  const themeBtn = document.getElementById("theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: theme still applies for this visit */ }
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  menuBtn?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Header border on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Project filters ---------- */
  const chips = document.querySelectorAll(".chip[data-filter]");
  const items = document.querySelectorAll(".projects .project, .nda-card");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", String(active));
      });
      items.forEach((item) => {
        const tags = (item.dataset.tags || "").split(" ");
        item.hidden = filter !== "all" && !tags.includes(filter);
      });
    });
  });

  /* ---------- Current section in nav ---------- */
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => navObserver.observe(s));

    /* ---------- Reveal on scroll ---------- */
    const revealTargets = document.querySelectorAll(
      ".section-head, .service, .project, .nda-card, .edu-item, .skill-group, .contact-card, .stat"
    );
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
