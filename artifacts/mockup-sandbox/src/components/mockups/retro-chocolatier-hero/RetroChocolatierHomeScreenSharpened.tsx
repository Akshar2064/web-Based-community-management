import { useId, useState, type ReactNode, type UIEvent } from 'react';
import {
  ShoppingBag, Search, Heart, Plus, Home, LayoutGrid, Sparkles, User,
  ChevronRight, MapPin, Clock, Crown, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Starburst = ({ className, children }: { className: string; children: ReactNode }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full starburst-spin" aria-hidden="true">
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

const Boomerang = ({ className }: { className: string }) => (
  <svg viewBox="0 0 200 120" className={className} fill="currentColor" aria-hidden="true">
    <path d="M10 110 C 30 30, 90 5, 190 12 C 120 28, 70 55, 42 112 C 32 118, 18 118, 10 110 Z" />
  </svg>
);

export default function RetroChocolatierHomeScreenSharpened() {
  const [activeCat, setActiveCat] = useState('all');
  const [favs, setFavs] = useState([3]);
  const [cart, setCart] = useState(2);
  const [tab, setTab] = useState('home');
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [woodShift, setWoodShift] = useState(0);
  const popoverId = useId();

  const products =
    activeCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  const toggleFav = (id: number) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setWoodShift(Math.min(6, event.currentTarget.scrollTop * 0.04));
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#1d120c] px-4 py-8">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Jost:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: `
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
      ` }} />

      <div className="absolute inset-0 grain pointer-events-none" />
      <Boomerang className="pointer-events-none absolute -left-24 top-10 w-[420px] rotate-[18deg] text-[#c8552a]/15" />
      <Boomerang className="pointer-events-none absolute -right-32 bottom-0 w-[520px] -rotate-[160deg] text-[#d9a441]/10" />

      <div className="relative w-[400px] max-w-full font-ui">
        <div className="rounded-[44px] bg-[#2b1a12] p-[10px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#5a3a26]">
          <div className="relative flex h-[820px] flex-col overflow-hidden rounded-[36px] bg-[#f3e7d3]">
            <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[11px] font-semibold tracking-wide text-[#2b1a12]">
              <span>9:41</span>
              <div className="h-6 w-24 rounded-full bg-[#2b1a12]" />
              <span aria-label="full signal and battery">● ● ▮</span>
            </div>

            <header className="flex items-center justify-between px-5 pb-3 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b1a12]">
                  <Crown size={16} className="text-[#d9a441]" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="font-display text-[17px] font-semibold leading-none tracking-tight text-[#2b1a12]">
                    Maison Régent
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#9b6b3e]">
                    Chocolatiers · est. 1957
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Search the collection" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c4a3] text-[#2b1a12] transition-colors hover:bg-[#e8d8bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3e7d3]">
                  <Search size={15} />
                </button>
                <button type="button" aria-label={`Open bag, ${cart} items`} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2b1a12] text-[#f3e7d3] transition-colors hover:bg-[#3e2417] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3e7d3]">
                  <ShoppingBag size={15} />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8552a] text-[9px] font-bold text-white">{cart}</span>
                </button>
              </div>
            </header>

            <div className="mx-5 mb-3 flex items-center justify-between rounded-lg bg-[#e8d8bd] px-3 py-2">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5a3a26]">
                <MapPin size={12} className="text-[#c8552a]" />
                Atelier pickup — Flatiron, NYC
              </div>
              <button type="button" aria-label="Change atelier pickup location" className="flex items-center gap-0.5 text-[11px] font-semibold text-[#c8552a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a] focus-visible:ring-offset-1">
                Change <ChevronRight size={12} />
              </button>
            </div>

            <div onScroll={handleScroll} className="phone-scroll flex-1 overflow-y-auto px-5 pb-28">
              <section className="relative overflow-hidden rounded-2xl rounded-tr-[52px] bg-[#6f4527] p-5 pb-6 text-[#f7ecd9]">
                <div
                  aria-hidden="true"
                  className="wood pointer-events-none absolute -inset-y-1 inset-x-0 transition-transform duration-100 ease-out"
                  style={{ transform: `translate3d(0, ${woodShift}px, 0)` }}
                />
                <Boomerang className="pointer-events-none absolute -bottom-8 -right-10 w-56 -rotate-12 text-[#2b1a12]/30" />
                <div className="relative grid grid-cols-3 gap-3">
                  <div className="relative col-span-1 flex flex-col items-center justify-start">
                    <button
                      type="button"
                      aria-label="View 30 percent reserve discount details"
                      aria-expanded={badgeOpen}
                      aria-controls={popoverId}
                      onClick={() => setBadgeOpen((open) => !open)}
                      className="relative z-10 block h-[88px] w-[88px] rounded-full text-[#d9a441] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7ecd9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6f4527]"
                    >
                      <Starburst className="h-full w-full">
                        <span className="font-display font-bold text-[#2b1a12]">
                          <span className="block text-[24px] leading-none">30%</span>
                          <span className="mt-0.5 block text-[9px] uppercase tracking-widest">off</span>
                        </span>
                      </Starburst>
                    </button>
                    {badgeOpen && (
                      <div
                        id={popoverId}
                        role="status"
                        className="absolute left-1/2 top-[98px] z-20 w-[150px] -translate-x-1/2 rounded-lg bg-[#f3e7d3] px-3 py-2 text-left text-[#2b1a12] shadow-[0_8px_20px_rgba(43,26,18,0.25)] ring-1 ring-[#d8c4a3]"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c8552a]">Reserve offer</p>
                        <p className="mt-1 text-[11px] leading-snug">30% off the Estate Collection.</p>
                        <p className="mt-1 text-[10px] font-semibold text-[#9b6b3e]">Expires Sunday at midnight.</p>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <p className="mb-1.5 text-[10px] uppercase tracking-[0.28em] text-[#f0d9a8]">The Harvest Edict</p>
                    <h1 className="font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#e0cfb5]">
                      Autumn Reserve, priced by decree.
                    </h1>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#f0d9a8]" aria-label="Offer countdown">
                      <Clock size={11} aria-hidden="true" /> <span>2D 14H</span>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-snug text-[#ead9bd]/85">
                      The Estate Collection — first pressing of the '24 Madagascan harvest. Until Sunday only.
                    </p>
                    <button
                      type="button"
                      aria-label="Claim the autumn reserve"
                      className="group relative mt-3.5 flex h-11 w-full items-center justify-center gap-1.5 overflow-hidden rounded-full bg-[#f3e7d3] px-4 text-[12px] font-semibold text-[#2b1a12] transition-transform duration-100 ease-out hover:bg-[#fff4e4] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3e7d3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6f4527]"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-[#2b1a12] opacity-0 transition-opacity duration-100 group-active:opacity-[0.14]" aria-hidden="true" />
                      <span className="relative">Claim the reserve</span>
                      <ArrowUpRight size={14} className="relative" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>

              <div className="mb-3 mt-6 flex items-end justify-between">
                <div>
                  <h2 className="font-display text-[20px] font-semibold leading-none text-[#2b1a12]">On sale this week</h2>
                  <p className="mt-1 text-[11px] text-[#9b6b3e]">{products.length} pieces · sorted by house ranking</p>
                </div>
                <button type="button" aria-label="View all products" className="flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#c8552a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a] focus-visible:ring-offset-1">
                  View all <ChevronRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-3 items-start gap-3">
                <aside className="sticky top-0 col-span-1">
                  <div className="flex flex-col gap-1.5 rounded-xl rounded-bl-[36px] bg-[#2b1a12] p-2">
                    {CATEGORIES.map((c) => {
                      const active = activeCat === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setActiveCat(c.id)}
                          aria-label={`Filter by ${c.label}`}
                          className={`relative flex flex-col items-center gap-2 rounded-lg px-2 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d9a8] focus-visible:ring-offset-1 focus-visible:ring-offset-[#2b1a12] ${active ? 'bg-[#c8552a] text-[#fff4e4]' : 'text-[#c9a886] hover:bg-[#3e2417]'}`}
                        >
                          <span className="vertical-text text-[12px] font-semibold uppercase tracking-[0.14em]">{c.label}</span>
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${active ? 'bg-[#2b1a12]/30' : 'bg-[#3e2417]'}`}>{c.count}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 rounded-xl bg-[#3e6b5c] p-3 text-[#eaf2ec]">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#bcd6c8]">Cocoa index</p>
                    <p className="font-display mt-1 text-[22px] font-semibold leading-none">68.4%</p>
                    <p className="mt-1 text-[10px] leading-snug text-[#bcd6c8]">avg. cacao across this edit</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2c4f43]"><div className="h-full w-[68%] rounded-full bg-[#d9a441]" /></div>
                  </div>
                </aside>

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
                        className="overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(43,26,18,0.08)] ring-1 ring-[#e8d8bd]"
                      >
                        <div className="relative">
                          <img src={p.img} alt={p.name} className="h-[118px] w-full object-cover" />
                          <span className="absolute left-2 top-2 rounded-full bg-[#c8552a] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">−{p.off}%</span>
                          <button type="button" aria-label={`${favs.includes(p.id) ? 'Remove' : 'Add'} ${p.name} ${favs.includes(p.id) ? 'from' : 'to'} favorites`} onClick={() => toggleFav(p.id)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#f3e7d3]/95 transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a]">
                            <Heart size={13} className={favs.includes(p.id) ? 'fill-[#c8552a] text-[#c8552a]' : 'text-[#5a3a26]'} />
                          </button>
                          <span className="absolute bottom-2 left-2 rounded-full bg-[#2b1a12]/85 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-[#f0d9a8]">{p.cocoa}% CACAO</span>
                        </div>
                        <div className="p-3">
                          <h3 className="font-display text-[15px] font-semibold leading-tight text-[#2b1a12]">{p.name}</h3>
                          <p className="mt-0.5 text-[10.5px] text-[#9b6b3e]">{p.origin}</p>
                          <p className="mt-0.5 text-[10.5px] font-medium text-[#3e6b5c]">{p.note}</p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display text-[17px] font-bold text-[#c8552a]">${p.sale.toFixed(2)}</span>
                              <span className="text-[11px] text-[#b09575] line-through">${p.price.toFixed(2)}</span>
                            </div>
                            <button type="button" aria-label={`Add ${p.name} to bag`} onClick={() => setCart((c) => c + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b1a12] text-[#f3e7d3] transition-colors hover:bg-[#c8552a] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8552a] focus-visible:ring-offset-1">
                              <Plus size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                  <div className="rounded-xl rounded-br-[32px] bg-[#d9a441] p-4 text-[#2b1a12]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em]">From the atelier</p>
                    <p className="font-display mt-1.5 text-[14px] font-medium leading-snug">“We do not discount often. When we do, it is by design — and it ends precisely on time.”</p>
                    <p className="mt-2 text-[10px] font-semibold">— H. Régent, Maître Chocolatier</p>
                  </div>
                </div>
              </div>
            </div>

            <nav aria-label="Primary navigation" className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-t-[26px] bg-[#2b1a12] px-7 pb-6 pt-3">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'shop', icon: LayoutGrid, label: 'Collections' },
                { id: 'atelier', icon: Sparkles, label: 'Atelier' },
                { id: 'account', icon: User, label: 'Account' },
              ].map((n) => {
                const Active = tab === n.id;
                return (
                  <button type="button" key={n.id} onClick={() => setTab(n.id)} aria-label={`Open ${n.label}`} className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d9a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b1a12]">
                    <div className={`flex h-7 w-10 items-center justify-center rounded-full transition-colors ${Active ? 'bg-[#c8552a] text-[#fff4e4]' : 'text-[#9b6b3e]'}`}><n.icon size={16} /></div>
                    <span className={`text-[9px] font-semibold tracking-wide ${Active ? 'text-[#f0d9a8]' : 'text-[#7a5a3d]'}`}>{n.label}</span>
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