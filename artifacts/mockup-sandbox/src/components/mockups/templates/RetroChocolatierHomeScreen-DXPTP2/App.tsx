import { useState } from 'react';
import {
  ShoppingBag, Search, Heart, Plus, Home, LayoutGrid, Sparkles, User,
  ChevronRight, MapPin, Clock, Crown, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- data ---------------- */

const CATEGORIES = [
  { id: 'all', label: 'All', count: 24 },
  { id: 'dark', label: 'Dark', count: 9 },
  { id: 'milk', label: 'Milk', count: 6 },
  { id: 'truffle', label: 'Truffles', count: 5 },
  { id: 'gift', label: 'Gifting', count: 4 },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Estate Noir 72%',
    origin: 'Sambirano Valley · Madagascar',
    cat: 'dark',
    cocoa: 72,
    price: 24.0,
    sale: 16.8,
    off: 30,
    img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=560&fit=crop',
    note: 'Red fruit · Cedar',
  },
  {
    id: 2,
    name: 'Burnt Honey Praline',
    origin: 'Single-herd milk · 41% cacao',
    cat: 'milk',
    cocoa: 41,
    price: 22.0,
    sale: 15.4,
    off: 30,
    img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&h=560&fit=crop',
    note: 'Toasted honey · Sea salt',
  },
  {
    id: 3,
    name: 'Velvet Truffle Dozen',
    origin: 'Hand-rolled · Cocoa dusted',
    cat: 'truffle',
    cocoa: 64,
    price: 38.0,
    sale: 28.5,
    off: 25,
    img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&h=560&fit=crop',
    note: 'Tahitian vanilla ganache',
  },
  {
    id: 4,
    name: 'Smoked Almond Bâton',
    origin: 'Marcona almond · 68% cacao',
    cat: 'dark',
    cocoa: 68,
    price: 18.0,
    sale: 12.6,
    off: 30,
    img: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?w=800&h=560&fit=crop',
    note: 'Oak smoke · Demerara',
  },
  {
    id: 5,
    name: "Founder's Coffret No. 9",
    origin: 'Curated 24-piece atelier box',
    cat: 'gift',
    cocoa: 70,
    price: 64.0,
    sale: 48.0,
    off: 25,
    img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=560&fit=crop',
    note: 'Ribbon-sealed walnut case',
  },
];

/* ---------------- atoms ---------------- */

const Starburst = ({ className, children }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full starburst-spin">
      <polygon
        fill="currentColor"
        points="50,0 58,14 72,5 74,21 90,17 85,32 100,36 89,48 100,61 84,64 90,80 74,77 72,94 58,86 50,100 42,86 28,94 26,77 10,80 16,64 0,61 11,48 0,36 15,32 10,17 26,21 28,5 42,14"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-center leading-none">
      {children}
    </div>
  </div>
);

const Boomerang = ({ className }) => (
  <svg viewBox="0 0 200 120" className={className} fill="currentColor">
    <path d="M10 110 C 30 30, 90 5, 190 12 C 120 28, 70 55, 42 112 C 32 118, 18 118, 10 110 Z" />
  </svg>
);

/* ---------------- main ---------------- */

export default function App() {
  const [activeCat, setActiveCat] = useState('all');
  const [favs, setFavs] = useState([3]);
  const [cart, setCart] = useState(2);
  const [tab, setTab] = useState('home');

  const products =
    activeCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-8 px-4 bg-[#1d120c] relative overflow-hidden">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Jost:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-display { font-family: 'Fraunces', serif; }
        .font-ui { font-family: 'Jost', sans-serif; }
        .starburst-spin { animation: spin 36s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .phone-scroll::-webkit-scrollbar { width: 0; height: 0; }
        .phone-scroll { scrollbar-width: none; }
        .grain {
          background-image: radial-gradient(rgba(255,235,210,0.06) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .wood {
          background:
            repeating-linear-gradient(92deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 9px),
            linear-gradient(180deg, #8a5a38, #6f4527);
        }
        .ticket-edge {
          mask: radial-gradient(circle 6px at 0 50%, transparent 98%, #000) ;
        }
      `,
        }}
      />

      {/* backdrop decoration */}
      <div className="absolute inset-0 grain pointer-events-none" />
      <Boomerang className="absolute -left-24 top-10 w-[420px] text-[#c8552a]/15 rotate-[18deg] pointer-events-none" />
      <Boomerang className="absolute -right-32 bottom-0 w-[520px] text-[#d9a441]/10 -rotate-[160deg] pointer-events-none" />

      {/* ============ PHONE ============ */}
      <div className="relative w-[400px] max-w-full font-ui">
        <div className="rounded-[44px] bg-[#2b1a12] p-[10px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#5a3a26]">
          <div className="rounded-[36px] overflow-hidden bg-[#f3e7d3] relative h-[820px] flex flex-col">

            {/* status bar */}
            <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[#2b1a12] text-[11px] font-semibold tracking-wide">
              <span>9:41</span>
              <div className="w-24 h-6 bg-[#2b1a12] rounded-full" />
              <span>● ● ▮</span>
            </div>

            {/* header */}
            <header className="px-5 pt-2 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#2b1a12] flex items-center justify-center">
                  <Crown size={16} className="text-[#d9a441]" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[17px] leading-none text-[#2b1a12] tracking-tight">
                    Maison Régent
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#9b6b3e] mt-0.5">
                    Chocolatiers · est. 1957
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full border border-[#d8c4a3] flex items-center justify-center text-[#2b1a12] hover:bg-[#e8d8bd] transition-colors">
                  <Search size={15} />
                </button>
                <button className="relative w-9 h-9 rounded-full bg-[#2b1a12] flex items-center justify-center text-[#f3e7d3] hover:bg-[#3e2417] transition-colors">
                  <ShoppingBag size={15} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c8552a] text-white text-[9px] font-bold flex items-center justify-center">
                    {cart}
                  </span>
                </button>
              </div>
            </header>

            {/* delivery strip */}
            <div className="mx-5 mb-3 flex items-center justify-between rounded-lg bg-[#e8d8bd] px-3 py-2">
              <div className="flex items-center gap-1.5 text-[11px] text-[#5a3a26] font-medium">
                <MapPin size={12} className="text-[#c8552a]" />
                Atelier pickup — Flatiron, NYC
              </div>
              <button className="text-[11px] font-semibold text-[#c8552a] flex items-center gap-0.5">
                Change <ChevronRight size={12} />
              </button>
            </div>

            {/* scroll area */}
            <div className="phone-scroll flex-1 overflow-y-auto px-5 pb-28">

              {/* ---------- promo hero ---------- */}
              <section className="relative rounded-2xl rounded-tr-[52px] overflow-hidden wood text-[#f7ecd9] p-5 pb-6">
                <Boomerang className="absolute -right-10 -bottom-8 w-56 text-[#2b1a12]/30 -rotate-12 pointer-events-none" />
                <div className="relative grid grid-cols-3 gap-3">
                  {/* 1/3 — starburst */}
                  <div className="col-span-1 flex flex-col items-center justify-between">
                    <Starburst className="w-[88px] h-[88px] text-[#d9a441]">
                      <span className="font-display font-bold text-[#2b1a12]">
                        <span className="block text-[24px] leading-none">30%</span>
                        <span className="block text-[9px] uppercase tracking-widest mt-0.5">off</span>
                      </span>
                    </Starburst>
                    <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#f0d9a8]">
                      <Clock size={11} /> 2d 14h
                    </div>
                  </div>
                  {/* 2/3 — copy */}
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#f0d9a8] mb-1.5">
                      The Harvest Edict
                    </p>
                    <h1 className="font-display font-semibold text-[26px] leading-[1.05] tracking-tight">
                      Autumn Reserve, priced by decree.
                    </h1>
                    <p className="text-[12px] text-[#ead9bd]/85 mt-2 leading-snug">
                      The Estate Collection — first pressing of the '24 Madagascan harvest. Until Sunday only.
                    </p>
                    <button className="mt-3.5 inline-flex items-center gap-1.5 bg-[#f3e7d3] text-[#2b1a12] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors">
                      Claim the reserve <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </section>

              {/* ---------- section title ---------- */}
              <div className="flex items-end justify-between mt-6 mb-3">
                <div>
                  <h2 className="font-display font-semibold text-[20px] text-[#2b1a12] leading-none">
                    On sale this week
                  </h2>
                  <p className="text-[11px] text-[#9b6b3e] mt-1">
                    {products.length} pieces · sorted by house ranking
                  </p>
                </div>
                <button className="text-[11px] font-semibold text-[#c8552a] uppercase tracking-wider flex items-center">
                  View all <ChevronRight size={13} />
                </button>
              </div>

              {/* ---------- asymmetric ⅓ + ⅔ grid ---------- */}
              <div className="grid grid-cols-3 gap-3 items-start">

                {/* LEFT ⅓ — category rail */}
                <aside className="col-span-1 sticky top-0">
                  <div className="rounded-xl rounded-bl-[36px] bg-[#2b1a12] p-2 flex flex-col gap-1.5">
                    {CATEGORIES.map((c) => {
                      const active = activeCat === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveCat(c.id)}
                          className={`relative rounded-lg px-2 py-3 flex flex-col items-center gap-2 transition-all duration-200 ${
                            active
                              ? 'bg-[#c8552a] text-[#fff4e4]'
                              : 'text-[#c9a886] hover:bg-[#3e2417]'
                          }`}
                        >
                          <span className="vertical-text text-[12px] font-semibold tracking-[0.14em] uppercase">
                            {c.label}
                          </span>
                          <span
                            className={`text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                              active ? 'bg-[#2b1a12]/30' : 'bg-[#3e2417]'
                            }`}
                          >
                            {c.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* cocoa index card */}
                  <div className="mt-3 rounded-xl bg-[#3e6b5c] text-[#eaf2ec] p-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#bcd6c8]">
                      Cocoa index
                    </p>
                    <p className="font-display font-semibold text-[22px] leading-none mt-1">68.4%</p>
                    <p className="text-[10px] text-[#bcd6c8] mt-1 leading-snug">
                      avg. cacao across this edit
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-[#2c4f43] overflow-hidden">
                      <div className="h-full w-[68%] rounded-full bg-[#d9a441]" />
                    </div>
                  </div>
                </aside>

                {/* RIGHT ⅔ — product cards */}
                <div className="col-span-2 flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {products.map((p, i) => (
                      <motion.article
                        layout
                        key={p.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.28, delay: i * 0.04 }}
                        className="bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(43,26,18,0.08)] ring-1 ring-[#e8d8bd]"
                      >
                        <div className="relative">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="w-full h-[118px] object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-[#c8552a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                            −{p.off}%
                          </span>
                          <button
                            onClick={() => toggleFav(p.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#f3e7d3]/95 flex items-center justify-center transition-transform active:scale-90"
                          >
                            <Heart
                              size={13}
                              className={
                                favs.includes(p.id)
                                  ? 'fill-[#c8552a] text-[#c8552a]'
                                  : 'text-[#5a3a26]'
                              }
                            />
                          </button>
                          <span className="absolute bottom-2 left-2 bg-[#2b1a12]/85 text-[#f0d9a8] text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
                            {p.cocoa}% CACAO
                          </span>
                        </div>

                        <div className="p-3">
                          <h3 className="font-display font-semibold text-[15px] text-[#2b1a12] leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-[10.5px] text-[#9b6b3e] mt-0.5">{p.origin}</p>
                          <p className="text-[10.5px] text-[#3e6b5c] font-medium mt-0.5">
                            {p.note}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-bold text-[17px] text-[#c8552a]">
                                ${p.sale.toFixed(2)}
                              </span>
                              <span className="text-[11px] text-[#b09575] line-through">
                                ${p.price.toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={() => setCart((c) => c + 1)}
                              className="w-8 h-8 rounded-full bg-[#2b1a12] text-[#f3e7d3] flex items-center justify-center hover:bg-[#c8552a] transition-colors active:scale-90"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>

                  {/* atelier note */}
                  <div className="rounded-xl rounded-br-[32px] bg-[#d9a441] p-4 text-[#2b1a12]">
                    <p className="text-[9px] uppercase tracking-[0.22em] font-bold">
                      From the atelier
                    </p>
                    <p className="font-display text-[14px] font-medium leading-snug mt-1.5">
                      “We do not discount often. When we do, it is by design — and it ends precisely on time.”
                    </p>
                    <p className="text-[10px] font-semibold mt-2">— H. Régent, Maître Chocolatier</p>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom nav */}
            <nav className="absolute bottom-0 inset-x-0 bg-[#2b1a12] px-7 pt-3 pb-6 flex items-center justify-between rounded-t-[26px]">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'shop', icon: LayoutGrid, label: 'Collections' },
                { id: 'atelier', icon: Sparkles, label: 'Atelier' },
                { id: 'account', icon: User, label: 'Account' },
              ].map((n) => {
                const Active = tab === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setTab(n.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className={`w-10 h-7 rounded-full flex items-center justify-center transition-colors ${
                        Active ? 'bg-[#c8552a] text-[#fff4e4]' : 'text-[#9b6b3e]'
                      }`}
                    >
                      <n.icon size={16} />
                    </div>
                    <span
                      className={`text-[9px] tracking-wide font-semibold ${
                        Active ? 'text-[#f0d9a8]' : 'text-[#7a5a3d]'
                      }`}
                    >
                      {n.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}