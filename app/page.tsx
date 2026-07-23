"use client";

import { useMemo, useState } from "react";

type Status = "Normal" | "Check soon" | "Sick" | "Critical" | "Offline";

const animals = [
  { id: "C-024", name: "Daisy", kind: "Dairy cow", status: "Critical" as Status, temp: "40.1°C", heart: "98 bpm", activity: "32%", time: "2 min ago", note: "High temperature + low activity" },
  { id: "C-011", name: "Milo", kind: "Dairy cow", status: "Check soon" as Status, temp: "39.3°C", heart: "84 bpm", activity: "61%", time: "16 min ago", note: "Activity below usual" },
  { id: "C-037", name: "Clover", kind: "Dairy cow", status: "Sick" as Status, temp: "39.8°C", heart: "92 bpm", activity: "47%", time: "8 min ago", note: "Temperature rising" },
  { id: "C-018", name: "Biscuit", kind: "Dairy cow", status: "Normal" as Status, temp: "38.6°C", heart: "72 bpm", activity: "87%", time: "12 min ago", note: "All readings normal" },
  { id: "C-042", name: "Maple", kind: "Dairy cow", status: "Offline" as Status, temp: "—", heart: "—", activity: "—", time: "1 hr ago", note: "Band connection lost" },
];

const styles: Record<Status, string> = {
  Normal: "normal", "Check soon": "check", Sick: "sick", Critical: "critical", Offline: "offline",
};

export default function Home() {
  const [filter, setFilter] = useState<Status | "All">("All");
  const [selected, setSelected] = useState(animals[0]);
  const [notice, setNotice] = useState("Live monitoring is active");
  const list = useMemo(() => filter === "All" ? animals : animals.filter((a) => a.status === filter), [filter]);
  const alertCount = animals.filter((a) => ["Critical", "Sick"].includes(a.status)).length;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span><span>AKMY<span className="thin">Band</span></span></div>
        <nav>
          <button className="nav-item active"><span>▦</span> Dashboard</button>
          <button className="nav-item"><span>♧</span> My animals</button>
          <button className="nav-item"><span>◌</span> Health history</button>
          <button className="nav-item"><span>⌁</span> Band settings</button>
        </nav>
        <div className="sidebar-bottom"><button className="nav-item"><span>?</span> Help centre</button><div className="profile"><div className="avatar">JS</div><div><b>Jamie Smith</b><small>Green Valley Farm</small></div><span>⌄</span></div></div>
      </aside>

      <section className="content">
        <header><div><p className="eyebrow">GREEN VALLEY FARM</p><h1>Good morning, Jamie <span>☀</span></h1><p className="subtitle">Here is your herd health overview for today.</p></div><div className="header-actions"><button className="icon-btn" aria-label="Notifications">♢<i>{alertCount}</i></button><button className="add-btn">＋ Add animal</button></div></header>

        <section className="product-hero">
          <div className="hero-copy"><p className="hero-kicker">AKMY BAND · EARLY HEALTH DETECTION</p><h2>Notice the small signs<br />before they become big problems.</h2><p>AKMY Band checks each animal every hour, combining body temperature, heart rate and movement data to help farmers respond earlier.</p><div className="status-key"><span className="normal">● Normal</span><span className="check">● Check soon</span><span className="sick">● Sick</span><span className="critical">● Critical</span><span className="offline">● Band offline</span></div></div>
          <div className="hero-band"><div className="band-ring"><span>AKMY</span></div><p><b>Self-powered monitoring</b><br />Motion energy supports the rechargeable battery.</p></div>
        </section>

        <section className="urgent"><div className="urgent-icon">!</div><div><b>1 animal needs your attention now</b><p>Daisy (C-024) has a high temperature and reduced activity.</p></div><button onClick={() => { setSelected(animals[0]); document.getElementById("animal-list")?.scrollIntoView({ behavior: "smooth" }); }}>View alert <span>→</span></button></section>

        <section className="stats" aria-label="Herd summary">
          <article><div className="stat-icon herd">♧</div><div><small>MONITORED ANIMALS</small><strong>42</strong><em>↑ 2 from last week</em></div></article>
          <article><div className="stat-icon healthy">♥</div><div><small>HEALTHY</small><strong>38 <span>/ 42</span></strong><em className="neutral">90% of herd</em></div></article>
          <article><div className="stat-icon warning">!</div><div><small>NEEDS CHECKING</small><strong>3</strong><em className="orange">↑ 1 since yesterday</em></div></article>
          <article><div className="stat-icon offline-icon">⌁</div><div><small>BAND OFFLINE</small><strong>1</strong><em className="neutral">Last seen 1 hr ago</em></div></article>
        </section>

        <section className="main-grid" id="animal-list">
          <div className="animal-panel card">
            <div className="panel-heading"><div><h2>Your animals</h2><p>Last updated just now</p></div><button className="outline">View all animals →</button></div>
            <div className="filters">{(["All", "Critical", "Sick", "Check soon", "Normal", "Offline"] as const).map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}{item === "All" ? " (42)" : ""}</button>)}</div>
            <div className="animal-table"><div className="table-head"><span>ANIMAL</span><span>STATUS</span><span>LAST READING</span><span></span></div>{list.map((animal) => <button className={`animal-row ${selected.id === animal.id ? "current" : ""}`} onClick={() => setSelected(animal)} key={animal.id}><span className="animal-name"><span className="cow">♧</span><span><b>{animal.name}</b><small>{animal.id} · {animal.kind}</small></span></span><span><i className={`dot ${styles[animal.status]}`}></i><b className={styles[animal.status]}>{animal.status}</b></span><span className="reading"><b>{animal.temp} <span>·</span> {animal.heart}</b><small>{animal.time}</small></span><span className="arrow">›</span></button>)}</div>
          </div>
          <aside className="detail card"><div className="detail-title"><p>ANIMAL HEALTH</p><button aria-label="Close detail">×</button></div><div className="animal-hero"><span className="big-cow">♧</span><div><h2>{selected.name}</h2><p>{selected.id} · {selected.kind}</p></div></div><div className={`status-banner ${styles[selected.status]}`}><i className="dot"></i><b>{selected.status}</b><span>{selected.note}</span></div><h3>Latest readings <small>{selected.time}</small></h3><div className="metrics"><div><span className="metric-icon temp">♨</span><small>BODY TEMPERATURE</small><b>{selected.temp}</b><em className={selected.status === "Critical" || selected.status === "Sick" ? "bad" : "good"}>{selected.temp !== "—" ? selected.status === "Critical" ? "↑ 1.4°C above normal" : "Normal range" : "No signal"}</em></div><div><span className="metric-icon heart">♥</span><small>HEART RATE</small><b>{selected.heart}</b><em className={selected.status === "Critical" ? "bad" : "good"}>{selected.heart !== "—" ? selected.status === "Critical" ? "↑ Elevated" : "Normal range" : "No signal"}</em></div><div><span className="metric-icon move">⌁</span><small>ACTIVITY</small><b>{selected.activity}</b><em className={selected.status === "Critical" ? "bad" : "good"}>{selected.activity !== "—" ? selected.status === "Critical" ? "↓ Less than usual" : "Normal activity" : "No signal"}</em></div></div><div className="recommendation"><span>✦</span><p><b>Recommended action</b>Check {selected.name} in person within <strong>{selected.status === "Critical" ? "2 hours" : "today"}</strong>.</p></div><button className="check-btn" onClick={() => setNotice(`${selected.name} marked for an in-person check`)}>Mark as checked</button><p className="live-note">● {notice}</p></aside>
        </section>

        <section className="solution-grid">
          <article className="feature-card"><p className="eyebrow">THE INNOVATION</p><h2>One smart band. Earlier action.</h2><p className="feature-intro">A protected, adjustable wearable designed for the demands of the farm.</p><div className="feature-list"><div><span>♥</span><p><b>Heart rate</b><small>Detects stress and abnormal patterns.</small></p></div><div><span>♨</span><p><b>Body temperature</b><small>Flags fever before symptoms are obvious.</small></p></div><div><span>⌁</span><p><b>Movement & activity</b><small>Shows reduced movement from injury or illness.</small></p></div></div></article>
          <article className="feature-card band-card"><p className="eyebrow">BUILT FOR FARM LIFE</p><h2>Protected, practical, reliable.</h2><div className="band-specs"><span>🛡 <b>Rubber + metal sensor guard</b><small>Helps protect the sensor from mud, impact and scratching.</small></span><span>◉ <b>Hourly standard checks</b><small>Automatic readings all day; increased checks when an alert appears.</small></span><span>⚡ <b>Motion-energy assist</b><small>Piezoelectric ball generator supplements battery power.</small></span></div></article>
          <article className="feature-card action-card"><p className="eyebrow">FROM ALERT TO ACTION</p><h2>Clear next steps, not confusing data.</h2><ol><li><b>Band detects a change</b><span>Temperature, heart rate or activity differs from the animal&apos;s normal pattern.</span></li><li><b>App sets a health state</b><span>Normal, Check soon, Sick, Critical, or Band offline.</span></li><li><b>Farmer receives guidance</b><span>See the animal ID and a recommended time to check it in person.</span></li></ol></article>
        </section>

        <section className="pricing-card"><div><p className="eyebrow">SIMPLE FARMER-FRIENDLY PLAN</p><h2>AKMY Band <strong>$150</strong> <span>per animal</span></h2><p>Estimated production cost: $80–90. The companion app is free with an AKMY Band.</p></div><div className="pricing-pill"><b>Free app</b><span>Animal list · alerts · readings · health states</span></div></section>
      </section>
    </main>
  );
}
