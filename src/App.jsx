
import React, { useMemo, useState } from "react";

const WHATSAPP = "97430630135";
const IG = "https://www.instagram.com/974perfumes/";

const products = [
  { id:1, name:"Inspired by Mavro", audience:"Unisex", category:"Oud", size:"50ml", price:45, tags:["Oud","Warm","Bold"], text:"Deep, dark and strong. Built for evening wear and customers who like richer oud-style profiles." },
  { id:2, name:"Inspired by Brazilian Tobacco", audience:"Unisex", category:"Sweet", size:"50ml", price:45, tags:["Tobacco","Sweet","Warm"], text:"A sweet tobacco direction with warmth and depth. Good for colder nights and a more confident scent." },
  { id:3, name:"Inspired by LV Stellar Times", audience:"Unisex", category:"Amber", size:"50ml", price:45, tags:["Amber","Soft","Luxury"], text:"Smooth and bright with a polished luxury feel. A safe premium-style scent direction." },
  { id:4, name:"Inspired by PDM Greenly", audience:"Men", category:"Fresh", size:"50ml", price:45, tags:["Green","Fresh","Citrus"], text:"Fresh green scent direction for daytime, work and Qatar heat." },
  { id:5, name:"Inspired by Guilty Absolute", audience:"Men", category:"Leather", size:"50ml", price:45, tags:["Leather","Dry","Woody"], text:"Darker masculine leather profile. Stronger and more mature than a basic fresh scent." },
  { id:6, name:"Inspired by Guilty for Women", audience:"Women", category:"Floral", size:"50ml", price:45, tags:["Floral","Soft","Elegant"], text:"A softer feminine scent direction for daily wear and gifting." },
  { id:7, name:"Inspired by Crystal Saffron", audience:"Unisex", category:"Spicy", size:"50ml", price:45, tags:["Saffron","Amber","Clean"], text:"Modern saffron profile with a clean, expensive-smelling edge." },
  { id:8, name:"Inspired by Vanilla Powder", audience:"Unisex", category:"Sweet", size:"50ml", price:45, tags:["Vanilla","Powder","Soft"], text:"Creamy, powdery and smooth. A soft sweet option that feels easy to wear." },
  { id:9, name:"Inspired by Instant Crush", audience:"Unisex", category:"Amber", size:"50ml", price:45, tags:["Amber","Sweet","Powerful"], text:"Sweet amber profile with projection. Made for customers who want compliments." },
  { id:10, name:"Luxury Gift Set", audience:"Gift", category:"Gift Sets", size:"Set", price:200, tags:["Gift","Premium","Bundle"], text:"Gift-ready option for Eid, birthdays and premium presentation." },
  { id:11, name:"Premium Oil-Based Air Freshener", audience:"Home", category:"Home", size:"500ml", price:55, tags:["Home","Car","Oil-based"], text:"Long-lasting home and car fragrance. Best add-on product beside perfumes." },
  { id:12, name:"100ml Inspired Perfume", audience:"Unisex", category:"Perfume", size:"100ml", price:65, tags:["Bigger size","Value"], text:"For customers who already know their scent and want the larger bottle." }
];

const categories = ["All","Men","Women","Unisex","Fresh","Sweet","Oud","Amber","Leather","Floral","Spicy","Gift Sets","Home"];

function whatsappText(cart) {
  if (!cart.length) return encodeURIComponent("Hi 974 Perfumes, please send me your current perfume list, prices, and delivery details.");
  const rows = cart.map(i => `- ${i.name} (${i.size}) x${i.qty} = QAR ${i.price * i.qty}`).join("\n");
  const total = cart.reduce((s,i)=>s+i.qty*i.price,0);
  return encodeURIComponent(`Hi 974 Perfumes, I want to order:\n${rows}\nTotal: QAR ${total}\nPlease confirm availability and delivery.`);
}

export default function App() {
  const [filter,setFilter] = useState("All");
  const [search,setSearch] = useState("");
  const [cart,setCart] = useState([]);
  const [open,setOpen] = useState(false);
  const [toast,setToast] = useState("");

  const filtered = useMemo(() => products.filter(p => {
    const matchesFilter = filter === "All" || p.category === filter || p.audience === filter;
    const text = `${p.name} ${p.category} ${p.audience} ${p.tags.join(" ")}`.toLowerCase();
    return matchesFilter && text.includes(search.toLowerCase());
  }), [filter,search]);

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  function add(product){
    setCart(old => {
      const found = old.find(x=>x.id===product.id);
      if(found) return old.map(x=>x.id===product.id ? {...x, qty:x.qty+1}:x);
      return [...old,{...product,qty:1}];
    });
    setToast(`${product.name} added`);
    setOpen(true);
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(()=>setToast(""),2200);
  }

  function qty(id, amount){ setCart(old => old.map(x=>x.id===id ? {...x, qty:Math.max(1,x.qty+amount)}:x)); }
  function remove(id){ setCart(old=>old.filter(x=>x.id!==id)); }

  return (
    <div className="site">
      {toast && <div className="toast">{toast}</div>}
      <header className="topbar">
        <a className="brand" href="#home"><img src="/assets/logo-974.png" alt="974 Perfumes logo" /><span><b>974 Perfumes</b><small>Qatar • inspired perfume oils</small></span></a>
        <nav><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="#gift">Gift Sets</a><a href="#instagram">Instagram</a></nav>
        <button className="cartBtn" onClick={()=>setOpen(true)}>Cart <b>{count}</b></button>
      </header>
      <main id="home">
        <section className="hero">
          <div className="heroCopy"><p className="kicker">Inspired perfume oils from QAR 45</p><h1>Affordable luxury scents, ready to order in Qatar.</h1><p className="lead">A cleaner store-style demo for 974 Perfumes: shop by scent, choose a bottle, and complete the order through WhatsApp.</p><div className="actions"><a className="primary" href="#shop">Shop perfumes</a><a className="secondary" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">WhatsApp order</a></div></div>
          <div className="heroCard"><img src="/assets/bottle-974.png" alt="974 Perfumes bottle" /><div className="heroPrice"><b>QAR 45</b><span>50ml inspired perfumes</span></div></div>
        </section>
        <section className="trust"><div><b>WhatsApp ordering</b><span>Fast inquiry and confirmation</span></div><div><b>Qatar delivery</b><span>Built for local selling</span></div><div><b>Gift sets</b><span>Premium upsell option</span></div><div><b>Home fragrance</b><span>Air freshener add-ons</span></div></section>
        <section id="categories" className="categoryTiles"><a href="#shop" onClick={()=>setFilter("Men")}><span>Men</span><b>Bold & fresh</b></a><a href="#shop" onClick={()=>setFilter("Women")}><span>Women</span><b>Soft & elegant</b></a><a href="#shop" onClick={()=>setFilter("Unisex")}><span>Unisex</span><b>Amber, oud & sweet</b></a><a href="#gift" onClick={()=>setFilter("Gift Sets")}><span>Gifts</span><b>Sets & bundles</b></a></section>
        <section id="shop" className="shop"><div className="sectionHead"><div><p className="kicker">Store preview</p><h2>Popular inspired perfumes</h2><p>Product names are based on the Instagram screenshot provided. Final availability should be confirmed with 974 Perfumes.</p></div><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search oud, vanilla, saffron..." /></div>
          <div className="filters">{categories.map(c => <button key={c} className={filter===c?"active":""} onClick={()=>setFilter(c)}>{c}</button>)}</div>
          <div className="productGrid">{filtered.map(p => <article className="product" key={p.id}><div className="photo"><img src="/assets/bottle-974.png" alt={p.name} /><span>{p.category}</span></div><div className="info"><div className="meta"><small>{p.audience}</small><small>{p.size}</small></div><h3>{p.name}</h3><p>{p.text}</p><div className="tags">{p.tags.map(t => <em key={t}>{t}</em>)}</div><div className="buy"><strong>QAR {p.price}</strong><button onClick={()=>add(p)}>Add to cart</button></div></div></article>)}</div>
        </section>
        <section id="gift" className="gift"><div><p className="kicker">Best demo upsell</p><h2>Gift sets make the store feel real.</h2><p>Perfume customers often buy for gifts. Keep this section strong when presenting the demo in person.</p><button onClick={()=>add(products.find(p=>p.category==="Gift Sets"))}>Add gift set</button></div><img src="/assets/logo-974.png" alt="974 Perfumes gift logo" /></section>
        <section id="instagram" className="insta"><div><p className="kicker">Brand proof</p><h2>Built around their actual orange identity.</h2><p>The site keeps the 974 orange branding, bottle style and inspired-perfume positioning, but turns it into a proper store experience.</p></div><img src="/assets/instagram-grid.png" alt="974 Perfumes Instagram product grid" /></section>
      </main>
      <aside className={`drawer ${open ? "show" : ""}`}><div className="drawerHead"><h2>Your cart</h2><button onClick={()=>setOpen(false)}>×</button></div>{!cart.length ? <p className="empty">Add a product to test the checkout flow.</p> : <div className="cartItems">{cart.map(i => <div className="cartItem" key={i.id}><div><b>{i.name}</b><span>QAR {i.price} • {i.size}</span></div><div className="qty"><button onClick={()=>qty(i.id,-1)}>-</button><span>{i.qty}</span><button onClick={()=>qty(i.id,1)}>+</button><button className="remove" onClick={()=>remove(i.id)}>×</button></div></div>)}</div>}<div className="total"><span>Total</span><b>QAR {total}</b></div><a className="whatsapp" href={`https://wa.me/${WHATSAPP}?text=${whatsappText(cart)}`} target="_blank" rel="noreferrer">Continue on WhatsApp</a></aside>
      <footer><span>Demo website for 974 Perfumes Qatar</span><span>Final catalog should be confirmed by owner.</span></footer>
    </div>
  );
}
