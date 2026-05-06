import React, { useMemo, useState } from "react";

const WHATSAPP = "97430630135";
const IG = "https://www.instagram.com/974perfumes/";

const products = [
  { id: 1, name: "Inspired by Mavro", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Oud", "Dark", "Evening"] },
  { id: 2, name: "Inspired by Brazilian Tobacco", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Tobacco", "Warm", "Sweet"] },
  { id: 3, name: "Inspired by LV Stellar Times", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Amber", "Smooth", "Soft"] },
  { id: 4, name: "Inspired by PDM Greenly", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Green", "Fresh", "Citrus"] },
  { id: 5, name: "Inspired by Guilty Absolute", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Leather", "Dry", "Woody"] },
  { id: 6, name: "Inspired by Guilty for Women", audience: "Women", section: "Women", size: "50ml", price: 45, tags: ["Floral", "Soft", "Daily"] },
  { id: 7, name: "Inspired by Crystal Saffron", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Saffron", "Clean", "Amber"] },
  { id: 8, name: "Inspired by Vanilla Powder", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Vanilla", "Powdery", "Creamy"] },
  { id: 9, name: "Inspired by Instant Crush", audience: "Unisex", section: "Unisex", size: "100ml", price: 65, tags: ["Amber", "Sweet", "Projection"] },
  { id: 10, name: "Luxury Gift Set", audience: "Gift Sets", section: "Gift Sets", size: "Set", price: 200, tags: ["Gift", "Bundle", "Occasion"] },
  { id: 11, name: "Premium Oil-Based Air Freshener", audience: "Air Freshener", section: "Air Freshener", size: "500ml", price: 55, tags: ["Home", "Oil-Based", "Long Lasting"] }
];

const filters = ["Shop", "Men", "Women", "Unisex", "Gift Sets", "Air Freshener"];

const imageWithFallback = (target, fallback) => {
  target.currentTarget.src = fallback;
};

function whatsappText(cart) {
  if (!cart.length) return encodeURIComponent("Hi 974 Perfumes Qatar, please share your latest inspired perfume oil collection.");
  const rows = cart.map((i) => `- ${i.name} (${i.size}) x${i.qty} = QAR ${i.price * i.qty}`).join("\n");
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  return encodeURIComponent(`Hi 974 Perfumes Qatar, I would like to order:\n${rows}\nTotal: QAR ${total}\nName:\nLocation in Qatar:`);
}

export default function App() {
  const [active, setActive] = useState("Shop");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byFilter = active === "Shop" || p.section === active;
      const text = `${p.name} ${p.audience} ${p.tags.join(" ")}`.toLowerCase();
      return byFilter && text.includes(search.toLowerCase());
    });
  }, [active, search]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  function add(product) {
    setCart((old) => {
      const found = old.find((x) => x.id === product.id);
      if (found) return old.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      return [...old, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart`);
    setOpen(true);
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => setToast(""), 2200);
  }

  const qty = (id, amount) => setCart((old) => old.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + amount) } : x)));
  const remove = (id) => setCart((old) => old.filter((x) => x.id !== id));

  return (
    <div className="site">
      {toast && <div className="toast">{toast}</div>}
      <header className="topbar">
        <a className="brand" href="#home"><img src="/assets/logo-974.png" alt="974 Perfumes Qatar logo" /><span><b>974 Perfumes Qatar</b><small>Affordable inspired perfume oils</small></span></a>
        <nav>
          <a href="#shop" onClick={() => setActive("Shop")}>Shop</a>
          <a href="#shop" onClick={() => setActive("Men")}>Men</a>
          <a href="#shop" onClick={() => setActive("Women")}>Women</a>
          <a href="#shop" onClick={() => setActive("Unisex")}>Unisex</a>
          <a href="#shop" onClick={() => setActive("Gift Sets")}>Gift Sets</a>
          <a href="#shop" onClick={() => setActive("Air Freshener")}>Air Freshener</a>
          <a href={IG} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
        <button className="cartBtn" onClick={() => setOpen(true)}>Cart <b>{count}</b></button>
      </header>

      <main id="home">
        <section className="hero">
          <div>
            <p className="kicker">QAR 45 • 50ml inspired perfume oils</p>
            <h1>Shop inspired perfume oils in Qatar.</h1>
            <div className="actions">
              <a className="primary" href="#shop">Shop now</a>
              <a className="secondary" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Order on WhatsApp</a>
            </div>
          </div>
          <img src="/assets/hero.jpg" alt="974 Perfumes bottle in desert setup" onError={(e) => imageWithFallback(e, "/assets/bottle-974.png")} />
        </section>

        <section className="trust">
          <div><b>Cash/Card</b><span>Simple payment on delivery</span></div>
          <div><b>Qatar Delivery</b><span>Fast local handover</span></div>
          <div><b>WhatsApp Checkout</b><span>Quick order confirmation</span></div>
          <div><b>Oil-Based Performance</b><span>Long-lasting profile</span></div>
        </section>

        <section className="categoryTiles">
          {filters.slice(1).map((f) => <a href="#shop" key={f} onClick={() => setActive(f)}><span>{f}</span></a>)}
        </section>

        <section id="shop" className="shop">
          <div className="sectionHead">
            <h2>Products</h2>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scent tags..." />
          </div>
          <div className="filters">{filters.map((c) => <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>)}</div>
          <div className="productGrid">
            {filtered.map((p) => (
              <article className="product" key={p.id}>
                <div className="photo"><img src="/assets/product-clean.jpg" alt={p.name} onError={(e) => imageWithFallback(e, "/assets/bottle-974.png")} /></div>
                <div className="info">
                  <small>Inspired Perfume Oil</small>
                  <h3>{p.name}</h3>
                  <p>{p.audience} • {p.size}</p>
                  <div className="tags">{p.tags.map((t) => <em key={t}>{t}</em>)}</div>
                  <div className="buy"><strong>QAR {p.price}</strong><button onClick={() => add(p)}>Add to Cart</button></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="featureSplit">
          <img src="/assets/scent-profile.jpg" alt="Bottle with ingredient style scent profile" onError={(e) => imageWithFallback(e, "/assets/bottle-974.png")} />
          <div><h3>Scent profile</h3><p>Clean oils with strong projection and wearable day-to-night scent directions.</p></div>
        </section>

        <section className="featureSplit">
          <img src="/assets/qatar-lifestyle.jpg" alt="Qatar skyline with 974 perfumes products" onError={(e) => imageWithFallback(e, "/assets/bottle-974.png")} />
          <div><h3>Local in Qatar</h3><p>Message us on WhatsApp +974 30630135 for delivery timing and area coverage.</p></div>
        </section>
      </main>

      <aside className={`drawer ${open ? "show" : ""}`}>
        <div className="drawerHead"><h2>Your cart</h2><button onClick={() => setOpen(false)}>×</button></div>
        {!cart.length ? <p className="empty">Your cart is empty.</p> : <div className="cartItems">{cart.map((i) => <div className="cartItem" key={i.id}><div><b>{i.name}</b><span>{i.size} • QAR {i.price}</span></div><div className="qty"><button onClick={() => qty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={() => qty(i.id, 1)}>+</button><button className="remove" onClick={() => remove(i.id)}>×</button></div></div>)}</div>}
        <div className="total"><span>Total</span><b>QAR {total}</b></div>
        <a className="whatsapp" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Checkout on WhatsApp</a>
      </aside>
    </div>
  );
}
