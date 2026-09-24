/**
 * app.js — Central Pharmacy shared behaviour
 * Frontend-only. No cart, admin, or account flows.
 */

function money(n) {
  return "$" + Number(n).toFixed(2);
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

function productById(id) {
  return CP_DATA.products.find(function (p) {
    return p.id === id;
  });
}

function beautyById(id) {
  return CP_DATA.beauty.find(function (p) {
    return p.id === id;
  });
}

function categoryName(id) {
  var cat = CP_DATA.categories.find(function (c) {
    return c.id === id;
  });
  return cat ? cat.name : id;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Shared UI ---------- */

function setupSharedUi() {
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Keep media visible even if a remote/local path fails */
  document.body.addEventListener(
    "error",
    function (event) {
      var el = event.target;
      if (!el || el.tagName !== "IMG") return;
      if (el.dataset.fallbackApplied) return;
      el.dataset.fallbackApplied = "1";
      el.src = "assets/logo.svg";
      el.style.objectFit = "contain";
      el.style.padding = "24%";
      el.style.background = "var(--surface-2)";
    },
    true
  );

  document.querySelectorAll("video").forEach(function (video) {
    video.addEventListener("error", function () {
      video.poster = "assets/5.jpeg";
      video.style.backgroundImage = "url('assets/5.jpeg')";
      video.style.backgroundSize = "cover";
    });
    try {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          /* Autoplay blocked — poster + controls still show */
        });
      }
    } catch (err) {}
  });

  setupReveal();
}

function setupReveal() {
  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
}

/* ---------- Cards ---------- */

function renderProductCard(p) {
  return (
    '<a class="card product-card" href="product.html?id=' +
    escapeHtml(p.id) +
    '">' +
    '<div class="thumb"><img src="' +
    escapeHtml(p.image) +
    '" alt="' +
    escapeHtml(p.name) +
    '" loading="lazy"></div>' +
    '<div class="body">' +
    '<p class="cat">' +
    escapeHtml(categoryName(p.category)) +
    "</p>" +
    "<h3>" +
    escapeHtml(p.name) +
    "</h3>" +
    '<p class="blurb">' +
    escapeHtml(p.blurb) +
    "</p>" +
    '<p class="price">' +
    money(p.price) +
    "</p>" +
    "</div></a>"
  );
}

function renderBeautyCard(p) {
  return (
    '<a class="card product-card" href="beauty.html?id=' +
    escapeHtml(p.id) +
    '">' +
    '<div class="thumb"><img src="' +
    escapeHtml(p.image) +
    '" alt="' +
    escapeHtml(p.name) +
    '" loading="lazy"></div>' +
    '<div class="body">' +
    '<p class="cat">' +
    escapeHtml(p.category) +
    "</p>" +
    "<h3>" +
    escapeHtml(p.name) +
    "</h3>" +
    '<p class="blurb">' +
    escapeHtml(p.brand) +
    " — " +
    escapeHtml(p.blurb) +
    "</p>" +
    "</div></a>"
  );
}

function renderBeautyTile(p) {
  return (
    '<a class="beauty-tile" href="beauty.html?id=' +
    escapeHtml(p.id) +
    '">' +
    '<img src="' +
    escapeHtml(p.image) +
    '" alt="' +
    escapeHtml(p.name) +
    '" loading="lazy">' +
    '<div class="caption">' +
    escapeHtml(p.name) +
    "<span>" +
    escapeHtml(p.brand) +
    "</span></div></a>"
  );
}

/* ---------- Home ---------- */

function initHome() {
  var catBox = document.querySelector("[data-categories]");
  if (catBox) {
    catBox.innerHTML = CP_DATA.categories
      .map(function (c) {
        return (
          '<a class="category-item" href="shop.html?category=' +
          escapeHtml(c.id) +
          '"><h3>' +
          escapeHtml(c.name) +
          '</h3><p>' +
          escapeHtml(c.blurb) +
          "</p></a>"
        );
      })
      .join("");
  }

  var feat = document.querySelector("[data-featured]");
  if (feat) {
    feat.innerHTML = CP_DATA.products
      .filter(function (p) {
        return p.featured;
      })
      .slice(0, 6)
      .map(renderProductCard)
      .join("");
  }

  var services = document.querySelector("[data-services]");
  if (services) {
    services.innerHTML = CP_DATA.services
      .map(function (s) {
        return (
          '<div class="service-item"><h3>' +
          escapeHtml(s.title) +
          "</h3><p>" +
          escapeHtml(s.text) +
          "</p></div>"
        );
      })
      .join("");
  }

  var beautyTeaser = document.querySelector("[data-beauty-teaser]");
  if (beautyTeaser) {
    beautyTeaser.innerHTML = CP_DATA.beauty.slice(0, 8).map(renderBeautyTile).join("");
  }
}

/* ---------- Shop ---------- */

function initShop() {
  var grid = document.querySelector("[data-shop-grid]");
  var title = document.querySelector("[data-shop-title]");
  var filter = document.querySelector("[data-category-filter]");
  if (!grid) return;

  if (filter) {
    filter.innerHTML =
      '<option value="">All categories</option>' +
      CP_DATA.categories
        .map(function (c) {
          return (
            '<option value="' +
            escapeHtml(c.id) +
            '">' +
            escapeHtml(c.name) +
            "</option>"
          );
        })
        .join("");
  }

  function draw() {
    var q = (document.querySelector("[data-shop-q]") || {}).value || qs("q") || "";
    var cat = (filter && filter.value) || qs("category") || "";
    var query = q.trim().toLowerCase();

    if (title) {
      title.textContent = cat ? categoryName(cat) : "Shop";
    }

    var list = CP_DATA.products.filter(function (p) {
      var matchCat = !cat || p.category === cat;
      var matchQ = !query || p.name.toLowerCase().indexOf(query) !== -1;
      return matchCat && matchQ;
    });

    grid.innerHTML = list.length
      ? list.map(renderProductCard).join("")
      : '<p class="muted">No products match that search. Try another word or category.</p>';
  }

  var fromUrlCat = qs("category") || "";
  var fromUrlQ = qs("q") || "";
  if (filter) filter.value = fromUrlCat;
  var qInput = document.querySelector("[data-shop-q]");
  if (qInput) qInput.value = fromUrlQ;

  if (filter) filter.addEventListener("change", draw);
  if (qInput) qInput.addEventListener("input", draw);
  draw();
}

/* ---------- Product detail ---------- */

function initProduct() {
  var root = document.querySelector("[data-product]");
  if (!root) return;
  var p = productById(qs("id"));
  if (!p) {
    root.innerHTML =
      "<p>That product was not found. <a href='shop.html'>Back to shop</a></p>";
    return;
  }
  root.innerHTML =
    '<div class="media"><img src="' +
    escapeHtml(p.image) +
    '" alt="' +
    escapeHtml(p.name) +
    '"></div>' +
    "<div>" +
    '<p class="eyebrow">' +
    escapeHtml(categoryName(p.category)) +
    "</p>" +
    "<h1>" +
    escapeHtml(p.name) +
    "</h1>" +
    "<p>" +
    escapeHtml(p.blurb) +
    "</p>" +
    '<p class="price">' +
    money(p.price) +
    " · " +
    p.stock +
    " in stock</p>" +
    '<div class="product-actions" style="max-width:360px">' +
    '<a class="btn btn-primary" href="contact.html">Ask about this product</a>' +
    '<a class="btn btn-ghost" href="shop.html">Back to shop</a>' +
    "</div>" +
    '<p class="help" style="margin-top:16px">Always read the label and ask a pharmacist for medical advice.</p>' +
    "</div>";
}

/* ---------- Beauty Corner ---------- */

function initBeauty() {
  var detail = document.querySelector("[data-beauty-detail]");
  var masonry = document.querySelector("[data-beauty-masonry]");
  var id = qs("id");

  if (id && detail) {
    var p = beautyById(id);
    if (!p) {
      detail.innerHTML =
        "<p>That item was not found. <a href='beauty.html'>Back to Beauty Corner</a></p>";
      detail.hidden = false;
      return;
    }
    detail.hidden = false;
    detail.innerHTML =
      '<div class="media"><img src="' +
      escapeHtml(p.image) +
      '" alt="' +
      escapeHtml(p.name) +
      '"></div>' +
      "<div>" +
      '<p class="eyebrow">' +
      escapeHtml(p.category) +
      "</p>" +
      "<h1>" +
      escapeHtml(p.name) +
      "</h1>" +
      '<p class="muted">' +
      escapeHtml(p.brand) +
      "</p>" +
      "<p>" +
      escapeHtml(p.blurb) +
      "</p>" +
      '<div class="product-actions" style="max-width:360px;margin-top:24px">' +
      '<a class="btn btn-primary" href="contact.html">Ask in store</a>' +
      '<a class="btn btn-ghost" href="beauty.html">All beauty</a>' +
      "</div></div>";
    if (masonry) masonry.hidden = true;
    var galleryHead = document.querySelector("#gallery .section-head");
    if (galleryHead) galleryHead.hidden = true;
    return;
  }

  if (masonry) {
    masonry.innerHTML = CP_DATA.beauty.map(renderBeautyTile).join("");
  }
}

/* ---------- About / team ---------- */

function initAbout() {
  var feature = document.querySelector("[data-team-feature]");
  var grid = document.querySelector("[data-team-grid]");
  var lead = CP_DATA.team.find(function (t) {
    return t.feature;
  });
  var rest = CP_DATA.team.filter(function (t) {
    return !t.feature;
  });

  if (feature && lead) {
    feature.innerHTML =
      '<div class="photo"><img src="' +
      escapeHtml(lead.image) +
      '" alt="' +
      escapeHtml(lead.name) +
      '"></div>' +
      "<div>" +
      '<p class="eyebrow">The people behind the counter</p>' +
      "<h2>" +
      escapeHtml(lead.name) +
      "</h2>" +
      "<p>" +
      escapeHtml(lead.role) +
      ". Our Mutare team combines a professional dispensary with warm, clear advice for every patient who walks through the door.</p>" +
      "</div>";
  }

  if (grid) {
    grid.innerHTML = rest
      .map(function (t) {
        return (
          '<article class="team-card">' +
          '<div class="photo"><img src="' +
          escapeHtml(t.image) +
          '" alt="' +
          escapeHtml(t.name) +
          '" loading="lazy"></div>' +
          '<div class="meta"><h3>' +
          escapeHtml(t.name) +
          '</h3><p class="role">' +
          escapeHtml(t.role) +
          "</p></div></article>"
        );
      })
      .join("");
  }
}

/* ---------- Prescriptions ---------- */

function getPrescriptions() {
  try {
    var raw = localStorage.getItem("cp_prescriptions");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function initPrescriptions() {
  var form = document.querySelector("[data-rx-form]");
  if (!form) return;

  var steps = document.querySelectorAll("[data-rx-step]");
  var panels = document.querySelectorAll("[data-rx-panel]");
  var current = 1;

  function show(n) {
    current = n;
    steps.forEach(function (s) {
      s.classList.toggle("is-active", Number(s.getAttribute("data-rx-step")) === n);
    });
    panels.forEach(function (p) {
      p.hidden = Number(p.getAttribute("data-rx-panel")) !== n;
    });
  }

  form.addEventListener("click", function (event) {
    var next = event.target.closest("[data-rx-next]");
    var back = event.target.closest("[data-rx-back]");
    if (next) show(Math.min(3, current + 1));
    if (back) show(Math.max(1, current - 1));
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var file = form.querySelector('input[type="file"]').files[0];
    var record = {
      id: "rx-" + Date.now(),
      name: form.fullName.value.trim() || "Guest",
      note: form.note.value.trim(),
      fileName: file ? file.name : "No file",
      status: "With pharmacist for review",
      createdAt: new Date().toISOString()
    };
    var list = getPrescriptions();
    list.unshift(record);
    localStorage.setItem("cp_prescriptions", JSON.stringify(list));
    form.hidden = true;
    document.querySelector("[data-rx-done]").hidden = false;
    document.querySelector("[data-rx-ref]").textContent = record.id;
  });

  show(1);
}

/* ---------- Contact ---------- */

function initContact() {
  var form = document.querySelector("[data-contact]");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.hidden = true;
    document.querySelector("[data-contact-done]").hidden = false;
  });

  var hours = document.querySelector("[data-hours]");
  if (hours) {
    hours.innerHTML = CP_DATA.pharmacy.hours
      .map(function (h) {
        return (
          "<li><span>" +
          escapeHtml(h.day) +
          "</span><span>" +
          escapeHtml(h.time) +
          "</span></li>"
        );
      })
      .join("");
  }
}

/* ---------- Boot ---------- */

document.addEventListener("DOMContentLoaded", function () {
  setupSharedUi();
  var page = document.body.getAttribute("data-page");
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "product") initProduct();
  if (page === "beauty") initBeauty();
  if (page === "about") initAbout();
  if (page === "prescriptions") initPrescriptions();
  if (page === "contact") initContact();

  /* Re-scan after JS fills grids so reveal isn't stuck at opacity 0 */
  requestAnimationFrame(function () {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("is-visible");
      }
    });
  });
});
