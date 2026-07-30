"use client";

import React, { useMemo, useState } from "react";

// ── SVG icon components ──────────────────────────────────────────────────────
const IcoBell = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IcoHerd = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="7" r="4"/><path d="M2 21v-2a6 6 0 0 1 6-6h1"/><circle cx="17" cy="11" r="3"/><path d="M14 21v-1a4 4 0 0 1 6 0v1"/></svg>;
const IcoHeart = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IcoAlert = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/></svg>;
const IcoWifiOff = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3"/></svg>;
const IcoCow = ({size=18}: {size?:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="14" rx="7" ry="5"/><path d="M5 12 C3 9 3 5 5 4 C7 3 8 6 8 8"/><path d="M19 12 C21 9 21 5 19 4 C17 3 16 6 16 8"/><circle cx="9.5" cy="13.5" r="0.7" fill="currentColor"/><circle cx="14.5" cy="13.5" r="0.7" fill="currentColor"/><path d="M10 16.5 q2 1.5 4 0" fill="none"/></svg>;
const IcoThermo = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>;
const IcoActivity = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IcoHeartSm = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IcoCriticalAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d3544a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/></svg>;
const IcoSickAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e07a3f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/><path d="M16 8h3"/><path d="M16 11h3"/></svg>;
const IcoWarningAlert = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d69e2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/></svg>;
const IcoCheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a9c62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;

type Status = "Normal" | "Check soon" | "Sick" | "Critical" | "Offline";
type NavPage = "dashboard" | "animals" | "history" | "settings" | "help";

const defaultAnimals = [
  { id: "C-024", name: "Daisy", kind: "Dairy cow", status: "Critical" as Status, temp: "40.1°C", heart: "98 bpm", activity: "32%", time: "2 min ago", note: "High temperature + low activity" },
  { id: "C-011", name: "Milo", kind: "Dairy cow", status: "Check soon" as Status, temp: "39.3°C", heart: "84 bpm", activity: "61%", time: "16 min ago", note: "Activity below usual" },
  { id: "C-037", name: "Clover", kind: "Dairy cow", status: "Sick" as Status, temp: "39.8°C", heart: "92 bpm", activity: "47%", time: "8 min ago", note: "Temperature rising" },
  { id: "C-018", name: "Biscuit", kind: "Dairy cow", status: "Normal" as Status, temp: "38.6°C", heart: "72 bpm", activity: "87%", time: "12 min ago", note: "All readings normal" },
  { id: "C-042", name: "Maple", kind: "Dairy cow", status: "Offline" as Status, temp: "—", heart: "—", activity: "—", time: "1 hr ago", note: "Band connection lost" },
];

const styles: Record<Status, string> = {
  Normal: "normal", "Check soon": "check", Sick: "sick", Critical: "critical", Offline: "offline",
};

// ── Health History data ──────────────────────────────────────────────────────
const historyEntries = [
  { date: "Jul 29, 2026", animal: "Daisy", id: "C-024", event: "Temperature spiked to 40.1°C", status: "Critical" as Status },
  { date: "Jul 28, 2026", animal: "Clover", id: "C-037", event: "Temperature rising — flagged Sick", status: "Sick" as Status },
  { date: "Jul 27, 2026", animal: "Milo", id: "C-011", event: "Reduced activity detected", status: "Check soon" as Status },
  { date: "Jul 26, 2026", animal: "Maple", id: "C-042", event: "Band went offline", status: "Offline" as Status },
  { date: "Jul 25, 2026", animal: "Biscuit", id: "C-018", event: "All readings returned to normal", status: "Normal" as Status },
  { date: "Jul 24, 2026", animal: "Daisy", id: "C-024", event: "Heart rate elevated — 94 bpm", status: "Sick" as Status },
];

// ── Band Settings data ───────────────────────────────────────────────────────
const bandList = [
  { id: "C-024", name: "Daisy", battery: 34, signal: "Weak", interval: "30 min" },
  { id: "C-011", name: "Milo", battery: 81, signal: "Strong", interval: "60 min" },
  { id: "C-037", name: "Clover", battery: 57, signal: "Good", interval: "60 min" },
  { id: "C-018", name: "Biscuit", battery: 92, signal: "Strong", interval: "60 min" },
  { id: "C-042", name: "Maple", battery: 0, signal: "None", interval: "—" },
];

export default function Home() {
  const [animals, setAnimals] = useState(defaultAnimals);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [selected, setSelected] = useState(defaultAnimals[0]);
  const [notice, setNotice] = useState("Live monitoring is active");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [showDetail, setShowDetail] = useState(true);
  const [activePage, setActivePage] = useState<NavPage>("dashboard");
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [newAnimalKind, setNewAnimalKind] = useState("Dairy cow");
  const [newBandId, setNewBandId] = useState("");

  const list = useMemo(
    () => filter === "All" ? animals : animals.filter((a) => a.status === filter),
    [filter, animals]
  );
  const totalCount = animals.length;
  const healthyCount = animals.filter((a) => a.status === "Normal").length;
  const needsCheckCount = animals.filter((a) => ["Critical", "Sick", "Check soon"].includes(a.status)).length;
  const offlineCount = animals.filter((a) => a.status === "Offline").length;
  const alertCount = animals.filter((a) => ["Critical", "Sick"].includes(a.status)).length;

  const handleMarkChecked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds(prev => new Set(prev).add(selected.id));
    setNotice(`✓ ${selected.name} marked for an in-person check`);
  };

  const handleDeleteAnimal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = animals.filter(a => a.id !== selected.id);
    setAnimals(remaining);
    setCheckedIds(prev => { const next = new Set(prev); next.delete(selected.id); return next; });
    if (remaining.length > 0) {
      setSelected(remaining[0]);
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
    setNotice("Live monitoring is active");
  };

  // ── Nav helper ───────────────────────────────────────────────────────────
  const navTo = (page: NavPage) => {
    setActivePage(page);
    setShowNotifPanel(false);
    setShowProfileMenu(false);
  };

  // ── Shared header ────────────────────────────────────────────────────────
  const pageHeader = (
    <header>
      <div>
        <p className="eyebrow">GREEN VALLEY FARM</p>
        <h1>Good morning, Jamie <span>☀</span></h1>
        <p className="subtitle">Here is your herd health overview for today.</p>
      </div>
      <div className="header-actions" style={{ position: "relative" }}>
        <button
          className="icon-btn"
          aria-label="Notifications"
          onClick={(e) => { e.stopPropagation(); setShowNotifPanel(!showNotifPanel); setShowProfileMenu(false); }}
          style={{
            fontSize: 22,
            color: showNotifPanel ? "#347a4f" : "#577364",
            background: showNotifPanel ? "#e8f5e0" : "transparent",
            borderRadius: 10,
            padding: "6px 8px",
            transition: "background 0.15s",
          }}
        >
          <IcoBell /><i>{alertCount}</i>
        </button>
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); setShowAddModal(true); }}>＋ Add animal</button>

        {showNotifPanel && (
          <div className="notif-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px 8px" }}>
              <p className="notif-title" style={{ padding: 0, display:"flex", alignItems:"center", gap:6 }}><IcoBell /> Health Alerts</p>
              <button style={{ border: 0, background: "transparent", fontSize: 11, color: "var(--muted)", cursor: "pointer", fontWeight: 600 }} onClick={() => setShowNotifPanel(false)}>Close ×</button>
            </div>
            {animals.filter(a => ["Critical", "Sick", "Check soon"].includes(a.status)).length === 0 ? (
              <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--muted)", fontSize: 12 }}><IcoCheckCircle /> All animals are healthy</div>
            ) : (
              animals.filter(a => ["Critical", "Sick", "Check soon"].includes(a.status)).map(a => (
                <div key={a.id} className="notif-item" onClick={() => { setSelected(a); setShowDetail(true); setActivePage("dashboard"); setShowNotifPanel(false); setTimeout(() => document.getElementById("animal-list")?.scrollIntoView({ behavior: "smooth" }), 100); }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: a.status === "Critical" ? "#fff0ee" : a.status === "Sick" ? "#fff4ee" : "#fff9ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {a.status === "Critical" ? <IcoCriticalAlert /> : a.status === "Sick" ? <IcoSickAlert /> : <IcoWarningAlert />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <b style={{ fontSize: 12 }}>{a.name} <span style={{ fontWeight: 400, color: "var(--muted)" }}>· {a.id}</span></b>
                      <span style={{ fontSize: 10, color: "var(--muted)" }}>{a.time}</span>
                    </div>
                    <small style={{ color: a.status === "Critical" ? "#c0453a" : a.status === "Sick" ? "#b85c2a" : "#8a6b22" }}>{a.note}</small>
                  </div>
                </div>
              ))
            )}
            <div style={{ padding: "8px 16px 12px", borderTop: "1px solid #ecf1eb", marginTop: 4 }}>
              <button style={{ width: "100%", padding: "8px", border: "1px solid #d0dfd1", borderRadius: 7, background: "#fff", color: "#427653", fontSize: 11, fontWeight: 700, cursor: "pointer" }} onClick={() => { navTo("animals"); setShowNotifPanel(false); }}>
                View all animals →
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  const dashboardPage = (
    <>
      {pageHeader}

      <section className="product-hero">
        <div className="hero-copy">
          <p className="hero-kicker">AKMY BAND · EARLY HEALTH DETECTION</p>
          <h2>Notice the small signs<br />before they become big problems.</h2>
          <p>AKMY Band checks each animal every hour, combining body temperature, heart rate and movement data to help farmers respond earlier.</p>
          <div className="status-key">
            <span className="normal">● Normal</span>
            <span className="check">● Check soon</span>
            <span className="sick">● Sick</span>
            <span className="critical">● Critical</span>
            <span className="offline">● Band offline</span>
          </div>
        </div>
        <div className="hero-band">
          <div className="band-ring"><span>AKMY</span></div>
          <p><b>Self-powered monitoring</b><br />Motion energy supports the rechargeable battery.</p>
        </div>
      </section>

      <section className="urgent">
        <div className="urgent-icon" style={{display:"grid",placeItems:"center"}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="14"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="4"/></svg></div>
        <div><b>1 animal needs your attention now</b><p>Daisy (C-024) has a high temperature and reduced activity.</p></div>
        <button onClick={() => {
          setSelected(animals[0]);
          setShowDetail(true);
          document.getElementById("animal-list")?.scrollIntoView({ behavior: "smooth" });
        }}>View alert <span>→</span></button>
      </section>

      <section className="stats" aria-label="Herd summary">
        <article>
          <div className="stat-icon herd"><IcoHerd /></div>
          <div><small>MONITORED ANIMALS</small><strong>{totalCount}</strong><em>↑ 2 from last week</em></div>
        </article>
        <article>
          <div className="stat-icon healthy"><IcoHeart /></div>
          <div><small>HEALTHY</small><strong>{healthyCount} <span>/ {totalCount}</span></strong><em className="neutral">{Math.round(healthyCount/totalCount*100)}% of herd</em></div>
        </article>
        <article>
          <div className="stat-icon warning"><IcoAlert /></div>
          <div><small>NEEDS CHECKING</small><strong>{needsCheckCount}</strong><em className="orange">↑ 1 since yesterday</em></div>
        </article>
        <article>
          <div className="stat-icon offline-icon"><IcoWifiOff /></div>
          <div><small>BAND OFFLINE</small><strong>{offlineCount}</strong><em className="neutral">Last seen 1 hr ago</em></div>
        </article>
      </section>

      <section className="main-grid" id="animal-list">
        <div className="animal-panel card">
          <div className="panel-heading">
            <div><h2>Your animals</h2><p>Last updated just now</p></div>
            <button className="outline" onClick={() => navTo("animals")}>View all animals →</button>
          </div>
          <div className="filters">
            {(["All", "Critical", "Sick", "Check soon", "Normal", "Offline"] as const).map((item) => (
              <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>
                {item}{item === "All" ? ` (${totalCount})` : ""}
              </button>
            ))}
          </div>
          <div className="animal-table">
            <div className="table-head"><span>ANIMAL</span><span>STATUS</span><span>LAST READING</span><span></span></div>
            {list.map((animal) => (
              <button
                className={`animal-row ${selected.id === animal.id && showDetail ? "current" : ""}`}
                onClick={(e) => { e.stopPropagation(); setSelected(animal); setShowDetail(true); }}
                key={animal.id}
              >
                <span className="animal-name"><span className="cow"><IcoCow size={16}/></span><span><b>{animal.name}</b><small>{animal.id} · {animal.kind}</small></span></span>
                <span><i className={`dot ${styles[animal.status]}`} /><b className={styles[animal.status]}>{animal.status}</b></span>
                <span className="reading"><b>{animal.temp} <span>·</span> {animal.heart}</b><small>{animal.time}</small></span>
                <span className="arrow">›</span>
              </button>
            ))}
          </div>
        </div>

        {showDetail && (
          <aside className="detail card">
            <div className="detail-title">
              <p>ANIMAL HEALTH</p>
              <button aria-label="Close detail" onClick={(e) => { e.stopPropagation(); setShowDetail(false); }}>×</button>
            </div>
            <div className="animal-hero">
              <span className="big-cow"><IcoCow size={26}/></span>
              <div><h2>{selected.name}</h2><p>{selected.id} · {selected.kind}</p></div>
            </div>
            <div className={`status-banner ${styles[selected.status]}`}>
              <i className="dot" /><b>{selected.status}</b><span>{selected.note}</span>
            </div>
            <h3>Latest readings <small>{selected.time}</small></h3>
            <div className="metrics">
              <div>
                <span className="metric-icon temp"><IcoThermo /></span>
                <small>BODY TEMPERATURE</small>
                <b>{selected.temp}</b>
                <em className={selected.status === "Critical" || selected.status === "Sick" ? "bad" : "good"}>
                  {selected.temp !== "—" ? selected.status === "Critical" ? "↑ 1.4°C above normal" : "Normal range" : "No signal"}
                </em>
              </div>
              <div>
                <span className="metric-icon heart"><IcoHeartSm /></span>
                <small>HEART RATE</small>
                <b>{selected.heart}</b>
                <em className={selected.status === "Critical" ? "bad" : "good"}>
                  {selected.heart !== "—" ? selected.status === "Critical" ? "↑ Elevated" : "Normal range" : "No signal"}
                </em>
              </div>
              <div>
                <span className="metric-icon move"><IcoActivity /></span>
                <small>ACTIVITY</small>
                <b>{selected.activity}</b>
                <em className={selected.status === "Critical" ? "bad" : "good"}>
                  {selected.activity !== "—" ? selected.status === "Critical" ? "↓ Less than usual" : "Normal activity" : "No signal"}
                </em>
              </div>
            </div>
            <div className="recommendation">
              <span>✦</span>
              <p><b>Recommended action</b>Check {selected.name} in person within <strong>{selected.status === "Critical" ? "2 hours" : "today"}</strong>.</p>
            </div>
            <button
              className="check-btn"
              onClick={handleMarkChecked}
              style={checkedIds.has(selected.id) ? { background: "#4a9c62", opacity: 1 } : undefined}
            >
              {checkedIds.has(selected.id) ? "✓ Checked — in-person visit scheduled" : "Mark as checked"}
            </button>
            <p className="live-note">{notice.startsWith("✓") ? <span style={{color:"#4a9c62",fontWeight:700}}>{notice}</span> : <>● {notice}</>}</p>
            <button
              onClick={handleDeleteAnimal}
              style={{ width:"100%", marginTop:10, padding:"9px", border:"1px solid #f5c6c3", borderRadius:9, background:"#fff5f5", color:"#c0392b", fontSize:12, fontWeight:700, cursor:"pointer", transition:"background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background="#fde8e7")}
              onMouseLeave={e => (e.currentTarget.style.background="#fff5f5")}
            >
              🗑 Delete this animal
            </button>
          </aside>
        )}
      </section>

      <section className="solution-grid">
        <article className="feature-card">
          <p className="eyebrow">THE INNOVATION</p>
          <h2>One smart band. Earlier action.</h2>
          <p className="feature-intro">A protected, adjustable wearable designed for the demands of the farm.</p>
          <div className="feature-list">
            <div><span><IcoHeartSm /></span><p><b>Heart rate</b><small>Detects stress and abnormal patterns.</small></p></div>
            <div><span><IcoThermo /></span><p><b>Body temperature</b><small>Flags fever before symptoms are obvious.</small></p></div>
            <div><span><IcoActivity /></span><p><b>Movement &amp; activity</b><small>Shows reduced movement from injury or illness.</small></p></div>
          </div>
        </article>
        <article className="feature-card band-card">
          <p className="eyebrow">BUILT FOR FARM LIFE</p>
          <h2>Protected, practical, reliable.</h2>
          <div className="band-specs">
            <span>🛡 <b>Rubber + metal sensor guard</b><small>Helps protect the sensor from mud, impact and scratching.</small></span>
            <span>◉ <b>Hourly standard checks</b><small>Automatic readings all day; increased checks when an alert appears.</small></span>
            <span>⚡ <b>Motion-energy assist</b><small>Piezoelectric ball generator supplements battery power.</small></span>
          </div>
        </article>
        <article className="feature-card action-card">
          <p className="eyebrow">FROM ALERT TO ACTION</p>
          <h2>Clear next steps, not confusing data.</h2>
          <ol>
            <li><b>Band detects a change</b><span>Temperature, heart rate or activity differs from the animal&apos;s normal pattern.</span></li>
            <li><b>App sets a health state</b><span>Normal, Check soon, Sick, Critical, or Band offline.</span></li>
            <li><b>Farmer receives guidance</b><span>See the animal ID and a recommended time to check it in person.</span></li>
          </ol>
        </article>
      </section>

      <section className="pricing-card">
        <div>
          <p className="eyebrow">SIMPLE FARMER-FRIENDLY PLAN</p>
          <h2>AKMY Band <strong>$150</strong> <span>per animal</span></h2>
          <p>Estimated production cost: $80–90. The companion app is free with an AKMY Band.</p>
        </div>
        <div className="pricing-pill"><b>Free app</b><span>Animal list · alerts · readings · health states</span></div>
      </section>
    </>
  );

  // ── MY ANIMALS PAGE ──────────────────────────────────────────────────────
  const animalsPage = (
    <>
      {pageHeader}
      <div style={{ margin: "28px 0 0" }}>
        <div className="panel-heading" style={{ padding: "0 0 18px" }}>
          <div><h2 style={{ fontSize: 22 }}>My Animals</h2><p>All monitored animals on Green Valley Farm</p></div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>＋ Add animal</button>
        </div>
        <div className="animal-panel card">
          <div className="filters" style={{ padding: "16px 22px" }}>
            {(["All", "Critical", "Sick", "Check soon", "Normal", "Offline"] as const).map((item) => (
              <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>
                {item}{item === "All" ? ` (${totalCount})` : ""}
              </button>
            ))}
          </div>
          <div className="animal-table">
            <div className="table-head"><span>ANIMAL</span><span>STATUS</span><span>LAST READING</span><span></span></div>
            {list.map((animal) => (
              <button
                className={`animal-row ${selected.id === animal.id && showDetail ? "current" : ""}`}
                onClick={(e) => { e.stopPropagation(); setSelected(animal); setShowDetail(true); }}
                key={animal.id}
              >
                <span className="animal-name"><span className="cow"><IcoCow size={16}/></span><span><b>{animal.name}</b><small>{animal.id} · {animal.kind}</small></span></span>
                <span><i className={`dot ${styles[animal.status]}`} /><b className={styles[animal.status]}>{animal.status}</b></span>
                <span className="reading"><b>{animal.temp} <span>·</span> {animal.heart}</b><small>{animal.time}</small></span>
                <span className="arrow">›</span>
              </button>
            ))}
          </div>
        </div>

        {showDetail && (
          <div style={{ marginTop: 20 }}>
            <aside className="detail card">
              <div className="detail-title">
                <p>ANIMAL HEALTH</p>
                <button aria-label="Close detail" onClick={(e) => { e.stopPropagation(); setShowDetail(false); }}>×</button>
              </div>
              <div className="animal-hero">
                <span className="big-cow"><IcoCow size={26}/></span>
                <div><h2>{selected.name}</h2><p>{selected.id} · {selected.kind}</p></div>
              </div>
              <div className={`status-banner ${styles[selected.status]}`}>
                <i className="dot" /><b>{selected.status}</b><span>{selected.note}</span>
              </div>
              <h3>Latest readings <small>{selected.time}</small></h3>
              <div className="metrics">
                <div>
                  <span className="metric-icon temp"><IcoThermo /></span>
                  <small>BODY TEMPERATURE</small><b>{selected.temp}</b>
                  <em className={selected.status === "Critical" || selected.status === "Sick" ? "bad" : "good"}>
                    {selected.temp !== "—" ? (selected.status === "Critical" ? "↑ 1.4°C above normal" : "Normal range") : "No signal"}
                  </em>
                </div>
                <div>
                  <span className="metric-icon heart"><IcoHeartSm /></span>
                  <small>HEART RATE</small><b>{selected.heart}</b>
                  <em className={selected.status === "Critical" ? "bad" : "good"}>
                    {selected.heart !== "—" ? (selected.status === "Critical" ? "↑ Elevated" : "Normal range") : "No signal"}
                  </em>
                </div>
                <div>
                  <span className="metric-icon move"><IcoActivity /></span>
                  <small>ACTIVITY</small><b>{selected.activity}</b>
                  <em className={selected.status === "Critical" ? "bad" : "good"}>
                    {selected.activity !== "—" ? (selected.status === "Critical" ? "↓ Less than usual" : "Normal activity") : "No signal"}
                  </em>
                </div>
              </div>
              <div className="recommendation">
                <span>✦</span>
                <p><b>Recommended action</b>Check {selected.name} in person within <strong>{selected.status === "Critical" ? "2 hours" : "today"}</strong>.</p>
              </div>
              <button className="check-btn" onClick={() => setNotice(`${selected.name} marked for an in-person check`)}>Mark as checked</button>
              <p className="live-note">● {notice}</p>
              <button
                onClick={handleDeleteAnimal}
                style={{ width:"100%", marginTop:10, padding:"9px", border:"1px solid #f5c6c3", borderRadius:9, background:"#fff5f5", color:"#c0392b", fontSize:12, fontWeight:700, cursor:"pointer", transition:"background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background="#fde8e7")}
                onMouseLeave={e => (e.currentTarget.style.background="#fff5f5")}
              >
                🗑 Delete this animal
              </button>
            </aside>
          </div>
        )}
      </div>
    </>
  );

  // ── HEALTH HISTORY PAGE ──────────────────────────────────────────────────
  const historyPage = (
    <>
      {pageHeader}
      <div style={{ margin: "28px 0 0" }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 22, margin: "0 0 4px" }}>Health History</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>Recent health events across your herd</p>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="table-head" style={{ padding: "14px 22px", gridTemplateColumns: "1fr 1fr 2fr 120px" }}>
            <span>DATE</span><span>ANIMAL</span><span>EVENT</span><span>STATUS</span>
          </div>
          {historyEntries.map((e, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr 120px",
                alignItems: "center",
                padding: "14px 22px",
                borderTop: "1px solid #ecf1eb",
                fontSize: 12,
                background: "#fff",
              }}
            >
              <span style={{ color: "var(--muted)", fontSize: 11 }}>{e.date}</span>
              <span><b>{e.animal}</b><br /><small style={{ color: "#819287" }}>{e.id}</small></span>
              <span style={{ color: "#3c5045" }}>{e.event}</span>
              <span><i className={`dot ${styles[e.status]}`} /><b className={styles[e.status]}>{e.status}</b></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // ── BAND SETTINGS PAGE ───────────────────────────────────────────────────
  const settingsPage = (
    <>
      {pageHeader}
      <div style={{ margin: "28px 0 0" }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 22, margin: "0 0 4px" }}>Band Settings</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>Manage your AKMY Band devices</p>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="table-head" style={{ padding: "14px 22px", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 100px" }}>
            <span>ANIMAL</span><span>BATTERY</span><span>SIGNAL</span><span>CHECK INTERVAL</span><span>ACTION</span>
          </div>
          {bandList.map((b) => (
            <div
              key={b.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr 1fr 100px",
                alignItems: "center",
                padding: "14px 22px",
                borderTop: "1px solid #ecf1eb",
                background: "#fff",
                fontSize: 12,
              }}
            >
              <span className="animal-name"><span className="cow" style={{ width: 28, height: 28, fontSize: 15 }}><IcoCow size={14}/></span><span><b>{b.name}</b><small style={{ color: "#819287" }}>{b.id}</small></span></span>
              <span>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 4, background: "#e8ede7", overflow: "hidden" }}>
                    <div style={{ width: `${b.battery}%`, height: "100%", background: b.battery > 50 ? "#4a9c62" : b.battery > 20 ? "#f0ac35" : "#e05a4e", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 28 }}>{b.battery}%</span>
                </div>
              </span>
              <span style={{ color: b.signal === "Strong" ? "#4a9c62" : b.signal === "Good" ? "#6aaa7c" : b.signal === "Weak" ? "#c98828" : "#b04040", fontWeight: 700, fontSize: 11 }}>{b.signal}</span>
              <span style={{ color: "var(--muted)" }}>{b.interval}</span>
              <span>
                {b.signal !== "None" ? (
                  <button className="outline" style={{ fontSize: 10, padding: "5px 9px" }}
                    onClick={() => alert(`Settings for ${b.name}'s band will open here.`)}>
                    Configure
                  </button>
                ) : (
                  <span style={{ fontSize: 10, color: "#b04040", fontWeight: 700 }}>Offline</span>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: "22px", marginTop: 18 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Global Settings</h3>
          <div style={{ display: "grid", gap: 14 }}>
            {[
              { label: "Alert notification method", value: "App + SMS" },
              { label: "Default check interval", value: "Every 60 min" },
              { label: "Auto-escalate after", value: "2 unanswered alerts" },
              { label: "Firmware version", value: "AKMY-v2.4.1" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ecf1eb", paddingBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#4a5e52", fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // ── HELP CENTRE PAGE ─────────────────────────────────────────────────────
  const helpPage = (
    <>
      {pageHeader}
      <div style={{ margin: "28px 0 0" }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 22, margin: "0 0 4px" }}>Help Centre</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>Everything you need to get started with AKMY Band</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {([
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, title: "Getting started", desc: "Set up your first band, pair it to an animal, and start monitoring in under 10 minutes.", tag: "Setup guide" },
            { icon: <IcoHeart />, title: "Understanding health states", desc: "Learn what Normal, Check soon, Sick, Critical, and Offline statuses mean and when to act.", tag: "Health guide" },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M5.34 5.34l-1.41-1.41M12 2v2M12 20v2"/></svg>, title: "Band troubleshooting", desc: "Fix connectivity issues, low battery warnings, and sensor errors with our step-by-step guide.", tag: "Troubleshooting" },
            { icon: <IcoHerd />, title: "Managing your herd", desc: "Add, edit, or remove animals from your farm profile and keep your records accurate.", tag: "Account guide" },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>, title: "Battery & charging", desc: "Understand how motion-energy assist works and how to recharge bands between seasons.", tag: "Hardware guide" },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: "Contact support", desc: "Couldn't find what you need? Reach our support team and we'll get back to you within 24 hours.", tag: "Support" },
          ] as {icon: React.ReactNode, title: string, desc: string, tag: string}[]).map(({ icon, title, desc, tag }) => (
            <div key={title} className="card feature-card" style={{ cursor: "pointer" }}
              onClick={() => alert(`Opening: ${title}`)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: "#4a9c62", display:"flex", alignItems:"center" }}>{icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.8px", color: "#829688", background: "#f0f7ed", borderRadius: 5, padding: "3px 8px" }}>{tag}</span>
              </div>
              <b style={{ fontSize: 14, display: "block", marginBottom: 6 }}>{title}</b>
              <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const pageContent: Record<NavPage, JSX.Element> = {
    dashboard: dashboardPage,
    animals: animalsPage,
    history: historyPage,
    settings: settingsPage,
    help: helpPage,
  };

  return (
    <main className="app-shell" onClick={() => { setShowNotifPanel(false); setShowProfileMenu(false); }}>
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span><span>AKMY<span className="thin">Band</span></span></div>
        <nav>
          <button className={`nav-item${activePage === "dashboard" ? " active" : ""}`} onClick={() => navTo("dashboard")}>
            <span className="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
            Dashboard
          </button>
          <button className={`nav-item${activePage === "animals" ? " active" : ""}`} onClick={() => navTo("animals")}>
            <span className="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="5" cy="10" r="2"/><circle cx="17" cy="10" r="2"/><path d="M12 12c-4 0-6 2-6 4.5 0 1.5.8 2.7 2 3.2.4.2.9.4 1.4.9.3.3.7.4 1.1.4s.7-.1 1-.4c.5-.5 1-.7 1.5-.9 1.2-.5 2-1.7 2-3.2 0-2.5-2-4.5-6-4.5z"/></svg></span>
            My animals
          </button>
          <button className={`nav-item${activePage === "history" ? " active" : ""}`} onClick={() => navTo("history")}>
            <span className="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg></span>
            Health history
          </button>
          <button className={`nav-item${activePage === "settings" ? " active" : ""}`} onClick={() => navTo("settings")}>
            <span className="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2.2" fill="white" stroke="currentColor"/><circle cx="15" cy="12" r="2.2" fill="white" stroke="currentColor"/><circle cx="9" cy="18" r="2.2" fill="white" stroke="currentColor"/></svg></span>
            Band settings
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className={`nav-item${activePage === "help" ? " active" : ""}`} onClick={() => navTo("help")}>
            <span className="nav-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 0 1 5.83 1c0 2-3 2.5-3 4.5"/><circle cx="12" cy="18" r=".5" fill="currentColor"/></svg></span>
            Help centre
          </button>
          <div
            className="profile"
            style={{ cursor: "pointer", position: "relative" }}
            onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}
          >
            <div className="avatar">JS</div>
            <div><b>Jamie Smith</b><small>Green Valley Farm</small></div>
            <span style={{ transform: showProfileMenu ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }}>⌄</span>

            {showProfileMenu && (
              <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { setShowProfileMenu(false); alert("Account settings coming soon."); }}>⚙ Account settings</button>
                <button onClick={() => { setShowProfileMenu(false); alert("You have been signed out."); }}>↩ Sign out</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <section className="content">
        {pageContent[activePage]}
      </section>

      {/* ── ADD ANIMAL MODAL ── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Add New Animal</h2>
              <button style={{ border: 0, background: "transparent", fontSize: 22, color: "#90a097", cursor: "pointer" }} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", color: "#829688", display: "block", marginBottom: 6 }}>ANIMAL NAME</label>
                <input
                  value={newAnimalName}
                  onChange={(e) => setNewAnimalName(e.target.value)}
                  placeholder="e.g. Rosie"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #dce8db", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", color: "#829688", display: "block", marginBottom: 6 }}>ANIMAL TYPE</label>
                <select
                  value={newAnimalKind}
                  onChange={(e) => setNewAnimalKind(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #dce8db", borderRadius: 8, fontSize: 13, background: "#fff", outline: "none" }}
                >
                  <option>Dairy cow</option>
                  <option>Beef cow</option>
                  <option>Sheep</option>
                  <option>Goat</option>
                  <option>Pig</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", color: "#829688", display: "block", marginBottom: 6 }}>BAND ID (optional)</label>
                <input
                  value={newBandId}
                  onChange={(e) => setNewBandId(e.target.value)}
                  placeholder="e.g. C-055"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #dce8db", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button className="outline" style={{ flex: 1, padding: "10px" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button
                className="add-btn"
                style={{ flex: 2, justifyContent: "center" }}
                onClick={() => {
                  const name = newAnimalName.trim();
                  if (!name) return;
                  const count = animals.length + 1;
                  const id = newBandId.trim() || `C-${String(count).padStart(3, "0")}`;
                  const newAnimal = {
                    id,
                    name,
                    kind: newAnimalKind,
                    status: "Normal" as Status,
                    temp: "—",
                    heart: "—",
                    activity: "—",
                    time: "Just added",
                    note: "Awaiting first band reading",
                  };
                  setAnimals(prev => [...prev, newAnimal]);
                  setSelected(newAnimal);
                  setShowDetail(true);
                  setNewAnimalName("");
                  setNewBandId("");
                  setShowAddModal(false);
                  setActivePage("animals");
                }}
              >
                Add animal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
