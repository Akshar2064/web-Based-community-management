import { useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Baby,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileText,
  Filter,
  HeartHandshake,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ReceiptIndianRupee,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Siren,
  Sparkles,
  UserRound,
  UsersRound,
  WalletCards,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';

type View =
  | 'home'
  | 'visitors'
  | 'parking'
  | 'kids'
  | 'amenities'
  | 'payments'
  | 'requests'
  | 'services'
  | 'marketplace'
  | 'notifications'
  | 'profile';

type ToastTone = 'success' | 'info' | 'danger';
type Toast = { tone: ToastTone; message: string } | null;

const NAV_ITEMS: Array<{ id: View; label: string; icon: LucideIcon }> = [
  { id: 'home', label: 'Home', icon: LayoutDashboard },
  { id: 'visitors', label: 'Visitors', icon: UsersRound },
  { id: 'parking', label: 'Parking', icon: CarFront },
  { id: 'kids', label: 'Kids tracking', icon: Baby },
  { id: 'amenities', label: 'Amenities', icon: CalendarDays },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'requests', label: 'Service requests', icon: Wrench },
  { id: 'services', label: 'Find a service', icon: BriefcaseBusiness },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'My profile', icon: UserRound },
];

const visitors = [
  { name: 'Rahul Sharma', type: 'Guest', time: '10:30 AM', vehicle: 'KA 03 MJ 4421', status: 'Expected', initials: 'RS', tone: 'mint' },
  { name: 'Priya Kumar', type: 'Family', time: '09:15 AM', vehicle: '—', status: 'Checked in', initials: 'PK', tone: 'lavender' },
  { name: 'Aarav Couriers', type: 'Delivery', time: '12:45 PM', vehicle: 'DL 01 LA 2098', status: 'Expected', initials: 'AC', tone: 'peach' },
];

const announcements = [
  { category: 'Community', title: 'Water tank cleaning this Sunday', date: '06 Sep 2026', color: 'teal' },
  { category: 'Clubhouse', title: 'New evening yoga sessions are open', date: '04 Sep 2026', color: 'amber' },
  { category: 'Events', title: 'Ganesh Chaturthi registrations are open', date: '02 Sep 2026', color: 'rose' },
];

const quickActions: Array<{ label: string; note: string; icon: LucideIcon; view?: View; action?: string; tone: string }> = [
  { label: 'Invite visitor', note: 'Create a pass', icon: UsersRound, action: 'visitor', tone: 'mint' },
  { label: 'Pay maintenance', note: 'Due 10 Sep', icon: ReceiptIndianRupee, view: 'payments', tone: 'amber' },
  { label: 'Book amenity', note: 'See open slots', icon: CalendarCheck2, view: 'amenities', tone: 'lavender' },
  { label: 'Raise request', note: 'Get community help', icon: MessageSquareText, view: 'requests', tone: 'peach' },
  { label: 'Track child', note: 'Zone-level view', icon: Baby, view: 'kids', tone: 'blue' },
  { label: 'Find a service', note: 'Verified workers', icon: HeartHandshake, view: 'services', tone: 'rose' },
  { label: 'Shop locally', note: 'Community vendors', icon: ShoppingBag, view: 'marketplace', tone: 'gold' },
];

function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>;
}

function StatCard({
  label,
  value,
  meta,
  icon: Icon,
  tone,
  onClick,
}: {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
  tone: string;
  onClick: () => void;
}) {
  return (
    <button className="stat-card" onClick={onClick}>
      <div className={`stat-icon ${tone}`}><Icon size={18} strokeWidth={1.8} /></div>
      <div className="stat-copy">
        <span className="eyebrow">{label}</span>
        <strong>{value}</strong>
        <span className="stat-meta">{meta}</span>
      </div>
      <ArrowUpRight size={17} className="stat-arrow" />
    </button>
  );
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ icon: Icon, title, copy, action }: { icon: LucideIcon; title: string; copy: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icon size={23} /></div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [visitorTab, setVisitorTab] = useState('Upcoming');
  const [paymentTab, setPaymentTab] = useState('Current bills');

  const filteredVisitors = useMemo(
    () => visitors.filter((visitor) => `${visitor.name} ${visitor.type} ${visitor.vehicle}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const navigate = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const notify = (message: string, tone: ToastTone = 'success') => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3200);
  };

  const activeLabel = NAV_ITEMS.find((item) => item.id === activeView)?.label ?? 'Home';

  const renderHome = () => (
    <>
      <section className="welcome-grid">
        <div className="welcome-card">
          <div className="welcome-orb orb-one" />
          <div className="welcome-orb orb-two" />
          <div className="welcome-content">
            <div className="welcome-kicker"><Sparkles size={14} /> Tuesday, 08 September 2026</div>
            <h1>Good morning,<br /><em>Akshar.</em></h1>
            <p>Here’s what’s happening around your home at <strong>Willow Creek Estates</strong>.</p>
            <div className="home-meta"><span><Building2 size={15} /> Tower A · Flat A-1204</span><span className="dot-separator" /><span>Clear skies · 28°C</span></div>
          </div>
          <div className="welcome-illustration" aria-hidden="true">
            <div className="sun-disc" />
            <div className="illustration-house"><span /><span /><span /></div>
            <div className="illustration-tree tree-left" /><div className="illustration-tree tree-right" />
          </div>
        </div>
        <div className="focus-card">
          <div className="card-heading"><div><span className="eyebrow">Your next thing</span><h3>Sky Lounge booking</h3></div><CalendarCheck2 size={20} /></div>
          <div className="booking-date"><strong>10</strong><span>SEP<br /><small>THU</small></span></div>
          <div className="booking-info"><span>6:00 PM – 8:00 PM</span><span>6 people · Confirmed</span></div>
          <div className="booking-actions"><button className="text-button" onClick={() => notify('Booking details opened', 'info')}>View booking <ChevronRight size={15} /></button><button className="icon-button" aria-label="More booking options" onClick={() => notify('More booking options', 'info')}><MoreHorizontal size={18} /></button></div>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard label="Today’s visitors" value="3 expected" meta="1 already checked in" icon={UsersRound} tone="mint" onClick={() => navigate('visitors')} />
        <StatCard label="Outstanding payment" value="₹4,850" meta="Due 10 September" icon={CircleDollarSign} tone="amber" onClick={() => navigate('payments')} />
        <StatCard label="Upcoming booking" value="Clubhouse" meta="Thursday · 6:00 PM" icon={CalendarDays} tone="lavender" onClick={() => navigate('amenities')} />
        <StatCard label="Open requests" value="1 active" meta="Maintenance team assigned" icon={Wrench} tone="peach" onClick={() => navigate('requests')} />
      </section>

      <section className="section-block quick-section">
        <div className="section-heading"><div><span className="eyebrow">Make yourself at home</span><h2>Quick actions</h2></div><span className="section-count">7 available</span></div>
        <div className="quick-grid">
          {quickActions.map((item) => (
            <button key={item.label} className="quick-action" onClick={() => item.action === 'visitor' ? setShowVisitorModal(true) : item.view && navigate(item.view)}>
              <span className={`quick-icon ${item.tone}`}><item.icon size={19} /></span>
              <span><strong>{item.label}</strong><small>{item.note}</small></span>
              <ChevronRight size={16} className="quick-chevron" />
            </button>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <div className="panel visitors-panel">
          <div className="panel-header"><div><span className="eyebrow">At your gate</span><h2>Today’s visitors</h2></div><button className="link-button" onClick={() => navigate('visitors')}>View all <ArrowUpRight size={15} /></button></div>
          <div className="visitor-table">
            <div className="table-row table-head"><span>Visitor</span><span>Purpose</span><span>Arrival</span><span>Status</span><span /></div>
            {filteredVisitors.slice(0, 3).map((visitor) => (
              <div className="table-row" key={visitor.name}>
                <div className="person-cell"><span className={`initial-avatar ${visitor.tone}`}>{visitor.initials}</span><span><strong>{visitor.name}</strong><small>{visitor.vehicle}</small></span></div>
                <span className="muted-cell">{visitor.type}</span><span className="muted-cell">{visitor.time}</span><StatusPill tone={visitor.status === 'Checked in' ? 'success' : 'pending'}>{visitor.status}</StatusPill><button className="row-more" aria-label={`View ${visitor.name}`} onClick={() => notify(`${visitor.name}'s pass opened`, 'info')}><MoreHorizontal size={17} /></button>
              </div>
            ))}
          </div>
          <div className="panel-footer"><span><ShieldCheck size={15} /> All passes are verified at the gate</span><button className="text-button" onClick={() => setShowVisitorModal(true)}>Invite someone <Plus size={15} /></button></div>
        </div>

        <div className="panel updates-panel">
          <div className="panel-header"><div><span className="eyebrow">From your community</span><h2>Willow Creek updates</h2></div><button className="icon-button" aria-label="View all announcements" onClick={() => navigate('notifications')}><ArrowUpRight size={17} /></button></div>
          <div className="update-list">
            {announcements.map((announcement) => (
              <button className="update-item" key={announcement.title} onClick={() => notify(announcement.title, 'info')}>
                <span className={`update-mark ${announcement.color}`}><FileText size={16} /></span>
                <span><strong>{announcement.title}</strong><small>{announcement.category} · {announcement.date}</small></span><ChevronRight size={16} />
              </button>
            ))}
          </div>
          <div className="soft-note"><Sparkles size={16} /><span>Small things make a community feel like home.</span></div>
        </div>
      </section>

      <section className="lower-grid">
        <div className="panel payment-panel">
          <div className="panel-header"><div><span className="eyebrow">Keep things current</span><h2>Payment due</h2></div><StatusPill tone="pending">Due in 2 days</StatusPill></div>
          <div className="payment-main"><div className="payment-symbol"><ReceiptIndianRupee size={22} /></div><div><strong>Maintenance · September</strong><small>Willow Creek Estates · A-1204</small></div><strong className="amount">₹4,850</strong></div>
          <div className="payment-details"><span>Due 10 Sep 2026</span><span>Auto-pay is off</span></div>
          <button className="primary-button full-button" onClick={() => navigate('payments')}>Review & pay <ArrowUpRight size={16} /></button>
        </div>
        <div className="panel request-panel">
          <div className="panel-header"><div><span className="eyebrow">We’re on it</span><h2>My service request</h2></div><StatusPill tone="info">In progress</StatusPill></div>
          <div className="request-title"><span className="request-icon"><Wrench size={18} /></span><div><strong>Water leakage in kitchen</strong><small>#REQ-2084 · Raised 06 Sep</small></div></div>
          <div className="timeline"><span className="timeline-line" /><div className="timeline-step done"><span><CheckCircle2 size={14} /></span><div><strong>Request received</strong><small>06 Sep · 10:15 AM</small></div></div><div className="timeline-step current"><span><Settings2 size={14} /></span><div><strong>Maintenance team assigned</strong><small>Visit expected today</small></div></div><div className="timeline-step"><span><CircleDollarSign size={14} /></span><div><strong>Resolution</strong><small>Pending inspection</small></div></div></div>
          <button className="text-button" onClick={() => navigate('requests')}>View request details <ChevronRight size={15} /></button>
        </div>
      </section>
    </>
  );

  const renderVisitors = () => (
    <>
      <PageHeader eyebrow="People coming your way" title="Visitors" description="Invite guests, view current passes, and keep an eye on who’s at the gate." action={<button className="primary-button" onClick={() => setShowVisitorModal(true)}><Plus size={17} /> Invite visitor</button>} />
      <div className="page-tabs">{['Upcoming', 'Currently inside', 'History'].map((tab) => <button key={tab} className={visitorTab === tab ? 'active' : ''} onClick={() => setVisitorTab(tab)}>{tab}<span>{tab === 'Upcoming' ? '3' : tab === 'Currently inside' ? '1' : '18'}</span></button>)}</div>
      <div className="panel wide-panel"><div className="toolbar"><div className="toolbar-search"><Search size={16} /><input placeholder="Search visitors" value={search} onChange={(event) => setSearch(event.target.value)} /></div><button className="secondary-button"><Filter size={16} /> Filters</button></div><div className="visitor-table spacious"><div className="table-row table-head"><span>Visitor</span><span>Purpose</span><span>Date & arrival</span><span>Vehicle</span><span>Status</span><span /></div>{filteredVisitors.map((visitor) => <div className="table-row" key={visitor.name}><div className="person-cell"><span className={`initial-avatar ${visitor.tone}`}>{visitor.initials}</span><span><strong>{visitor.name}</strong><small>Pass #VC-{visitor.initials}29</small></span></div><span className="muted-cell">{visitor.type}</span><span className="muted-cell">Today · {visitor.time}</span><span className="muted-cell">{visitor.vehicle}</span><StatusPill tone={visitor.status === 'Checked in' ? 'success' : 'pending'}>{visitor.status}</StatusPill><button className="row-more" onClick={() => notify('Visitor pass options opened', 'info')}><MoreHorizontal size={17} /></button></div>)}</div>{filteredVisitors.length === 0 && <EmptyState icon={UsersRound} title="No visitors found" copy="Try a different name or invite someone new." action={<button className="secondary-button" onClick={() => setShowVisitorModal(true)}>Invite visitor</button>} />}</div>
    </>
  );

  const renderPayments = () => (
    <>
      <PageHeader eyebrow="Simple, transparent billing" title="Payments" description="Stay on top of maintenance, utilities, and your payment history." action={<button className="secondary-button" onClick={() => notify('Receipt export prepared', 'info')}><Download size={16} /> Export history</button>} />
      <div className="finance-grid"><div className="finance-card main"><span className="eyebrow">Total outstanding</span><strong>₹4,850</strong><small>Across 1 current bill</small><CircleDollarSign size={52} /></div><div className="finance-card"><span className="eyebrow">Maintenance</span><strong>₹4,850</strong><small>Due 10 Sep</small><ReceiptIndianRupee size={21} /></div><div className="finance-card"><span className="eyebrow">Utilities</span><strong>₹0</strong><small>All paid up</small><CheckCircle2 size={21} /></div><div className="finance-card"><span className="eyebrow">Auto-pay</span><strong>Off</strong><small>Turn on in profile</small><WalletCards size={21} /></div></div>
      <div className="panel wide-panel"><div className="panel-header"><div><span className="eyebrow">Your statements</span><h2>Bills & payment history</h2></div><div className="page-tabs compact">{['Current bills', 'Payment history'].map((tab) => <button key={tab} className={paymentTab === tab ? 'active' : ''} onClick={() => setPaymentTab(tab)}>{tab}</button>)}</div></div>{paymentTab === 'Current bills' ? <div className="invoice-list"><div className="invoice-row invoice-head"><span>Invoice</span><span>Period</span><span>Amount</span><span>Due date</span><span>Status</span><span /></div><div className="invoice-row"><div className="invoice-name"><span className="invoice-icon amber"><ReceiptIndianRupee size={17} /></span><span><strong>Maintenance</strong><small>INV-SEP-1204</small></span></div><span>Sep 2026</span><strong>₹4,850</strong><span>10 Sep 2026</span><StatusPill tone="pending">Due soon</StatusPill><button className="primary-button small" onClick={() => notify('Payment flow started', 'info')}>Pay now</button></div></div> : <div className="history-list"><div className="history-row"><span className="invoice-icon mint"><CheckCircle2 size={17} /></span><div><strong>Maintenance · August</strong><small>Paid 08 Aug 2026 · UPI</small></div><strong>₹4,850</strong><button className="icon-button" onClick={() => notify('Receipt download simulated', 'success')}><Download size={16} /></button></div><div className="history-row"><span className="invoice-icon mint"><CheckCircle2 size={17} /></span><div><strong>Maintenance · July</strong><small>Paid 09 Jul 2026 · Card</small></div><strong>₹4,620</strong><button className="icon-button" onClick={() => notify('Receipt download simulated', 'success')}><Download size={16} /></button></div></div>}</div>
    </>
  );

  const renderAmenities = () => (
    <>
      <PageHeader eyebrow="Make time for what matters" title="Amenities" description="Find a space, choose a time, and make a booking in a few clicks." />
      <div className="amenity-grid">{[{ name: 'Sky Lounge', type: 'Clubhouse', price: '₹450 / hour', slots: '4 slots today', tone: 'lavender', icon: Building2 }, { name: 'Fitness Studio', type: 'Gym', price: 'Included', slots: 'Open until 10 PM', tone: 'mint', icon: Sparkles }, { name: 'The Courts', type: 'Badminton', price: '₹120 / hour', slots: '2 slots tomorrow', tone: 'peach', icon: HeartHandshake }, { name: 'Party Hall', type: 'Events', price: 'From ₹2,500', slots: 'Weekend availability', tone: 'amber', icon: CalendarDays }].map((amenity) => <button className="amenity-card" key={amenity.name} onClick={() => notify(`${amenity.name} booking flow opened`, 'info')}><div className={`amenity-visual ${amenity.tone}`}><amenity.icon size={34} strokeWidth={1.5} /><span className="availability-dot" /></div><div className="amenity-copy"><span className="eyebrow">{amenity.type}</span><h3>{amenity.name}</h3><p>{amenity.slots}</p><div><strong>{amenity.price}</strong><ChevronRight size={16} /></div></div></button>)}</div>
    </>
  );

  const renderRequests = () => (
    <>
      <PageHeader eyebrow="Help around your home" title="Service requests" description="Track open issues, see who’s assigned, and raise a new request when you need us." action={<button className="primary-button" onClick={() => notify('New request form opened', 'info')}><Plus size={17} /> New request</button>} />
      <div className="filter-tabs">{['All requests', 'Open', 'In progress', 'Resolved'].map((tab, index) => <button key={tab} className={index === 0 ? 'active' : ''}>{tab}<span>{[3, 1, 1, 1][index]}</span></button>)}</div>
      <div className="request-list">{[{ id: '#REQ-2084', title: 'Water leakage in kitchen', category: 'Plumbing', status: 'In progress', tone: 'info', date: '06 Sep 2026', assignee: 'Maintenance Team' }, { id: '#REQ-2078', title: 'Corridor light flickering', category: 'Electrical', status: 'Open', tone: 'pending', date: '02 Sep 2026', assignee: 'Awaiting assignment' }, { id: '#REQ-2017', title: 'Gate access card replacement', category: 'Security', status: 'Resolved', tone: 'success', date: '18 Aug 2026', assignee: 'Security Desk' }].map((request) => <button className="request-card" key={request.id} onClick={() => notify(`${request.id} details opened`, 'info')}><span className="request-icon"><Wrench size={18} /></span><span className="request-body"><span className="eyebrow">{request.category} · {request.id}</span><strong>{request.title}</strong><small>{request.date} · {request.assignee}</small></span><StatusPill tone={request.tone}>{request.status}</StatusPill><ChevronRight size={17} /></button>)}</div>
    </>
  );

  const renderKids = () => (
    <>
      <PageHeader eyebrow="Peace of mind, at a glance" title="Kids tracking" description="See approximate zone-level updates for the children linked to your home." action={<button className="secondary-button" onClick={() => notify('Pickup person manager opened', 'info')}><ShieldCheck size={16} /> Trusted pickups</button>} />
      <div className="notice-banner"><MapPinned size={18} /><span><strong>Privacy first.</strong> Locations are approximate and zone-level — never room-level.</span></div>
      <div className="kids-grid"><div className="kid-card"><div className="kid-top"><span className="child-avatar">RK</span><div><h3>Riya Kapoor</h3><span>Age 9 · Tag WC-031</span></div><StatusPill tone="success">Safe & active</StatusPill></div><div className="zone-map"><div className="map-label">Willow Creek Estates</div><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-zone zone-a">Clubhouse</div><div className="map-zone zone-b">Tower A</div><div className="map-pin"><MapPinned size={18} /></div></div><div className="kid-meta"><span><strong>Current zone</strong> Clubhouse lawn</span><span><strong>Last seen</strong> 2 min ago</span><span><strong>Tag battery</strong> 82%</span></div><button className="text-button" onClick={() => notify('Movement history opened', 'info')}>View movement history <ChevronRight size={15} /></button></div><div className="panel pickup-panel"><div className="panel-header"><div><span className="eyebrow">Who can collect them</span><h2>Authorized pickups</h2></div><button className="icon-button" onClick={() => notify('Add pickup person', 'info')}><Plus size={17} /></button></div><div className="pickup-row"><span className="initial-avatar lavender">AK</span><span><strong>Ananya Kapoor</strong><small>Mother · Always allowed</small></span><CheckCircle2 size={17} className="check-icon" /></div><div className="pickup-row"><span className="initial-avatar peach">VK</span><span><strong>Vikram Kapoor</strong><small>Father · Always allowed</small></span><CheckCircle2 size={17} className="check-icon" /></div><button className="secondary-button full-button" onClick={() => notify('Pickup person added', 'success')}><Plus size={16} /> Add trusted person</button></div></div>
    </>
  );

  const renderMarketplace = () => (
    <>
      <PageHeader eyebrow="Good things, close to home" title="Marketplace" description="Shop from trusted community vendors, book local services, and set up subscriptions." action={<button className="secondary-button" onClick={() => notify('Order history opened', 'info')}><PackageCheck size={16} /> Order history</button>} />
      <div className="market-categories">{['All vendors', 'Grocery', 'Pharmacy', 'Milk', 'Salon', 'Clinic', 'Car cleaning'].map((category, index) => <button key={category} className={index === 0 ? 'active' : ''}>{category}</button>)}</div>
      <div className="vendor-grid">{[{ name: 'The Daily Basket', type: 'Grocery · 4 min away', rating: '4.8', tone: 'mint', icon: ShoppingBag, offer: 'Free delivery over ₹499' }, { name: 'Bloom & Blow', type: 'Salon · Book today', rating: '4.9', tone: 'rose', icon: Sparkles, offer: '15% off first appointment' }, { name: 'Carewell Clinic', type: 'Family health · In community', rating: '4.7', tone: 'blue', icon: HeartHandshake, offer: 'Appointments from ₹350' }].map((vendor) => <button className="vendor-card" key={vendor.name} onClick={() => notify(`${vendor.name} opened`, 'info')}><div className={`vendor-visual ${vendor.tone}`}><vendor.icon size={30} /><span className="vendor-rating">★ {vendor.rating}</span></div><div><span className="eyebrow">{vendor.type}</span><h3>{vendor.name}</h3><p>{vendor.offer}</p></div><ChevronRight size={17} /></button>)}</div>
      <div className="subscription-strip"><div className="subscription-mark"><HeartHandshake size={22} /></div><div><span className="eyebrow">Save time every week</span><h3>Set up a home subscription</h3><p>Milk, car cleaning, and more — pause anytime.</p></div><button className="secondary-button" onClick={() => notify('Subscriptions opened', 'info')}>Explore subscriptions <ArrowUpRight size={15} /></button></div>
    </>
  );

  const renderGeneric = () => {
    const details: Record<Exclude<View, 'home' | 'visitors' | 'payments' | 'amenities' | 'requests' | 'kids' | 'marketplace'>, { eyebrow: string; title: string; description: string; icon: LucideIcon }> = {
      parking: { eyebrow: 'A smoother arrival', title: 'Visitor parking', description: 'Reserve a convenient slot for the people coming to see you.', icon: CarFront },
      services: { eyebrow: 'Trusted hands, nearby', title: 'Find a service', description: 'Browse verified workers recommended by your community.', icon: BriefcaseBusiness },
      notifications: { eyebrow: 'Stay in the loop', title: 'Notifications', description: 'A calm view of visitors, payments, bookings, and community news.', icon: Bell },
      profile: { eyebrow: 'Your home, your preferences', title: 'My profile', description: 'Manage your resident details, family members, and emergency contacts.', icon: UserRound },
    };
    const detail = details[activeView as keyof typeof details];
    return <><PageHeader eyebrow={detail.eyebrow} title={detail.title} description={detail.description} action={<button className="secondary-button" onClick={() => notify('This section is ready for your next action', 'info')}><detail.icon size={16} /> Explore</button>} /><div className="panel generic-panel"><div className="generic-icon"><detail.icon size={26} /></div><h2>{activeView === 'notifications' ? 'You’re all caught up' : 'A thoughtful experience is on its way'}</h2><p>{activeView === 'notifications' ? 'New updates will appear here as your community moves through the day.' : 'This prototype keeps the important resident action close, clear, and easy to complete.'}</p><button className="primary-button" onClick={() => navigate('home')}><ArrowLeft size={16} /> Back to home</button></div></>;
  };

  const renderView = () => {
    if (activeView === 'home') return renderHome();
    if (activeView === 'visitors') return renderVisitors();
    if (activeView === 'payments') return renderPayments();
    if (activeView === 'amenities') return renderAmenities();
    if (activeView === 'requests') return renderRequests();
    if (activeView === 'kids') return renderKids();
    if (activeView === 'marketplace') return renderMarketplace();
    return renderGeneric();
  };

  if (showLogin) {
    return <div className="login-shell"><div className="login-visual"><div className="login-brand"><span className="brand-symbol"><Building2 size={21} /></span><strong>Willow Creek</strong></div><div><span className="eyebrow">Your community, in one place</span><h1>Come home<br /><em>to a little more ease.</em></h1><p>Visitors, payments, bookings, and the everyday details that make your home feel looked after.</p></div><div className="login-quote">“The best communities are built from small, thoughtful moments.”<small>— Willow Creek Estates</small></div></div><div className="login-card"><span className="eyebrow">Resident portal</span><h2>Welcome back</h2><p>Sign in to access your Willow Creek home.</p><label>Mobile number or email<input placeholder="akshar@example.com" /></label><button className="primary-button full-button" onClick={() => { setShowLogin(false); notify('Welcome back, Akshar', 'success'); }}>Continue with OTP <ArrowUpRight size={16} /></button><div className="login-divider"><span>or</span></div><button className="secondary-button full-button" onClick={() => { setShowLogin(false); notify('Password sign-in selected', 'info'); }}>Continue with password</button><small className="login-foot">Demo prototype · no real authentication</small></div></div>;
  }

  return (
    <div className="resident-web">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap');
        :root { --ink:#1f3436; --muted:#728184; --line:#dfe9e5; --paper:#f6faf8; --card:#fffefd; --teal:#19666a; --teal-dark:#114d50; --mint:#dbf0e8; --amber:#fff0c9; --lav:#e9e7f6; --peach:#f8e3db; --rose:#f7e3e8; --blue:#e0eef5; }
        * { box-sizing:border-box; }
        .resident-web { min-height:100vh; background:var(--paper); color:var(--ink); font-family:'DM Sans', sans-serif; display:flex; }
        button,input { font:inherit; } button { cursor:pointer; } h1,h2,h3,p { margin:0; } 
        .sidebar { width:252px; min-height:100vh; background:#edf5f1; border-right:1px solid var(--line); display:flex; flex-direction:column; padding:26px 16px 18px; flex-shrink:0; transition:transform .2s ease; z-index:20; }
        .brand { display:flex; align-items:center; gap:11px; padding:0 12px 28px; color:var(--teal-dark); }
        .brand-symbol { width:34px; height:34px; border-radius:11px 11px 11px 4px; background:var(--teal); color:#f6faf8; display:grid; place-items:center; }
        .brand strong { font-family:'Fraunces', serif; font-size:19px; letter-spacing:-.02em; } .brand small { display:block; color:#82908f; font-size:9px; letter-spacing:.13em; text-transform:uppercase; margin-top:2px; }
        .nav-label { color:#9aa8a5; font-size:10px; text-transform:uppercase; letter-spacing:.14em; font-weight:700; padding:0 13px 10px; }
        .nav-list { display:grid; gap:3px; } .nav-item { border:0; background:transparent; color:#728280; display:flex; align-items:center; gap:12px; width:100%; border-radius:11px; padding:11px 13px; text-align:left; font-size:13px; font-weight:600; transition:all .15s ease; }
        .nav-item:hover { background:#e2efea; color:var(--teal-dark); } .nav-item.active { background:#d6ece5; color:var(--teal-dark); box-shadow:inset 3px 0 var(--teal); } .nav-item .nav-badge { margin-left:auto; font-size:10px; background:#f2d9be; color:#9a5d34; border-radius:20px; padding:2px 6px; }
        .sidebar-bottom { margin-top:auto; border-top:1px solid var(--line); padding-top:16px; display:grid; gap:3px; } .sidebar-bottom button { color:#8a9895; }
        .app-main { min-width:0; flex:1; } .topbar { height:74px; border-bottom:1px solid var(--line); background:rgba(255,254,253,.78); backdrop-filter:blur(14px); display:flex; align-items:center; justify-content:space-between; padding:0 36px; position:sticky; top:0; z-index:10; }
        .topbar-left { display:flex; align-items:center; gap:14px; } .mobile-menu { display:none; border:0; background:transparent; color:var(--ink); } .breadcrumbs { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--muted); } .breadcrumbs strong { color:var(--ink); }
        .topbar-actions { display:flex; align-items:center; gap:10px; } .global-search { display:flex; align-items:center; gap:9px; width:240px; border:1px solid var(--line); background:#f7fbf9; border-radius:10px; padding:9px 12px; color:#94a09f; } .global-search input { border:0; outline:0; background:transparent; width:100%; color:var(--ink); font-size:12px; } .global-search input::placeholder { color:#9ba8a6; }
        .icon-button { width:35px; height:35px; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:#6e7f7c; border-radius:10px; } .icon-button:hover { color:var(--teal); border-color:#a9d4ca; background:#f3fbf7; } .notification-wrap,.profile-wrap { position:relative; } .notification-dot { position:absolute; top:7px; right:7px; width:6px; height:6px; border-radius:50%; background:#d97859; border:1px solid white; }
        .profile-trigger { display:flex; align-items:center; gap:9px; border:0; background:transparent; padding:3px 2px 3px 8px; color:var(--ink); } .profile-avatar,.initial-avatar { display:inline-grid; place-items:center; background:#d8e9e4; color:#1b6766; font-weight:700; border-radius:10px; } .profile-avatar { width:35px; height:35px; border-radius:12px; font-size:12px; } .profile-trigger span strong { display:block; font-size:12px; text-align:left; } .profile-trigger span small { display:block; font-size:10px; color:var(--muted); text-align:left; margin-top:1px; }
        .profile-menu { position:absolute; right:0; top:45px; background:white; border:1px solid var(--line); box-shadow:0 16px 34px rgba(23,54,49,.13); border-radius:12px; padding:8px; width:180px; } .profile-menu button { border:0; background:transparent; width:100%; padding:9px; text-align:left; color:var(--muted); font-size:12px; border-radius:7px; } .profile-menu button:hover { background:#f2f8f6; color:var(--ink); }
        .main-content { max-width:1400px; padding:34px 42px 56px; margin:0 auto; } .eyebrow { display:block; color:#83918f; text-transform:uppercase; letter-spacing:.13em; font-size:10px; font-weight:700; } .page-header { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:25px; } .page-header h1 { font-family:'Fraunces',serif; color:var(--ink); font-size:38px; letter-spacing:-.04em; margin-top:5px; } .page-header p { color:var(--muted); font-size:13px; margin-top:8px; } .page-header .primary-button,.page-header .secondary-button { flex-shrink:0; }
        .welcome-grid { display:grid; grid-template-columns:minmax(0,1.65fr) minmax(280px,.85fr); gap:18px; } .welcome-card { min-height:252px; position:relative; overflow:hidden; background:var(--teal-dark); color:#f5faf7; border-radius:20px; padding:30px 34px; isolation:isolate; } .welcome-card:after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 18%,rgba(137,207,189,.13) 100%); pointer-events:none; z-index:-1; } .welcome-content { position:relative; z-index:2; max-width:470px; } .welcome-kicker { color:#a7d2c3; font-size:11px; display:flex; align-items:center; gap:7px; font-weight:600; } .welcome-card h1 { font-family:'Fraunces',serif; font-size:45px; line-height:1; letter-spacing:-.045em; margin-top:16px; } .welcome-card h1 em { color:#f2cc8c; font-style:normal; } .welcome-card p { color:#c9dfd8; font-size:13px; line-height:1.5; margin-top:14px; max-width:380px; } .welcome-card p strong { color:#fff8e8; } .home-meta { display:flex; align-items:center; gap:10px; margin-top:23px; color:#a7c9bf; font-size:11px; } .home-meta span { display:flex; align-items:center; gap:6px; } .dot-separator { width:4px; height:4px; background:#78a99b; border-radius:50%; }
        .welcome-orb { position:absolute; border:1px solid rgba(194,231,214,.18); border-radius:50%; } .orb-one { width:300px; height:300px; right:50px; top:-110px; } .orb-two { width:410px; height:410px; right:-80px; top:-165px; } .welcome-illustration { position:absolute; right:25px; bottom:0; width:280px; height:220px; opacity:.95; } .sun-disc { width:72px; height:72px; border-radius:50%; background:#f0c983; position:absolute; right:50px; top:18px; box-shadow:0 0 0 14px rgba(240,201,131,.08); } .illustration-house { position:absolute; right:27px; bottom:29px; width:165px; height:106px; border-radius:10px 10px 2px 2px; background:#a7c9be; border:3px solid #d1e6dc; box-shadow:0 8px 0 #0e4547; } .illustration-house:before { content:''; position:absolute; left:-20px; top:-55px; border-left:104px solid transparent; border-right:104px solid transparent; border-bottom:65px solid #eabf7c; transform:scaleX(.8); } .illustration-house span { position:absolute; bottom:0; width:38px; height:43px; background:#235d5c; border-radius:18px 18px 0 0; } .illustration-house span:nth-child(1) { left:16px; } .illustration-house span:nth-child(2) { left:65px; width:32px; height:28px; background:#e9c88f; border-radius:3px; } .illustration-house span:nth-child(3) { right:15px; width:34px; height:34px; background:#e9c88f; border-radius:3px; } .illustration-tree { position:absolute; bottom:22px; width:15px; height:110px; background:#a16850; border-radius:10px; } .illustration-tree:after { content:''; position:absolute; width:90px; height:90px; background:#5d9a86; border-radius:50%; left:-38px; top:-49px; box-shadow:31px 20px 0 #4b8879,-22px 28px 0 #78ad8d; } .tree-left { left:34px; transform:scale(.75); } .tree-right { right:11px; transform:scale(.62); }
        .focus-card { border:1px solid var(--line); background:#fffefd; border-radius:20px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; min-height:252px; box-shadow:0 10px 24px rgba(33,71,65,.035); } .card-heading { display:flex; justify-content:space-between; align-items:flex-start; } .card-heading h3 { font-family:'Fraunces',serif; font-size:20px; letter-spacing:-.025em; margin-top:5px; } .card-heading > svg { color:#39827b; background:#e3f1eb; padding:8px; box-sizing:content-box; border-radius:11px; } .booking-date { display:flex; align-items:center; gap:10px; color:var(--teal-dark); margin-top:4px; } .booking-date strong { font-family:'Fraunces',serif; font-size:58px; line-height:.8; letter-spacing:-.06em; } .booking-date span { font-size:11px; line-height:1.15; letter-spacing:.12em; font-weight:700; } .booking-date small { color:#a2834d; font-size:9px; } .booking-info { display:flex; flex-direction:column; gap:4px; color:var(--muted); font-size:12px; } .booking-info span:first-child { color:var(--ink); font-weight:700; } .booking-actions { border-top:1px solid var(--line); padding-top:13px; display:flex; align-items:center; justify-content:space-between; }
        .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:13px; margin-top:18px; } .stat-card { border:1px solid var(--line); background:#fffefd; border-radius:15px; min-height:109px; padding:16px; display:flex; text-align:left; align-items:flex-start; gap:12px; position:relative; transition:transform .15s ease, box-shadow .15s ease; } .stat-card:hover { transform:translateY(-2px); box-shadow:0 10px 22px rgba(34,70,65,.07); } .stat-icon,.quick-icon { width:37px; height:37px; display:grid; place-items:center; border-radius:11px; color:var(--teal-dark); flex-shrink:0; } .stat-icon.mint,.quick-icon.mint,.invoice-icon.mint { background:var(--mint); } .stat-icon.amber,.quick-icon.amber,.invoice-icon.amber { background:var(--amber); color:#95662a; } .stat-icon.lavender,.quick-icon.lavender { background:var(--lav); color:#666292; } .stat-icon.peach,.quick-icon.peach { background:var(--peach); color:#a45f47; } .stat-icon.blue,.quick-icon.blue { background:var(--blue); color:#4a7b98; } .stat-icon.rose,.quick-icon.rose { background:var(--rose); color:#a76676; } .quick-icon.gold { background:#f8eac4; color:#9a7134; } .stat-copy { display:flex; flex-direction:column; gap:3px; min-width:0; } .stat-copy strong { font-size:17px; letter-spacing:-.02em; } .stat-meta { font-size:10px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; } .stat-arrow { position:absolute; top:16px; right:14px; color:#a6b3b0; }
        .section-block { margin-top:33px; } .section-heading,.panel-header { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; } .section-heading h2,.panel-header h2 { font-family:'Fraunces',serif; letter-spacing:-.035em; font-size:24px; margin-top:5px; } .section-count { color:#92a09d; font-size:11px; padding-top:12px; } .quick-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:9px; margin-top:16px; } .quick-action { min-height:103px; border:1px solid var(--line); background:#fffefd; border-radius:13px; padding:13px 10px; text-align:left; display:flex; flex-direction:column; gap:11px; position:relative; transition:all .15s; } .quick-action:hover { border-color:#abd4c8; transform:translateY(-2px); box-shadow:0 8px 18px rgba(34,70,65,.06); } .quick-action > span:nth-child(2) { display:flex; flex-direction:column; gap:3px; } .quick-action strong { font-size:11px; color:var(--ink); } .quick-action small { color:#97a4a2; font-size:9px; } .quick-chevron { position:absolute; right:9px; top:15px; color:#acb9b5; }
        .content-grid,.lower-grid { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(320px,.8fr); gap:18px; margin-top:28px; } .lower-grid { grid-template-columns:1fr 1fr; margin-top:18px; } .panel { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:23px; box-shadow:0 8px 20px rgba(34,70,65,.025); } .panel-header h2 { font-size:20px; } .panel-header > .icon-button { margin-top:2px; } .link-button,.text-button { background:transparent; border:0; color:var(--teal); font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:4px; padding:3px 0; } .link-button:hover,.text-button:hover { color:var(--teal-dark); } .visitor-table { margin-top:20px; } .table-row { display:grid; grid-template-columns:1.5fr .8fr .75fr .9fr 30px; align-items:center; gap:12px; min-height:64px; border-bottom:1px solid #edf2ef; font-size:11px; } .table-row:last-child { border-bottom:0; } .table-head { min-height:30px; color:#9aa6a4; font-size:9px; text-transform:uppercase; letter-spacing:.11em; font-weight:700; } .person-cell { display:flex; align-items:center; gap:10px; min-width:0; } .initial-avatar { width:32px; height:32px; font-size:10px; } .initial-avatar.mint { background:var(--mint); color:#317369; } .initial-avatar.lavender { background:var(--lav); color:#6d6799; } .initial-avatar.peach { background:var(--peach); color:#a8654b; } .person-cell span:last-child { min-width:0; } .person-cell strong,.person-cell small { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } .person-cell strong { color:var(--ink); font-size:11px; } .person-cell small,.muted-cell { color:#91a09e; font-size:10px; margin-top:3px; } .row-more { border:0; background:transparent; color:#a9b5b2; padding:4px; } .row-more:hover { color:var(--teal); } .status-pill { border-radius:20px; padding:5px 9px; display:inline-flex; align-items:center; justify-content:center; font-size:10px; line-height:1; font-weight:700; white-space:nowrap; width:max-content; } .status-success { color:#35745e; background:#e1f1e8; } .status-pending { color:#a26e29; background:#fff1d3; } .status-info { color:#427995; background:#e2f0f7; } .status-danger { color:#a54e54; background:#fae2e5; } .status-neutral { color:#697c7a; background:#eef3f1; } .panel-footer { border-top:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:14px; margin-top:12px; color:#8b9b98; font-size:10px; } .panel-footer span { display:flex; align-items:center; gap:6px; }
        .update-list { margin-top:17px; } .update-item { width:100%; display:flex; align-items:center; gap:11px; border:0; border-bottom:1px solid #edf2ef; background:transparent; text-align:left; padding:13px 0; color:var(--ink); } .update-item:last-child { border-bottom:0; } .update-item:hover strong { color:var(--teal); } .update-item > span:nth-child(2) { display:flex; flex-direction:column; gap:4px; flex:1; min-width:0; } .update-item strong { font-size:11px; font-weight:700; } .update-item small { color:#94a19f; font-size:10px; } .update-item > svg { color:#b4c0bd; } .update-mark { width:31px; height:31px; display:grid; place-items:center; border-radius:9px; flex-shrink:0; } .update-mark.teal { background:var(--mint); color:#39786d; } .update-mark.amber { background:var(--amber); color:#a26d2a; } .update-mark.rose { background:var(--rose); color:#a56676; } .soft-note { background:#f3f8f5; border-radius:10px; padding:12px; display:flex; align-items:center; gap:9px; color:#6b9082; font-size:10px; margin-top:13px; }
        .payment-main { display:flex; align-items:center; gap:11px; border-bottom:1px solid var(--line); padding:22px 0 16px; } .payment-symbol,.request-icon { width:39px; height:39px; display:grid; place-items:center; background:var(--amber); border-radius:11px; color:#a46c2d; flex-shrink:0; } .payment-main > div:nth-child(2),.request-title > div { flex:1; min-width:0; } .payment-main strong,.payment-main small,.request-title strong,.request-title small { display:block; } .payment-main strong,.request-title strong { font-size:12px; } .payment-main small,.request-title small { color:#99a7a4; font-size:10px; margin-top:4px; } .amount { font-size:19px !important; } .payment-details { display:flex; justify-content:space-between; color:#8b9b98; font-size:10px; padding:13px 0; } .primary-button,.secondary-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; border-radius:9px; padding:10px 14px; font-size:12px; font-weight:700; border:1px solid transparent; transition:all .15s; } .primary-button { background:var(--teal); color:white; border-color:var(--teal); } .primary-button:hover { background:var(--teal-dark); } .secondary-button { color:var(--teal); background:#f4faf7; border-color:#cfe4dd; } .secondary-button:hover { background:#e8f5ef; border-color:#a9d4c8; } .small { padding:8px 10px; font-size:10px; } .full-button { width:100%; } .booking-actions .text-button { padding:0; } .request-title { display:flex; align-items:center; gap:11px; margin-top:20px; } .request-icon { background:var(--peach); color:#a56048; } .timeline { padding-top:18px; position:relative; display:grid; gap:13px; } .timeline-line { position:absolute; left:14px; top:30px; bottom:30px; border-left:1px dashed #cbdcd6; } .timeline-step { display:flex; align-items:flex-start; gap:10px; position:relative; } .timeline-step > span { width:29px; height:29px; display:grid; place-items:center; border-radius:50%; background:#f0f4f2; color:#a2afac; z-index:1; } .timeline-step.done > span { background:var(--mint); color:#38806e; } .timeline-step.current > span { background:var(--blue); color:#4b7c94; } .timeline-step strong,.timeline-step small { display:block; } .timeline-step strong { font-size:10px; margin-top:3px; } .timeline-step small { color:#9aa8a5; font-size:9px; margin-top:3px; }
        .page-tabs,.filter-tabs,.market-categories { display:flex; align-items:center; gap:5px; margin-bottom:19px; border-bottom:1px solid var(--line); } .page-tabs button,.filter-tabs button,.market-categories button { background:transparent; border:0; color:#8d9a98; font-size:11px; padding:11px 13px; border-bottom:2px solid transparent; } .page-tabs button span,.filter-tabs button span { margin-left:5px; background:#eef3f1; padding:2px 5px; border-radius:10px; font-size:9px; } .page-tabs button.active,.filter-tabs button.active,.market-categories button.active { color:var(--teal); border-color:var(--teal); font-weight:700; } .compact { border:0; margin:0; } .wide-panel { min-height:300px; } .toolbar { display:flex; justify-content:space-between; gap:12px; margin-bottom:10px; } .toolbar-search { border:1px solid var(--line); display:flex; align-items:center; gap:8px; color:#97a5a2; padding:8px 11px; border-radius:9px; width:240px; } .toolbar-search input { border:0; outline:0; width:100%; background:transparent; font-size:11px; color:var(--ink); } .spacious .table-row { grid-template-columns:1.4fr .75fr 1fr 1fr .8fr 30px; min-height:68px; } .empty-state { display:grid; place-items:center; text-align:center; padding:43px 20px; color:var(--muted); } .empty-icon { width:48px; height:48px; border-radius:15px; background:var(--mint); color:#4b897c; display:grid; place-items:center; margin-bottom:13px; } .empty-state h3 { font-family:'Fraunces',serif; color:var(--ink); font-size:20px; } .empty-state p { font-size:12px; margin:6px 0 16px; }
        .finance-grid { display:grid; grid-template-columns:1.35fr repeat(3,1fr); gap:13px; margin-bottom:18px; } .finance-card { min-height:130px; border:1px solid var(--line); border-radius:15px; background:#fffefd; padding:19px; position:relative; } .finance-card.main { background:var(--teal-dark); color:#effaf5; border-color:var(--teal-dark); } .finance-card .eyebrow { color:#93a8a2; } .finance-card.main .eyebrow { color:#9fcac0; } .finance-card strong { display:block; font-family:'Fraunces',serif; font-size:27px; margin-top:12px; letter-spacing:-.04em; } .finance-card small { color:#94a39f; font-size:10px; display:block; margin-top:4px; } .finance-card.main small { color:#b4d4ca; } .finance-card > svg { position:absolute; right:17px; bottom:18px; color:#bad9ce; opacity:.8; } .finance-card:not(.main) > svg { color:#6d9a8b; right:17px; top:18px; }
        .invoice-list { margin-top:22px; } .invoice-row { display:grid; grid-template-columns:1.5fr 1fr .8fr 1fr .8fr .7fr; align-items:center; gap:13px; min-height:67px; border-bottom:1px solid #edf2ef; color:#80908d; font-size:11px; } .invoice-row:last-child { border-bottom:0; } .invoice-head { min-height:33px; color:#9aa6a4; font-size:9px; text-transform:uppercase; letter-spacing:.1em; font-weight:700; } .invoice-name { display:flex; align-items:center; gap:10px; } .invoice-name strong,.invoice-name small { display:block; } .invoice-name strong { color:var(--ink); } .invoice-name small { color:#98a6a3; font-size:9px; margin-top:3px; } .invoice-icon { width:31px; height:31px; display:grid; place-items:center; border-radius:9px; color:#a86f32; } .history-list { margin-top:15px; } .history-row { display:flex; align-items:center; gap:11px; border-bottom:1px solid #edf2ef; padding:15px 0; } .history-row > div { flex:1; } .history-row strong,.history-row small { display:block; } .history-row strong { font-size:12px; } .history-row small { color:#95a29f; font-size:10px; margin-top:3px; }
        .amenity-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:15px; } .amenity-card,.vendor-card { border:1px solid var(--line); border-radius:16px; background:#fffefd; padding:0; text-align:left; overflow:hidden; color:var(--ink); transition:transform .15s, box-shadow .15s; } .amenity-card:hover,.vendor-card:hover { transform:translateY(-3px); box-shadow:0 12px 23px rgba(34,70,65,.08); } .amenity-visual { height:142px; display:grid; place-items:center; position:relative; color:#527c75; } .amenity-visual.lavender,.vendor-visual.rose { background:#eae8f7; color:#6c6799; } .amenity-visual.mint,.vendor-visual.mint { background:#dcefe9; color:#387c70; } .amenity-visual.peach { background:#f7e2d9; color:#a45e47; } .amenity-visual.amber { background:#fff0cc; color:#a37232; } .availability-dot { position:absolute; width:8px; height:8px; border-radius:50%; background:#62ae8b; right:16px; top:16px; box-shadow:0 0 0 4px rgba(98,174,139,.16); } .amenity-copy { padding:15px; } .amenity-copy h3,.vendor-card h3 { font-family:'Fraunces',serif; font-size:20px; margin-top:4px; letter-spacing:-.025em; } .amenity-copy p,.vendor-card p { font-size:10px; color:#92a09d; margin-top:7px; } .amenity-copy > div { display:flex; align-items:center; justify-content:space-between; color:var(--teal); font-size:11px; margin-top:17px; }
        .filter-tabs { margin-top:5px; } .request-list { display:grid; gap:10px; } .request-card { display:flex; align-items:center; gap:13px; border:1px solid var(--line); border-radius:13px; padding:16px; background:#fffefd; text-align:left; color:var(--ink); } .request-card:hover { border-color:#b4d9cf; } .request-body { flex:1; display:flex; flex-direction:column; gap:5px; } .request-body strong { font-size:13px; } .request-body small { color:#95a29f; font-size:10px; } .request-card > svg { color:#aab8b4; }
        .notice-banner { display:flex; align-items:center; gap:10px; padding:13px 15px; border:1px solid #d6e8e0; background:#eef8f3; color:#457c70; border-radius:11px; font-size:11px; margin-bottom:18px; } .kids-grid { display:grid; grid-template-columns:1.4fr .8fr; gap:18px; } .kid-card { border:1px solid var(--line); background:#fffefd; border-radius:16px; padding:21px; } .kid-top { display:flex; align-items:center; gap:11px; } .child-avatar { width:42px; height:42px; border-radius:14px; background:#dce9f0; color:#4b7694; display:grid; place-items:center; font-size:12px; font-weight:700; } .kid-top > div { flex:1; } .kid-top h3 { font-family:'Fraunces',serif; font-size:20px; } .kid-top span:not(.child-avatar):not(.status-pill) { font-size:10px; color:#94a29f; display:block; margin-top:3px; } .zone-map { height:208px; background:#e6f0e8; border-radius:13px; margin:20px 0 15px; position:relative; overflow:hidden; background-image:linear-gradient(35deg,transparent 49%,rgba(255,255,255,.8) 50%,transparent 52%),linear-gradient(125deg,transparent 49%,rgba(255,255,255,.8) 50%,transparent 52%); } .map-label { position:absolute; top:16px; left:18px; color:#759385; font-size:10px; text-transform:uppercase; letter-spacing:.1em; } .map-road { position:absolute; border-top:10px solid rgba(255,255,255,.85); width:145%; transform:rotate(-16deg); } .road-one { top:87px; left:-20px; } .road-two { top:140px; left:-25px; transform:rotate(21deg); } .map-zone { position:absolute; border:1px dashed #86af9a; background:rgba(213,235,222,.8); color:#5d8870; font-size:10px; padding:8px 10px; border-radius:8px; } .zone-a { left:30px; top:64px; } .zone-b { right:35px; bottom:25px; } .map-pin { position:absolute; left:46%; top:44%; width:37px; height:37px; border-radius:50%; background:#1d716f; color:white; display:grid; place-items:center; box-shadow:0 0 0 7px rgba(29,113,111,.15); } .kid-meta { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; padding-bottom:17px; border-bottom:1px solid var(--line); } .kid-meta span { font-size:10px; color:#94a29f; } .kid-meta strong { display:block; color:var(--ink); font-size:10px; margin-bottom:4px; } .pickup-panel .panel-header { margin-bottom:12px; } .pickup-row { display:flex; align-items:center; gap:10px; padding:13px 0; border-bottom:1px solid #edf2ef; } .pickup-row span:nth-child(2) { flex:1; } .pickup-row strong,.pickup-row small { display:block; } .pickup-row strong { font-size:11px; } .pickup-row small { font-size:10px; color:#99a5a2; margin-top:3px; } .check-icon { color:#4b967f; }
        .market-categories { gap:2px; margin-top:3px; } .vendor-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; } .vendor-card { padding:0 0 15px; display:flex; flex-direction:column; } .vendor-visual { height:132px; display:grid; place-items:center; position:relative; color:#4b8b7b; } .vendor-visual.blue { background:#e0eff5; color:#4b7b98; } .vendor-rating { position:absolute; bottom:11px; left:12px; background:rgba(255,255,255,.82); color:#806638; font-size:10px; padding:5px 7px; border-radius:10px; } .vendor-card > div:last-of-type { padding:15px 15px 0; } .vendor-card h3 { font-size:19px; } .vendor-card p { color:#4b8677; } .vendor-card > svg { position:absolute; } .vendor-card { position:relative; } .vendor-card > svg { right:15px; bottom:17px; color:#a8b6b2; } .subscription-strip { margin-top:20px; border:1px solid #d9e6df; background:#f1f8f3; border-radius:14px; padding:18px 20px; display:flex; align-items:center; gap:14px; } .subscription-mark { width:42px; height:42px; border-radius:13px; background:#d5eee3; color:#367b6e; display:grid; place-items:center; } .subscription-strip > div:nth-child(2) { flex:1; } .subscription-strip h3 { font-family:'Fraunces',serif; font-size:19px; margin-top:3px; } .subscription-strip p { color:#83948f; font-size:11px; margin-top:3px; }
        .generic-panel { min-height:360px; display:grid; place-items:center; align-content:center; text-align:center; } .generic-icon { width:64px; height:64px; border-radius:19px; background:var(--mint); color:#408375; display:grid; place-items:center; margin-bottom:16px; } .generic-panel h2 { font-family:'Fraunces',serif; font-size:25px; } .generic-panel p { color:var(--muted); font-size:12px; max-width:370px; line-height:1.6; margin:9px 0 20px; }
        .modal-backdrop { position:fixed; inset:0; z-index:50; background:rgba(15,44,43,.36); display:grid; place-items:center; padding:20px; } .modal { width:min(500px,100%); background:#fffefd; border-radius:18px; box-shadow:0 22px 70px rgba(20,50,48,.25); padding:26px; } .modal-header { display:flex; justify-content:space-between; gap:15px; } .modal-header h2 { font-family:'Fraunces',serif; font-size:26px; letter-spacing:-.035em; margin-top:5px; } .modal-header p { color:var(--muted); font-size:11px; margin-top:6px; } .modal-form { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:22px; } .modal-form label { color:#6f807d; font-size:10px; font-weight:700; display:grid; gap:6px; } .modal-form label:first-child { grid-column:1/-1; } .modal-form input,.modal-form select { border:1px solid var(--line); border-radius:9px; padding:10px 11px; outline:0; color:var(--ink); background:#fbfdfc; font-size:12px; font-weight:400; } .modal-form input:focus,.modal-form select:focus { border-color:#8fc7b8; box-shadow:0 0 0 3px #e4f3ed; } .modal-footer { display:flex; justify-content:flex-end; gap:9px; margin-top:22px; } .sos-modal { text-align:center; } .sos-symbol { width:58px; height:58px; border-radius:50%; margin:0 auto 15px; display:grid; place-items:center; background:#fae2e5; color:#b84f59; } .sos-modal h2 { font-family:'Fraunces',serif; font-size:25px; } .sos-modal p { color:var(--muted); font-size:12px; line-height:1.6; margin:8px auto 20px; max-width:320px; } .danger-button { background:#b95159; color:white; border:0; border-radius:9px; padding:10px 15px; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:7px; } .danger-button:hover { background:#9e424a; }
        .sos-fab { position:fixed; right:29px; bottom:26px; z-index:12; border:0; border-radius:24px; background:#b95159; color:white; box-shadow:0 8px 20px rgba(185,81,89,.25); display:flex; align-items:center; gap:8px; padding:11px 15px; font-size:11px; font-weight:700; } .sos-fab:hover { background:#9e424a; transform:translateY(-2px); }
        .toast { position:fixed; right:28px; top:88px; z-index:60; background:#fffefd; border:1px solid var(--line); box-shadow:0 14px 30px rgba(30,63,59,.14); border-radius:11px; display:flex; align-items:center; gap:10px; padding:12px 15px; font-size:11px; color:var(--ink); animation:toast-in .22s ease; } .toast svg { color:#4a967f; } .toast.info svg { color:#4a7f9a; } .toast.danger svg { color:#b95159; } @keyframes toast-in { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .login-shell { min-height:100vh; background:#f1f7f4; display:grid; grid-template-columns:1fr 520px; color:var(--ink); } .login-visual { background:var(--teal-dark); color:#edf9f3; padding:55px 70px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; } .login-visual:after { content:''; position:absolute; width:620px; height:620px; border:1px solid rgba(184,224,208,.2); border-radius:50%; right:-220px; bottom:-260px; box-shadow:0 0 0 80px rgba(184,224,208,.04),0 0 0 160px rgba(184,224,208,.03); } .login-visual > div { position:relative; z-index:1; } .login-brand { display:flex; align-items:center; gap:10px; font-family:'Fraunces',serif; font-size:19px; } .login-visual h1 { font-family:'Fraunces',serif; font-size:67px; line-height:.96; letter-spacing:-.055em; margin-top:17px; } .login-visual h1 em { font-style:normal; color:#f0c886; } .login-visual > div:nth-child(2) p { max-width:390px; color:#b8d6cc; line-height:1.6; font-size:14px; margin-top:18px; } .login-quote { color:#b7d5ca; font-family:'Fraunces',serif; font-size:18px; max-width:390px; line-height:1.35; } .login-quote small { display:block; font-family:'DM Sans',sans-serif; font-size:10px; color:#7eaea0; margin-top:10px; } .login-card { align-self:center; justify-self:center; width:min(340px,calc(100% - 50px)); } .login-card h2 { font-family:'Fraunces',serif; font-size:35px; letter-spacing:-.04em; margin-top:6px; } .login-card > p { color:var(--muted); font-size:12px; margin:8px 0 27px; } .login-card label { display:grid; gap:7px; color:#657572; font-size:10px; font-weight:700; } .login-card input { padding:12px; border:1px solid var(--line); border-radius:9px; outline:0; margin-bottom:13px; font-size:12px; } .login-card input:focus { border-color:#8fc7b8; box-shadow:0 0 0 3px #e4f3ed; } .login-divider { position:relative; text-align:center; margin:20px 0; border-top:1px solid var(--line); } .login-divider span { position:relative; top:-8px; padding:0 10px; background:#f1f7f4; color:#a0aaa7; font-size:10px; } .login-foot { display:block; text-align:center; color:#a0adaa; font-size:10px; margin-top:25px; }
        @media (max-width:1180px) { .sidebar { width:224px; } .main-content { padding:30px 27px 50px; } .quick-grid { grid-template-columns:repeat(4,1fr); } .welcome-illustration { right:-25px; opacity:.55; } .stat-grid { grid-template-columns:repeat(2,1fr); } .amenity-grid { grid-template-columns:repeat(2,1fr); } .vendor-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:800px) { .sidebar { position:fixed; left:0; top:0; transform:translateX(-105%); box-shadow:14px 0 30px rgba(21,50,48,.12); } .sidebar.open { transform:translateX(0); } .mobile-menu { display:grid; place-items:center; } .topbar { padding:0 18px; } .global-search { width:180px; } .topbar .profile-trigger span { display:none; } .main-content { padding:24px 18px 46px; } .welcome-grid,.content-grid,.lower-grid,.kids-grid { grid-template-columns:1fr; } .welcome-card { min-height:285px; } .welcome-illustration { opacity:.45; right:-15px; } .quick-grid { grid-template-columns:repeat(2,1fr); } .stat-grid { grid-template-columns:repeat(2,1fr); } .invoice-row { grid-template-columns:1.4fr 1fr .8fr; gap:8px; padding:10px 0; } .invoice-row > span:nth-child(2),.invoice-row > span:nth-child(4),.invoice-row > span:nth-child(5) { display:none; } .invoice-head { display:none; } .spacious .table-row { grid-template-columns:1.4fr .8fr 30px; } .spacious .table-row > span:nth-child(2),.spacious .table-row > span:nth-child(3),.spacious .table-row > span:nth-child(4),.spacious .table-row > span:nth-child(5) { display:none; } .login-shell { grid-template-columns:1fr; } .login-visual { min-height:260px; padding:28px; } .login-visual h1 { font-size:42px; } .login-quote { display:none; } .login-card { padding:38px 0; } }
        @media (max-width:520px) { .topbar { height:66px; } .breadcrumbs { display:none; } .global-search { width:calc(100vw - 170px); max-width:190px; } .profile-avatar { width:32px; height:32px; } .main-content { padding:21px 13px 40px; } .page-header { align-items:flex-start; flex-direction:column; gap:15px; } .page-header h1 { font-size:31px; } .page-header .primary-button,.page-header .secondary-button { width:100%; } .stat-grid { gap:9px; } .stat-card { padding:12px 10px; gap:8px; } .stat-copy strong { font-size:14px; } .stat-meta { white-space:normal; line-height:1.2; } .stat-arrow { display:none; } .welcome-card { padding:25px 22px; } .welcome-card h1 { font-size:39px; } .welcome-illustration { right:-60px; bottom:-3px; transform:scale(.8); transform-origin:bottom right; } .focus-card { min-height:215px; } .quick-grid { gap:8px; } .quick-action { min-height:92px; padding:10px 8px; } .quick-action strong { font-size:10px; } .quick-action small { font-size:8px; } .panel { padding:17px 14px; } .table-row { grid-template-columns:1.6fr .8fr 30px; gap:8px; } .table-row > span:nth-child(2),.table-row > span:nth-child(3),.table-row > .status-pill { display:none; } .panel-footer { align-items:flex-start; flex-direction:column; } .amenity-grid,.vendor-grid { grid-template-columns:1fr; } .finance-grid { grid-template-columns:1fr 1fr; } .finance-card.main { grid-column:1/-1; } .finance-card { min-height:115px; padding:14px; } .finance-card strong { font-size:23px; } .sos-fab { right:14px; bottom:15px; } .modal-form { grid-template-columns:1fr; } .modal-form label:first-child { grid-column:auto; } .toast { left:14px; right:14px; top:77px; } }
      `}</style>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand"><span className="brand-symbol"><Building2 size={19} /></span><div><strong>Willow Creek</strong><small>Resident portal</small></div></div>
        <span className="nav-label">Your home</span>
        <nav className="nav-list">{NAV_ITEMS.map((item) => <button key={item.id} className={`nav-item ${activeView === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}><item.icon size={17} strokeWidth={activeView === item.id ? 2.2 : 1.8} />{item.label}{item.id === 'notifications' && <span className="nav-badge">3</span>}</button>)}</nav>
        <div className="sidebar-bottom"><button className="nav-item" onClick={() => notify('Help center opened', 'info')}><HelpCircle size={17} />Help & support</button><button className="nav-item" onClick={() => setShowLogin(true)}><LogOut size={17} />Log out</button></div>
      </aside>

      <main className="app-main">
        <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen((open) => !open)}><Menu size={21} /></button><div className="breadcrumbs"><span>Willow Creek Estates</span><ChevronRight size={14} /><strong>{activeLabel}</strong></div></div><div className="topbar-actions"><label className="global-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your community" /></label><div className="notification-wrap"><button className="icon-button" aria-label="Notifications" onClick={() => navigate('notifications')}><Bell size={17} /></button><span className="notification-dot" /></div><button className="icon-button help-button" aria-label="Help" onClick={() => notify('Help center opened', 'info')}><HelpCircle size={17} /></button><div className="profile-wrap"><button className="profile-trigger" onClick={() => setShowProfileMenu((open) => !open)}><span className="profile-avatar">AK</span><span><strong>Akshar Kapoor</strong><small>A-1204 · Tower A</small></span><ChevronDown size={14} /></button>{showProfileMenu && <div className="profile-menu"><button onClick={() => { navigate('profile'); setShowProfileMenu(false); }}>View profile</button><button onClick={() => notify('Preferences opened', 'info')}>Preferences</button><button onClick={() => setShowLogin(true)}>Log out</button></div>}</div></div></header>
        <div className="main-content">{renderView()}</div>
      </main>

      <button className="sos-fab" onClick={() => setShowSosModal(true)}><Siren size={16} /> SOS / Emergency</button>

      {showVisitorModal && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowVisitorModal(false)}><div className="modal"><div className="modal-header"><div><span className="eyebrow">Make their arrival easy</span><h2>Invite a visitor</h2><p>Generate a digital pass for the gate.</p></div><button className="icon-button" aria-label="Close" onClick={() => setShowVisitorModal(false)}><X size={17} /></button></div><div className="modal-form"><label>Visitor name<input placeholder="e.g. Rahul Sharma" /></label><label>Phone number<input placeholder="+91 98765 43210" /></label><label>Arrival date<input type="date" defaultValue="2026-09-08" /></label><label>Arrival time<input type="time" defaultValue="10:30" /></label><label>Purpose<select defaultValue="Guest"><option>Guest</option><option>Delivery</option><option>Cab</option><option>Service worker</option></select></label><label>Vehicle number<input placeholder="Optional" /></label></div><div className="modal-footer"><button className="secondary-button" onClick={() => setShowVisitorModal(false)}>Cancel</button><button className="primary-button" onClick={() => { setShowVisitorModal(false); notify('Visitor pass generated successfully', 'success'); navigate('visitors'); }}><Send size={15} /> Generate pass</button></div></div></div>}
      {showSosModal && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowSosModal(false)}><div className="modal sos-modal"><div className="sos-symbol"><Siren size={27} /></div><h2>Send an emergency alert?</h2><p>This will notify community security and your emergency contacts that you need immediate assistance.</p><div className="modal-footer"><button className="secondary-button" onClick={() => setShowSosModal(false)}>Cancel</button><button className="danger-button" onClick={() => { setShowSosModal(false); notify('Emergency alert sent to community security', 'danger'); }}><Siren size={15} /> Send SOS</button></div></div></div>}
      {toast && <div className={`toast ${toast.tone}`}><CheckCircle2 size={17} /><span>{toast.message}</span></div>}
    </div>
  );
}