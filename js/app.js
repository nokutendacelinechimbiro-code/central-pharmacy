/**
 * app.js
 * ------
 * Shared behaviour for the Central Pharmacy prototype.
 * Read the section comments — each block has one job.
 *
 * Important: this is frontend-only. Data stays in this browser
 * (localStorage). It is not sent to a real pharmacy system.
 */

const STORAGE = {
  cart: "cp_cart",
  orders: "cp_orders",
  prescriptions: "cp_prescriptions",
  profile: "cp_profile"
};

/* ---------- 1. Small helpers ---------- */

function money(n) {
  return "$" + Number(n).toFixed(2);
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

function productById(id) {
  return CP_DATA.products.find((p) => p.id === id);
}

function categoryName(id) {
  const cat = CP_DATA.categories.find((c) => c.id === id);
  return cat ? cat.name : id;
}

/* ---------- 2. Cart ---------- */

function getCart() {
  return load(STORAGE.cart, []);
}

function setCart(items) {
  save(STORAGE.cart, items);
  updateCartCount();
}

function addToCart(id, qty) {
  const items = getCart();
  const found = items.find((i) => i.id === id);
  if (found) found.qty += qty;
  else items.push({ id: id, qty: qty });
  setCart(items);
}

function cartTotal(items) {
  return items.reduce((sum, item) => {
    const p = productById(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function updateCartCount() {
  const count = getCart().reduce((n, i) => n + i.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

/* ---------- 3. Shared UI (mobile nav, year, add-to-cart buttons) ---------- */

function setupSharedUi() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.body.addEventListener("click", function (event) {
    const btn = event.target.closest("[data-add]");
    if (!btn) return;
    addToCart(btn.getAttribute("data-add"), 1);
    btn.textContent = "Added";
    setTimeout(function () {
      btn.textContent = "Add to cart";
    }, 900);
  });

  updateCartCount();
}

/* ---------- 4. Home page ---------- */

function renderProductCard(p) {
  return (
    '<article class="card product-card">' +
    '<img src="assets/test.jpg" alt="Featured product">' +
    "<h3>" + p.name + "</h3>" +
    '<p class="muted">' + categoryName(p.category) + "</p>" +
    "<p>" + p.blurb + "</p>" +
    '<p class="price">' + money(p.price) + "</p>" +
    '<div class="product-actions">' +
    '<a class="btn btn-ghost" href="product.html?id=' + p.id + '">View</a>' +
    '<button class="btn btn-primary" type="button" data-add="' + p.id + '">Add to cart</button>' +
    "</div></article>"
  );
}

function initHome() {
  const catBox = document.querySelector("[data-categories]");
  if (catBox) {
    catBox.innerHTML = CP_DATA.categories
      .map(function (c) {
        return (
          '<a class="card category-card" href="shop.html?category=' + c.id + '">' +
          "<h3>" + c.name + "</h3>" +
          '<p class="muted">' + c.blurb + "</p></a>"
        );
      })
      .join("");
  }

  const feat = document.querySelector("[data-featured]");
  if (feat) {
    feat.innerHTML = CP_DATA.products
      .filter(function (p) { return p.featured; })
      .map(renderProductCard)
      .join("");
  }

  const services = document.querySelector("[data-services]");
  if (services) {
    services.innerHTML = CP_DATA.services
      .map(function (s) {
        return '<article class="card"><h3>' + s.title + "</h3><p>" + s.text + "</p></article>";
      })
      .join("");
  }
}

/* ---------- 5. Shop + search ---------- */

function initShop() {
  const grid = document.querySelector("[data-shop-grid]");
  const title = document.querySelector("[data-shop-title]");
  const filter = document.querySelector("[data-category-filter]");
  if (!grid) return;

  if (filter) {
    filter.innerHTML =
      '<option value="">All categories</option>' +
      CP_DATA.categories
        .map(function (c) {
          return '<option value="' + c.id + '">' + c.name + "</option>";
        })
        .join("");
  }

  function draw() {
    const q = (document.querySelector("[data-shop-q]") || {}).value || qs("q") || "";
    const cat = (filter && filter.value) || qs("category") || "";
    const query = q.trim().toLowerCase();

    if (title) {
      title.textContent = cat ? categoryName(cat) : "Shop";
    }

    const list = CP_DATA.products.filter(function (p) {
      const matchCat = !cat || p.category === cat;
      const matchQ = !query || p.name.toLowerCase().indexOf(query) !== -1;
      return matchCat && matchQ;
    });

    grid.innerHTML = list.length
      ? list.map(renderProductCard).join("")
      : '<p class="muted">No products match that search. Try another word or category.</p>';
  }

  const fromUrlCat = qs("category") || "";
  const fromUrlQ = qs("q") || "";
  if (filter) filter.value = fromUrlCat;
  const qInput = document.querySelector("[data-shop-q]");
  if (qInput) qInput.value = fromUrlQ;

  if (filter) filter.addEventListener("change", draw);
  if (qInput) qInput.addEventListener("input", draw);
  draw();
}

/* ---------- 6. Product detail ---------- */

function initProduct() {
  const root = document.querySelector("[data-product]");
  if (!root) return;
  const p = productById(qs("id"));
  if (!p) {
    root.innerHTML = "<p>That product was not found. <a href='shop.html'>Back to shop</a></p>";
    return;
  }
  root.innerHTML =
    '<p class="eyebrow">' + categoryName(p.category) + "</p>" +
    "<h1>" + p.name + "</h1>" +
    "<p>" + p.blurb + "</p>" +
    '<p class="price">' + money(p.price) + " · " + p.stock + " in stock (demo)</p>" +
    '<button class="btn btn-primary" type="button" data-add="' + p.id + '">Add to cart</button>';
}

/* ---------- 7. Prescriptions (filename only — no file upload to a server) ---------- */

function getPrescriptions() {
  return load(STORAGE.prescriptions, []);
}

function initPrescriptions() {
  const form = document.querySelector("[data-rx-form]");
  if (!form) return;

  const steps = document.querySelectorAll("[data-rx-step]");
  const panels = document.querySelectorAll("[data-rx-panel]");
  let current = 1;

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
    const next = event.target.closest("[data-rx-next]");
    const back = event.target.closest("[data-rx-back]");
    if (next) show(Math.min(3, current + 1));
    if (back) show(Math.max(1, current - 1));
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const file = form.querySelector('input[type="file"]').files[0];
    const record = {
      id: "rx-" + Date.now(),
      name: form.fullName.value.trim() || "Demo customer",
      note: form.note.value.trim(),
      // We only keep the file name, not the file itself.
      fileName: file ? file.name : "No file (demo)",
      status: "With pharmacist for review",
      createdAt: new Date().toISOString()
    };
    const list = getPrescriptions();
    list.unshift(record);
    save(STORAGE.prescriptions, list);
    form.hidden = true;
    document.querySelector("[data-rx-done]").hidden = false;
    document.querySelector("[data-rx-ref]").textContent = record.id;
  });

  show(1);
}

/* ---------- 8. Cart page ---------- */

function initCart() {
  const root = document.querySelector("[data-cart-table]");
  if (!root) return;

  function draw() {
    const items = getCart();
    if (!items.length) {
      root.innerHTML = '<p class="muted">Your cart is empty. <a href="shop.html">Browse the shop</a></p>';
      document.querySelector("[data-cart-total]").textContent = money(0);
      return;
    }

    root.innerHTML =
      "<table><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th></th></tr></thead><tbody>" +
      items
        .map(function (item) {
          const p = productById(item.id);
          if (!p) return "";
          return (
            "<tr><td>" + p.name + "</td><td class='qty'>" +
            "<button type='button' data-qty='" + item.id + "' data-delta='-1'>−</button>" +
            "<span>" + item.qty + "</span>" +
            "<button type='button' data-qty='" + item.id + "' data-delta='1'>+</button>" +
            "</td><td>" + money(p.price * item.qty) + "</td>" +
            "<td><button type='button' class='btn btn-ghost' data-remove='" + item.id + "'>Remove</button></td></tr>"
          );
        })
        .join("") +
      "</tbody></table>";

    document.querySelector("[data-cart-total]").textContent = money(cartTotal(items));
  }

  root.addEventListener("click", function (event) {
    const qtyBtn = event.target.closest("[data-qty]");
    const removeBtn = event.target.closest("[data-remove]");
    let items = getCart();
    if (qtyBtn) {
      const id = qtyBtn.getAttribute("data-qty");
      const delta = Number(qtyBtn.getAttribute("data-delta"));
      items = items
        .map(function (i) {
          if (i.id !== id) return i;
          return { id: i.id, qty: i.qty + delta };
        })
        .filter(function (i) { return i.qty > 0; });
      setCart(items);
    }
    if (removeBtn) {
      setCart(items.filter(function (i) { return i.id !== removeBtn.getAttribute("data-remove"); }));
    }
    draw();
  });

  draw();
}

/* ---------- 9. Checkout (no real payment) ---------- */

function initCheckout() {
  const form = document.querySelector("[data-checkout]");
  if (!form) return;

  const items = getCart();
  const summary = document.querySelector("[data-order-summary]");
  if (!items.length) {
    summary.innerHTML = '<p>Your cart is empty. <a href="shop.html">Add products first</a>.</p>';
    form.querySelector("button[type='submit']").disabled = true;
    return;
  }

  summary.innerHTML = items
    .map(function (i) {
      const p = productById(i.id);
      return p ? "<p>" + p.name + " × " + i.qty + " — " + money(p.price * i.qty) + "</p>" : "";
    })
    .join("") + "<p><strong>Total " + money(cartTotal(items)) + "</strong></p>";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const order = {
      id: "ord-" + Date.now(),
      items: items,
      total: cartTotal(items),
      fulfilment: form.fulfilment.value,
      paymentNote: "Prototype only — no payment was taken",
      status: "Confirmed (demo)",
      createdAt: new Date().toISOString()
    };
    const orders = load(STORAGE.orders, []);
    orders.unshift(order);
    save(STORAGE.orders, orders);
    setCart([]);
    form.hidden = true;
    const done = document.querySelector("[data-checkout-done]");
    done.hidden = false;
    document.querySelector("[data-order-id]").textContent = order.id;
  });
}

/* ---------- 10. Customer account ---------- */

function defaultProfile() {
  return load(STORAGE.profile, {
    fullName: "Alex Demo",
    email: "alex.demo@email.test",
    phone: "07000 000000",
    address: "1 Sample Street, Demo Town"
  });
}

function initAccount() {
  const root = document.querySelector("[data-account]");
  if (!root) return;

  const buttons = root.querySelectorAll("[data-tab]");
  const panels = root.querySelectorAll("[data-tab-panel]");

  function show(id) {
    buttons.forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-tab") === id);
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-tab-panel") !== id;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      show(b.getAttribute("data-tab"));
    });
  });

  const ordersEl = document.querySelector("[data-orders]");
  const orders = load(STORAGE.orders, []);
  ordersEl.innerHTML = orders.length
    ? "<table><thead><tr><th>Order</th><th>Status</th><th>Total</th><th>When</th></tr></thead><tbody>" +
      orders
        .map(function (o) {
          return (
            "<tr><td>" + o.id + "</td><td>" + o.status + "</td><td>" +
            money(o.total) + "</td><td>" + new Date(o.createdAt).toLocaleString() + "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table>"
    : '<p class="muted">No orders yet. Place a demo order from checkout.</p>';

  const rxEl = document.querySelector("[data-rx-list]");
  const rxs = getPrescriptions();
  rxEl.innerHTML = rxs.length
    ? "<ul>" +
      rxs
        .map(function (r) {
          return (
            "<li><strong>" + r.id + "</strong> — " + r.status +
            " (file name: " + r.fileName + ")</li>"
          );
        })
        .join("") +
      "</ul>"
    : '<p class="muted">No prescription requests yet.</p>';

  const profile = defaultProfile();
  const form = document.querySelector("[data-profile]");
  form.fullName.value = profile.fullName;
  form.email.value = profile.email;
  form.phone.value = profile.phone;
  form.address.value = profile.address;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    save(STORAGE.profile, {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value
    });
    document.querySelector("[data-profile-saved]").hidden = false;
  });

  show("orders");
}

/* ---------- 11. Contact form (demo only) ---------- */

function initContact() {
  const form = document.querySelector("[data-contact]");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.hidden = true;
    document.querySelector("[data-contact-done]").hidden = false;
  });
}

/* ---------- 12. Admin dashboard concept ---------- */

function initAdmin() {
  const root = document.querySelector("[data-admin]");
  if (!root) return;

  const orders = load(STORAGE.orders, []);
  const rxs = getPrescriptions();
  const lowStock = CP_DATA.products.filter(function (p) { return p.stock < 15; });

  document.querySelector("[data-stat-orders]").textContent = String(orders.length);
  document.querySelector("[data-stat-products]").textContent = String(CP_DATA.products.length);
  document.querySelector("[data-stat-rx]").textContent = String(rxs.length);
  document.querySelector("[data-stat-low]").textContent = String(lowStock.length);

  const buttons = root.querySelectorAll("[data-admin-tab]");
  const panels = root.querySelectorAll("[data-admin-panel]");
  function show(id) {
    buttons.forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-admin-tab") === id);
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-admin-panel") !== id;
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      show(b.getAttribute("data-admin-tab"));
    });
  });

  document.querySelector("[data-admin-orders]").innerHTML = orders.length
    ? orders
        .map(function (o) {
          return "<p>" + o.id + " · " + o.status + " · " + money(o.total) + " · " + o.fulfilment + "</p>";
        })
        .join("")
    : "<p class='muted'>No customer orders in this browser yet.</p>";

  document.querySelector("[data-admin-products]").innerHTML =
    "<table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead><tbody>" +
    CP_DATA.products
      .map(function (p) {
        return (
          "<tr><td>" + p.name + "</td><td>" + categoryName(p.category) +
          "</td><td>" + money(p.price) + "</td><td>" + p.stock + "</td></tr>"
        );
      })
      .join("") +
    "</tbody></table>";

  document.querySelector("[data-admin-inventory]").innerHTML = lowStock.length
    ? "<ul>" + lowStock.map(function (p) { return "<li>" + p.name + " — " + p.stock + " left</li>"; }).join("") + "</ul>"
    : "<p>No low-stock demo items.</p>";

  document.querySelector("[data-admin-rx]").innerHTML = rxs.length
    ? rxs
        .map(function (r) {
          return "<p>" + r.id + " · " + r.name + " · " + r.status + " · " + r.fileName + "</p>";
        })
        .join("")
    : "<p class='muted'>No prescription requests yet.</p>";

  document.querySelector("[data-admin-customers]").innerHTML =
    "<p>Demo profile stored locally: " + defaultProfile().fullName + " (" + defaultProfile().email + ")</p>" +
    "<p class='help'>A live system would use staff login, audit logs and encrypted records. This screen is a layout concept only.</p>";

  document.querySelector("[data-admin-reports]").innerHTML =
    "<p>Demo sales total in this browser: <strong>" +
    money(orders.reduce(function (s, o) { return s + o.total; }, 0)) +
    "</strong></p><p class='muted'>Reports would later include daily sales, top products and missed collections.</p>";

  show("orders");
}

/* ---------- Start-up: look at the page and run the matching init ---------- */

document.addEventListener("DOMContentLoaded", function () {
  setupSharedUi();
  const page = document.body.getAttribute("data-page");
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "product") initProduct();
  if (page === "prescriptions") initPrescriptions();
  if (page === "cart") initCart();
  if (page === "checkout") initCheckout();
  if (page === "account") initAccount();
  if (page === "contact") initContact();
  if (page === "admin") initAdmin();
});
