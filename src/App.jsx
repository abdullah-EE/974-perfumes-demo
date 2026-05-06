import React, { useEffect, useMemo, useState } from "react";

const WHATSAPP = "97430630135";
const IG = "https://www.instagram.com/974perfumes/";
const fallbackImage = "/assets/bottle-974.png";

const products = [
  { id: 1, name: "Inspired by Mavro", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Oud", "Dark", "Evening"], badge: "Best Seller", image: "/assets/bottle-974.png", pos: "center" },
  { id: 2, name: "Inspired by Brazilian Tobacco", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Tobacco", "Warm", "Sweet"], badge: "Featured", image: "/assets/instagram-grid.png", pos: "left center" },
  { id: 3, name: "Inspired by LV Stellar Times", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Amber", "Smooth", "Soft"], badge: "Featured", image: "/assets/bottle-974.png", pos: "20% center" },
  { id: 4, name: "Inspired by PDM Greenly", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Green", "Fresh", "Citrus"], badge: "Best Seller", image: "/assets/instagram-grid.png", pos: "center" },
  { id: 5, name: "Inspired by Guilty Absolute", audience: "Men", section: "Men", size: "50ml", price: 45, tags: ["Leather", "Dry", "Woody"], badge: "Inspired Oil", image: "/assets/bottle-974.png", pos: "80% center" },
  { id: 6, name: "Inspired by Guilty for Women", audience: "Women", section: "Women", size: "50ml", price: 45, tags: ["Floral", "Soft", "Daily"], badge: "Inspired Oil", image: "/assets/instagram-grid.png", pos: "right center" },
  { id: 7, name: "Inspired by Crystal Saffron", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Saffron", "Clean", "Amber"], badge: "Featured", image: "/assets/bottle-974.png", pos: "center top" },
  { id: 8, name: "Inspired by Vanilla Powder", audience: "Unisex", section: "Unisex", size: "50ml", price: 45, tags: ["Vanilla", "Powdery", "Creamy"], badge: "Inspired Oil", image: "/assets/instagram-grid.png", pos: "35% center" },
  { id: 9, name: "Inspired by Instant Crush", audience: "Unisex", section: "Unisex", size: "100ml", price: 65, tags: ["Amber", "Sweet", "Projection"], badge: "Best Seller", image: "/assets/bottle-974.png", pos: "center bottom" },
  { id: 10, name: "Luxury Gift Set", audience: "Gift Sets", section: "Gift Sets", size: "Set", price: 200, tags: ["Gift", "Bundle", "Occasion"], badge: "Spotlight", image: "/assets/instagram-grid.png", pos: "left center" },
  { id: 11, name: "Premium Oil-Based Air Freshener", audience: "Air Freshener", section: "Air Freshener", size: "500ml", price: 55, tags: ["Home", "Oil-Based", "Long Lasting"], badge: "Home", image: "/assets/bottle-974.png", pos: "center" }
];
const filters = ["Shop", "Men", "Women", "Unisex", "Gift Sets", "Air Freshener"];
const imgFallback = (e) => (e.currentTarget.src = fallbackImage);

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
    const onScroll = () => setScrolled(window.scrollY > 12);
    const cards = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")), { threshold: 0.18 });
    cards.forEach((x) => obs.observe(x));
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const filtered = useMemo(() => products.filter((p) => (active === "Shop" || p.section === active) && `${p.name} ${p.audience} ${p.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [active, search]);
  const bestSellers = products.filter((p) => [1, 4, 9, 10].includes(p.id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const add = (product) => { setCart((old) => old.find((x) => x.id === product.id) ? old.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...product, qty: 1 }]); setToast(`${product.name} added`); setOpen(true); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => setToast(""), 2200); };
  const qty = (id, amount) => setCart((old) => old.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + amount) } : x)));
  const remove = (id) => setCart((old) => old.filter((x) => x.id !== id));

  return <div className="site">{toast && <div className="toast">{toast}</div>}
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}><a className="brand" href="#home"><img src="/assets/logo-974.png" alt="logo" /><span><b>974 Perfumes</b><small>Qatar</small></span></a><nav>{filters.map((f) => <a key={f} href="#shop" onClick={() => setActive(f)}>{f}</a>)}<a href={IG} target="_blank" rel="noreferrer">Instagram</a></nav><button className="cartBtn" onClick={() => setOpen(true)}>Cart <b>{count}</b></button></header>
    <main id="home">
      <section className="hero reveal"><img src="/assets/bottle-974.png" alt="Essence of Luxury" onError={imgFallback} /><div><p className="kicker">974 Perfumes Qatar</p><h1>The Scent of Qatar.</h1><p>Inspired oils with bold projection and refined depth.</p><a className="glassBtn" href="#shop">Shop Now</a></div></section>
      <section className="trust reveal"><div>Qatar Delivery</div><div>WhatsApp Checkout</div><div>Cash / Card</div><div>Oil-Based Performance</div></section>
      <section className="best reveal"><div className="head"><h2>Featured Scents</h2></div><div className="sellerRow">{bestSellers.map((p) => <article className="sellerCard" key={p.id}><img src={p.image} alt={p.name} style={{ objectPosition: p.pos }} onError={imgFallback} /><h4>{p.name}</h4><p>{p.size} • QAR {p.price}</p><button onClick={() => add(p)}>Add to Cart</button></article>)}</div></section>
      <section id="shop" className="shop reveal"><div className="head"><h2>Product Discovery</h2><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes" /></div><div className="filters">{filters.map((c) => <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>)}</div><div className="productGrid">{filtered.map((p) => <article className="product" key={p.id}><div className="photo"><span>{p.badge}</span><img src={p.image} alt={p.name} style={{ objectPosition: p.pos }} onError={imgFallback} /></div><div className="info"><small>Inspired Perfume Oil</small><h3>{p.name}</h3><p>{p.audience} • {p.size}</p><div className="tags">{p.tags.map((t) => <em key={t}>{t}</em>)}</div><div className="buy"><strong>QAR {p.price}</strong><button onClick={() => add(p)}>Add to Cart</button></div></div></article>)}</div></section>
      <section className="story reveal"><img src="/assets/instagram-grid.png" alt="Doha style" onError={imgFallback} /><div><p className="kicker">Our Story</p><h3>Born in Qatar, crafted for presence.</h3><p>974 Perfumes blends inspired scent artistry with local identity and modern elegance.</p></div></section>
      <section className="gift reveal"><img src="/assets/logo-974.png" alt="gift" onError={imgFallback} /><div><p className="kicker">Gift Set Spotlight</p><h3>Luxury Gift Set — QAR 200</h3><p>Curated presentation for premium gifting in Qatar.</p><button onClick={() => add(products.find((p) => p.id === 10))}>Buy Now</button></div></section>
    </main>
    <aside className={`drawer ${open ? "show" : ""}`}><div className="drawerHead"><h2>Your cart</h2><button onClick={() => setOpen(false)}>×</button></div>{!cart.length ? <p className="empty">Your cart is empty.</p> : <div className="cartItems">{cart.map((i) => <div className="cartItem" key={i.id}><div><b>{i.name}</b><span>{i.size} • QAR {i.price}</span></div><div className="qty"><button onClick={() => qty(i.id, -1)}>-</button><span>{i.qty}</span><button onClick={() => qty(i.id, 1)}>+</button><button className="remove" onClick={() => remove(i.id)}>×</button></div></div>)}</div>}<div className="total"><span>Total</span><b>QAR {total}</b></div><a className="whatsapp" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Checkout on WhatsApp</a></aside>
  </div>;
}
