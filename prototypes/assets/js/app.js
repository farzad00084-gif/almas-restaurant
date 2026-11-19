/* =========================================================
   ALMAS — Stage 2 prototype behaviour
   Theme (per prototype), DE/EN, mobile navigation,
   reveal-on-scroll, editorial menu rendering.
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var prototypeName = root.getAttribute("data-prototype") || "site";
  var themeKey = "almas-theme:" + prototypeName;
  var langKey = "almas-lang";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Storage can be unavailable in private or embedded contexts. */
    }
  }

  /* -------------------------------------------------------
     Language
     ------------------------------------------------------- */

  function currentLang() {
    return root.getAttribute("data-lang") === "en" ? "en" : "de";
  }

  function updateThemeLabels() {
    var isDark = root.getAttribute("data-theme") === "dark";
    var lang = currentLang();
    var label = isDark
      ? lang === "de"
        ? "Zum hellen Modus wechseln"
        : "Switch to light mode"
      : lang === "de"
        ? "Zum dunklen Modus wechseln"
        : "Switch to dark mode";

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }

  function setLang(lang) {
    lang = lang === "en" ? "en" : "de";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    storageSet(langKey, lang);

    document.querySelectorAll("[data-de]").forEach(function (element) {
      var value = element.getAttribute("data-" + lang);
      if (value !== null) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-alt-de]").forEach(function (element) {
      var alt = element.getAttribute("data-alt-" + lang);
      if (alt !== null) {
        element.setAttribute("alt", alt);
      }
    });

    document.querySelectorAll("[data-aria-de]").forEach(function (element) {
      var aria = element.getAttribute("data-aria-" + lang);
      if (aria !== null) {
        element.setAttribute("aria-label", aria);
      }
    });

    document.querySelectorAll("[data-lang-set]").forEach(function (button) {
      var active = button.getAttribute("data-lang-set") === lang;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    updateThemeLabels();

    if (window.ALMAS_MENU && document.querySelector("[data-menu-root]")) {
      renderMenu(lang);
    }

    document.dispatchEvent(
      new CustomEvent("almas:language", { detail: { lang: lang } })
    );
  }

  /* -------------------------------------------------------
     Theme — stored per prototype so each one opens in the
     mode it was designed for.
     ------------------------------------------------------- */

  function setTheme(theme) {
    theme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", theme);
    storageSet(themeKey, theme);

    /* Keep the shared menu page in the same light or dark mode as
       the homepage the visitor came from. */
    if (
      prototypeName === "porcelain" ||
      prototypeName === "obsidian" ||
      prototypeName === "hybrid"
    ) {
      storageSet("almas-theme:menu", theme);
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#191719" : "#EAE5DC");
    }

    updateThemeLabels();
  }

  /* -------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------- */

  var menuButton = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuTrigger = null;

  function setMobileMenu(open) {
    if (!menuButton || !mobileMenu) {
      return;
    }

    if (open) {
      menuTrigger = document.activeElement;
      mobileMenu.hidden = false;
      body.classList.add("menu-open");
      menuButton.setAttribute("aria-expanded", "true");
      var firstLink = mobileMenu.querySelector("a, button");
      if (firstLink) {
        firstLink.focus();
      }
    } else {
      mobileMenu.hidden = true;
      body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      if (menuTrigger && typeof menuTrigger.focus === "function") {
        menuTrigger.focus();
      }
      menuTrigger = null;
    }
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      setMobileMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMobileMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && menuButton.getAttribute("aria-expanded") === "true") {
        setMobileMenu(false);
      }
    });
  }

  /* -------------------------------------------------------
     Header state over dark heroes
     ------------------------------------------------------- */

  var header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) {
      return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  /* -------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------- */

  var revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /* -------------------------------------------------------
     Editorial menu
     ------------------------------------------------------- */

  var menuTop = document.querySelector('[data-menu-root="top"]');
  var menuBottom = document.querySelector('[data-menu-root="bottom"]');

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = text;
    }
    return element;
  }

  function buildMenuItem(item, lang) {
    var article = createElement("article", "menu-item");
    var main = createElement("div", "menu-item-main");
    var name = createElement("h3", "menu-item-name", item.name[lang] || item.name.de);
    main.appendChild(name);

    if (item.desc && item.desc[lang]) {
      main.appendChild(createElement("p", "menu-item-desc", item.desc[lang]));
    }

    var priceWrap = createElement("div", "menu-item-price");
    priceWrap.appendChild(createElement("span", "menu-item-amount", item.price));

    if (item.family) {
      priceWrap.appendChild(
        createElement("span", "price-family", "40 cm · " + item.family)
      );
    }

    article.appendChild(main);
    article.appendChild(priceWrap);
    return article;
  }

  function renderMenu(lang) {
    var categories = window.ALMAS_MENU;
    var nav = document.querySelector("[data-menu-nav]");

    if (!categories || (!menuTop && !menuBottom)) {
      return;
    }

    if (menuTop) {
      menuTop.textContent = "";
    }
    if (menuBottom && menuBottom !== menuTop) {
      menuBottom.textContent = "";
    }
    if (nav) {
      nav.textContent = "";
    }

    categories.forEach(function (category, index) {
      if (nav) {
        var link = createElement("a", "", category.title[lang] || category.title.de);
        link.href = "#menu-" + category.id;
        link.setAttribute("data-category", category.id);
        nav.appendChild(link);
      }

      var target = menuTop;
      if (menuBottom && menuBottom !== menuTop && index >= 3) {
        target = menuBottom;
      }
      if (!target) {
        return;
      }

      var section = createElement("section", "menu-section");
      section.id = "menu-" + category.id;

      var container = createElement("div", "container");

      var head = createElement("div", "menu-section-head");
      var label = createElement("p", "section-label");
      label.appendChild(
        createElement("span", "index", String(index + 1).padStart(2, "0"))
      );
      label.appendChild(
        createElement("span", "", category.title[lang] || category.title.de)
      );

      var headingWrap = document.createElement("div");
      headingWrap.appendChild(
        createElement(
          "h2",
          "menu-section-title",
          category.title[lang] || category.title.de
        )
      );
      if (category.note && category.note[lang]) {
        headingWrap.appendChild(
          createElement("p", "menu-category-note", category.note[lang])
        );
      }

      head.appendChild(label);
      head.appendChild(headingWrap);
      container.appendChild(head);

      var list = createElement("div", "menu-list");
      category.items.forEach(function (item) {
        list.appendChild(buildMenuItem(item, lang));
      });

      if (category.source && category.source[lang]) {
        list.appendChild(
          createElement("p", "menu-source", category.source[lang])
        );
      }

      container.appendChild(list);
      section.appendChild(container);
      target.appendChild(section);
    });

    updateActiveCategory();
  }

  /* -------------------------------------------------------
     Menu category scroll spy
     ------------------------------------------------------- */

  var scrollTicking = false;

  function updateActiveCategory() {
    var nav = document.querySelector("[data-menu-nav]");
    if (!nav) {
      return;
    }

    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
    var sections = Array.prototype.slice.call(
      document.querySelectorAll(".menu-section")
    );
    if (!links.length || !sections.length) {
      return;
    }

    var offset = (header ? header.offsetHeight : 0) + 96;
    var activeId = sections[0].id;

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top - offset <= 0) {
        activeId = section.id;
      }
    });

    links.forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === "#" + activeId
      );
    });

    var activeLink = nav.querySelector("a.is-active");
    if (activeLink && nav.scrollWidth > nav.clientWidth + 8) {
      var linkRect = activeLink.getBoundingClientRect();
      var navRect = nav.getBoundingClientRect();
      var targetLeft =
        nav.scrollLeft +
        (linkRect.left - navRect.left) -
        (nav.clientWidth - linkRect.width) / 2;
      var maxLeft = nav.scrollWidth - nav.clientWidth;
      nav.scrollTo({
        left: Math.max(0, Math.min(maxLeft, targetLeft)),
        behavior: reducedMotion ? "auto" : "smooth"
      });
    }
  }

  function onScroll() {
    updateHeader();
    updateActiveCategory();

    if (scrollTicking) {
      return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(function () {
      updateHeader();
      updateActiveCategory();
      scrollTicking = false;
    });
  }

  /* -------------------------------------------------------
     Delegated controls
     ------------------------------------------------------- */

  document.addEventListener("click", function (event) {
    var pendingLink = event.target.closest("[data-pending-link]");
    if (pendingLink) {
      event.preventDefault();
    }

    var themeButton = event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    }

    var langButton = event.target.closest("[data-lang-set]");
    if (langButton) {
      setLang(langButton.getAttribute("data-lang-set"));
    }
  });

  /* -------------------------------------------------------
     Initialise
     ------------------------------------------------------- */

  var initialLang = currentLang();
  root.setAttribute("lang", initialLang);

  document.querySelectorAll("[data-lang-set]").forEach(function (button) {
    var active = button.getAttribute("data-lang-set") === initialLang;
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelectorAll("[data-de]").forEach(function (element) {
    var value = element.getAttribute("data-" + initialLang);
    if (value !== null) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-alt-de]").forEach(function (element) {
    var alt = element.getAttribute("data-alt-" + initialLang);
    if (alt !== null) {
      element.setAttribute("alt", alt);
    }
  });

  document.querySelectorAll("[data-aria-de]").forEach(function (element) {
    var aria = element.getAttribute("data-aria-" + initialLang);
    if (aria !== null) {
      element.setAttribute("aria-label", aria);
    }
  });

  updateThemeLabels();
  updateHeader();

  if (
    (prototypeName === "porcelain" ||
      prototypeName === "obsidian" ||
      prototypeName === "hybrid") &&
    !storageGet("almas-theme:menu")
  ) {
    storageSet("almas-theme:menu", root.getAttribute("data-theme"));
  }

  if (window.ALMAS_MENU && document.querySelector("[data-menu-root]")) {
    renderMenu(initialLang);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateActiveCategory();
})();
