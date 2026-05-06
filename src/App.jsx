import React, { useEffect, useMemo, useState } from "react";

const WHATSAPP = "97430630135";
const IG = "https://www.instagram.com/974perfumes/";

const imagePool = {
  hero: "/assets/bottle-974.png",
  bottle: "/assets/bottle-974.png",
  gift: "/assets/logo-974.png",
  social: "/assets/instagram-grid.png"
};

const products = [
  { id: 1, name: "Inspired by Mavro", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Oud", "Evening"], badge: "Best Seller", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 2, name: "Inspired by Brazilian Tobacco", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Tobacco", "Warm"], badge: "Featured", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 3, name: "Inspired by LV Stellar Times", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Amber", "Soft"], badge: "Featured", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 4, name: "Inspired by PDM Greenly", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Green", "Citrus"], badge: "Best Seller", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 5, name: "Inspired by Guilty Absolute", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Leather", "Woody"], badge: "Signature", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 6, name: "Inspired by Guilty for Women", audience: "Women", section: "Women", size: "50ml", price: 45, tags: ["Floral", "Daily"], badge: "Signature", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 7, name: "Inspired by Crystal Saffron", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Saffron", "Amber"], badge: "Featured", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 8, name: "Inspired by Vanilla Powder", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Vanilla", "Creamy"], badge: "Signature", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 9, name: "Inspired by Instant Crush", audience: "Unisex", section: "Unisex", size: "100ml", price: 65, tags: ["Amber", "Projection"], badge: "Best Seller", type: "Inspired Perfume Oil", image: imagePool.bottle },
  { id: 10, name: "Luxury Gift Set", audience: "Gift Sets", section: "Gift Sets", size: "Set", price: 200, tags: ["Bundle", "Occasion"], badge: "Spotlight", type: "Gift Set", image: imagePool.gift },
  { id: 11, name: "Premium Oil-Based Air Freshener", audience: "Air Freshener", section: "Air Freshener", size: "500ml", price: 55, tags: ["Home", "Long Lasting"], badge: "Home", type: "Air Freshener", image: imagePool.bottle }
];

const filters = ["Shop", "Men", "Women", "Unisex", "Gift Sets", "Air Freshener"];

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => products.filter((p) => (active === "Shop" || p.section === active) && `${p.name} ${p.audience} ${p.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [active, search]);
  const bestSellers = products.filter((p) => [1, 4, 9, 10].includes(p.id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const add = (product) => {
    setCart((old) => old.find((x) => x.id === product.id) ? old.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...product, qty: 1 }]);
    setToast(`${product.name} added to cart`);
    setOpen(true);
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => setToast(""), 2200);
  };

  const qty = (id, amount) => setCart((old) => old.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + amount) } : x)));
  const remove = (id) => setCart((old) => old.filter((x) => x.id !== id));

  return <div className="site">{toast && <div className="toast">{toast}</div>}
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#home"><img src="/assets/logo-974.png" alt="974 Perfumes logo" /><span><b>974 Perfumes</b><small>Qatar</small></span></a>
      <nav>
        {filters.map((f) => <a key={f} href="#shop" onClick={() => setActive(f)}>{f}</a>)}
        <a href={IG} target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <button className="cartBtn" onClick={() => setOpen(true)}>Cart <b>{count}</b></button>
    </header>

    <main id="home">
      <section className="hero">
        <div>
          <p className="kicker">974 Perfumes Qatar</p>
          <h1>Oil-Based Inspired Perfumes in Qatar</h1>
          <p className="heroCopy">Affordable, long-lasting inspired perfume oils crafted for everyday wear and gifting.</p>
          <div className="heroActions"><a className="primaryBtn" href="#shop">Shop Best Sellers</a><a className="ghostBtn" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Order on WhatsApp</a></div>
          <div className="trustRow"><span>From QAR 45</span><span>Oil-Based</span><span>WhatsApp Ordering</span><span>Qatar Delivery</span></div>
        </div>
        <div className="heroStage"><img src={imagePool.hero} alt="974 Perfumes bottle" /></div>
      </section>

      <section className="best"><div className="head"><h2>Best Sellers</h2><p>Our most ordered inspired oils and bundles.</p></div><div className="sellerRow">{bestSellers.map((p) => <Card key={p.id} p={p} add={add} premium />)}</div></section>

      <section id="shop" className="shop">
        <div className="shopHead"><div><h2>Product Discovery</h2><p>Explore inspired perfume oils, gift sets, and premium air fresheners.</p></div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or notes" /></div>
        <div className="filters">{filters.map((c) => <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>)}</div>
        <div className="productGrid">{filtered.map((p) => <Card key={p.id} p={p} add={add} />)}</div>
      </section>

      <section className="gift"><div className="giftVisual"><img src={imagePool.gift} alt="Luxury Gift Set" /></div><div><p className="kicker">Gift Set Spotlight</p><h3>Luxury Gift Set — QAR 200</h3><p>A ready-to-gift perfume bundle for special occasions.</p><button className="primaryBtn" onClick={() => add(products.find((p) => p.id === 10))}>Add Gift Set</button></div></section>

      <section className="social"><img src={imagePool.social} alt="Instagram preview for 974 Perfumes" /><div><h4>@974perfumes</h4><p>See latest drops, customer stories, and bundle announcements.</p><a className="ghostBtn" href={IG} target="_blank" rel="noreferrer">View Instagram</a></div></section>
    </main>

    <footer className="footer"><p>WhatsApp: <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">+974 3063 0135</a> • Instagram: <a href={IG} target="_blank" rel="noreferrer">@974perfumes</a></p><small>Inspired perfume oils. Not affiliated with any designer brands.</small></footer>

    <aside className={`drawer ${open ? "show" : ""}`}>
      <div className="drawerHead"><h2>Your Cart</h2><button onClick={() => setOpen(false)} aria-label="Close cart">×</button></div>
      {!cart.length ? <p className="empty">Your cart is empty.</p> : <div className="cartItems">{cart.map((i) => <div className="cartItem" key={i.id}><div><b>{i.name}</b><span>{i.size} • {i.type}</span><small>QAR {i.price}</small></div><div className="qty"><button onClick={() => qty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={() => qty(i.id, 1)}>+</button><button className="remove" onClick={() => remove(i.id)}>Remove</button></div></div>)}</div>}
      <div className="total"><span>Total</span><b>QAR {total}</b></div>
      <a className="whatsapp" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Checkout on WhatsApp</a>
    </aside>
  </div>;
}

function Card({ p, add, premium }) {
  return <article className={`product ${premium ? "premium" : ""}`}>
    <div className="photo"><span>{p.badge}</span><img src={p.image} alt={p.name} /></div>
    <div className="info"><small>{p.type}</small><h3>{p.name}</h3><p>{p.audience} • {p.size}</p><div className="tags">{p.tags.slice(0, 2).map((t) => <em key={t}>{t}</em>)}</div><div className="buy"><strong>QAR {p.price}</strong><button onClick={() => add(p)}>Add to Cart</button></div></div>
  </article>;
}
