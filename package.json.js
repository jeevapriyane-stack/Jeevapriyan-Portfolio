import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About","Education","Experience","Leadership","Startups","Skills","Certifications","Projects","Contact"];

const EDUCATION = [
  { degree:"SSLC", school:"Sri Vidhya Bharathi Matric Hr. Sec. School", location:"Neikarapatti, Salem", year:"2019–2020", score:"73%", icon:"🎓", link:"https://www.youtube.com/@srividhyabharatimatrichrse7326" },
  { degree:"HSC / +2", school:"Sri Vidhya Bharathi Matric Hr. Sec. School", location:"Neikarapatti, Salem", year:"2020–2022", score:"73%", icon:"📚", link:"https://www.youtube.com/@srividhyabharatimatrichrse7326" },
  { degree:"B.Sc Biotechnology", school:"Sona College of Arts & Science", location:"Salem, Tamil Nadu", year:"2022–2025", score:"CGPA 8.5", icon:"🔬", link:"https://www.sonacas.edu.in" },
  { degree:"MBA – Marketing & Finance", school:"Sona School of Business & Management", location:"Salem, Tamil Nadu", year:"2025–2027", score:"CGPA 8.4", icon:"💼", link:"https://www.sonabusinessschool.com" },
];

const EXPERIENCE = [
  {
    role:"Microbial Research Intern", org:"Bharathiyar University", location:"Coimbatore", type:"Research", color:"#6366f1",
    skills:["Plant Tissue Culture","TLC","Column Chromatography","FT/IR Techniques","Microbiological Experiments"],
    desc:"Conducted advanced microbial research applying biotechnology techniques in a premier university lab environment.",
  },
  {
    role:"Marketing & Business Exposure", org:"Leadership Activities", location:"Salem", type:"Practical", color:"#8b5cf6",
    skills:["Marketing","Analytical Skills","Business Communication","Leadership Activities","Strategic Thinking"],
    desc:"Hands-on practical experience through organizing events, coordinating placements, and leading department activities.",
  },
];

const LEADERSHIP = [
  { icon:"🏆", title:"Organising Convenor", sub:"National Quiz – Viksit Bharat · MBA · 2025–27", level:"MBA" },
  { icon:"📊", title:"MMA Active Member", sub:"Madras Management Association · MBA · 2025–27", level:"MBA" },
  { icon:"🏛️", title:"Joint Secretary", sub:"Biotechnology Dept · B.Sc · 2023–24", level:"B.Sc" },
  { icon:"🎯", title:"Event Management Head", sub:"Intra & Inter College Events · B.Sc · 2022–25", level:"B.Sc" },
  { icon:"🤝", title:"Placement Coordinator", sub:"Campus Recruitment Drive · B.Sc · 2022–25", level:"B.Sc" },
  { icon:"🧠", title:"Business Quiz Champion", sub:"Multiple Competition Awards · Ongoing", level:"All" },
];

const STARTUPS = [
  {
    name:"MEALICIOUS VENTURES", suffix:"PRIVATE LIMITED",
    tag:"Food Innovation · Consumer Brand",
    desc:"A forward-thinking venture focused on innovative food concepts, modern branding, and consumer-centric product experiences. Bringing flavour and story together.",
    color1:"#6366f1", color2:"#8b5cf6", year:"2025", link:"https://mealicious.store/",
  },
  {
    name:"PRIYAN DELIGHTS FOODS", suffix:"OPC PRIVATE LIMITED",
    tag:"Food Brand · Entrepreneurship",
    desc:"A founder-led OPC driving modern food branding, packaging innovation, and scalable D2C distribution. Building products that resonate with the next generation.",
    color1:"#8b5cf6", color2:"#a855f7", year:"2024", link:"https://www.mca.gov.in",
  },
];

const SKILLS = [
  { name:"Marketing Strategy", pct:88 }, { name:"Branding & Design", pct:82 },
  { name:"Finance Basics", pct:75 }, { name:"Leadership", pct:90 },
  { name:"Communication", pct:92 }, { name:"Event Management", pct:85 },
  { name:"Canva & Design Tools", pct:80 }, { name:"Business Analytics", pct:72 },
  { name:"Research Skills", pct:78 }, { name:"Entrepreneurship", pct:86 },
  { name:"Microsoft Excel", pct:74 }, { name:"Data Analytics", pct:70 },
];

const CERTS = [
  { name:"Microsoft Excel", issuer:"Great Learning", icon:"📊", color:"#6366f1" },
  { name:"Data Analytics", issuer:"Microsoft", icon:"📈", color:"#8b5cf6" },
  { name:"NISM Finance", issuer:"NISM", icon:"💹", color:"#7c3aed" },
  { name:"International Mgmt Workshop", issuer:"International Body", icon:"🌐", color:"#6366f1" },
  { name:"Indigenous Technology", issuer:"Viksit Bharat Initiative", icon:"🇮🇳", color:"#4f46e5" },
];

const PROJECTS = [
  { title:"Flavoured Makhana Branding", tag:"Branding", desc:"Full brand identity for a premium flavoured makhana startup – naming, packaging, and visual language.", color:"#6366f1" },
  { title:"Packaging Design Concepts", tag:"Design", desc:"Modern D2C-ready packaging systems with premium visual hierarchy for food & FMCG products.", color:"#8b5cf6" },
  { title:"Marketing Campaign Ideas", tag:"Marketing", desc:"360° go-to-market strategies combining digital, social, and guerrilla marketing for early-stage brands.", color:"#7c3aed" },
  { title:"Startup Business Models", tag:"Strategy", desc:"Canvas-based business model frameworks for food-tech and consumer startups aiming for scale.", color:"#4f46e5" },
  { title:"AI-Based Creative Designs", tag:"AI + Design", desc:"Leveraging AI tools for creative asset generation, brand storytelling, and visual content pipelines.", color:"#6366f1" },
];

const BLOGS = [
  { title:"Building a Brand from Zero", tag:"Branding", read:"4 min", desc:"How I approached building Mealicious Ventures – from idea to identity." },
  { title:"Marketing in the Age of AI", tag:"Marketing", read:"5 min", desc:"How AI tools are reshaping brand strategy and consumer targeting in 2025." },
  { title:"Why MBA + Entrepreneurship is the New Power Combo", tag:"Strategy", read:"6 min", desc:"Reflections from a first-semester MBA student running two companies simultaneously." },
];

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, pointerEvents:"none", zIndex:0, opacity:0.6 }} />;
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del && txt === w) { setTimeout(() => setDel(true), 1500); return; }
      if (del && txt === "") { setDel(false); setIdx(i => (i + 1) % words.length); return; }
      setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return (
    <span>{txt}<span style={{ animation:"blink 1s step-end infinite", borderRight:"2px solid #6366f1", marginLeft:2 }}>&nbsp;</span></span>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      padding: "100px 0", position: "relative", zIndex: 1, ...style,
    }}>
      {children}
    </section>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHead({ label, title, sub }) {
  return (
    <div style={{ textAlign:"center", marginBottom:64 }}>
      <span style={{
        display:"inline-block", fontSize:11, fontWeight:700, letterSpacing:4, textTransform:"uppercase",
        color:"#6366f1", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)",
        padding:"6px 18px", borderRadius:100, marginBottom:16,
      }}>{label}</span>
      <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:"#f9fafb", lineHeight:1.15, fontFamily:"'Sora',sans-serif", marginBottom:12 }}>{title}</h2>
      {sub && <p style={{ color:"#9ca3af", fontSize:16, maxWidth:500, margin:"0 auto" }}>{sub}</p>}
    </div>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function Glass({ children, style = {}, hover = true, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => hover && setH(false)} onClick={onClick} style={{
      background: h ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.04)",
      border: h ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius:20, backdropFilter:"blur(20px)", transition:"all 0.3s ease",
      boxShadow: h ? "0 8px 40px rgba(99,102,241,0.15)" : "0 4px 20px rgba(0,0,0,0.3)",
      transform: h ? "translateY(-4px)" : "translateY(0)", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function Bar({ name, pct, i }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(pct), i * 60); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, i]);
  return (
    <div ref={ref} style={{ marginBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ color:"#e5e7eb", fontSize:14, fontWeight:600 }}>{name}</span>
        <span style={{ color:"#6366f1", fontSize:13, fontWeight:700 }}>{w}%</span>
      </div>
      <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:100, height:6, overflow:"hidden" }}>
        <div style={{ width:`${w}%`, height:"100%", borderRadius:100, background:"linear-gradient(90deg,#6366f1,#8b5cf6)", transition:"width 1.2s cubic-bezier(.4,0,.2,1)", boxShadow:"0 0 10px rgba(99,102,241,0.6)" }} />
      </div>
    </div>
  );
}

// ─── Leadership Card ──────────────────────────────────────────────────────────
function LeaderCard({ l, borderColor, bgColor }) {
  return (
    <Glass style={{ padding:28, display:"flex", gap:16, alignItems:"flex-start" }}>
      <div style={{ width:48, height:48, borderRadius:14, flexShrink:0, background:bgColor, border:`1px solid ${borderColor}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
        {l.icon}
      </div>
      <div>
        <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color:"#f9fafb", marginBottom:4 }}>{l.title}</h4>
        <p style={{ color:"#6b7280", fontSize:13 }}>{l.sub}</p>
      </div>
    </Glass>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scroll, setScroll] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent] = useState(false);

  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScroll(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setNavOpen(false); };

  if (loading) return (
    <div style={{ position:"fixed", inset:0, background:"#0a0a0a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ width:60, height:60, borderRadius:"50%", border:"2px solid rgba(99,102,241,0.2)", borderTop:"2px solid #6366f1", animation:"spin 0.8s linear infinite", marginBottom:24 }} />
      <span style={{ color:"#6366f1", fontSize:13, letterSpacing:4, fontFamily:"'Sora',sans-serif", textTransform:"uppercase" }}>Loading Portfolio</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#0a0a0a;color:#f9fafb;font-family:'Manrope',sans-serif;overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#111;}::-webkit-scrollbar-thumb{background:#6366f1;border-radius:2px;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)}70%{box-shadow:0 0 0 20px rgba(99,102,241,0)}100%{box-shadow:0 0 0 0 rgba(99,102,241,0)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .nav-link:hover{color:#6366f1!important;}
        .visit-btn:hover{background:rgba(99,102,241,0.2)!important;}
        .company-btn:hover{background:rgba(255,255,255,0.12)!important;}
        input,textarea{outline:none!important;}
        input::placeholder,textarea::placeholder{color:#4b5563;}
        @media(max-width:768px){.desktop-nav{display:none!important;}.mobile-ham{display:block!important;}.contact-grid{grid-template-columns:1fr!important;}.hero-flex{flex-direction:column-reverse!important;}}
      `}</style>

      <Particles />

      {/* Scroll Progress Bar */}
      <div style={{ position:"fixed", top:0, left:0, height:2, zIndex:9999, width:`${scroll}%`, background:"linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7)", boxShadow:"0 0 8px rgba(99,102,241,0.8)", transition:"width 0.1s" }} />

      {/* Navbar */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, padding:"0 clamp(20px,5vw,80px)", background:"rgba(10,10,10,0.88)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, background:"linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-0.5, cursor:"pointer" }} onClick={() => scrollTo("hero")}>JE.</span>
        <div style={{ display:"flex", gap:8, alignItems:"center" }} className="desktop-nav">
          {NAV_LINKS.map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:13, fontWeight:600, fontFamily:"'Manrope',sans-serif", padding:"8px 14px", borderRadius:8, letterSpacing:0.3, transition:"color 0.2s" }}>{n}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", color:"#fff", fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:100, cursor:"pointer", marginLeft:8, fontFamily:"'Manrope',sans-serif", letterSpacing:0.5, boxShadow:"0 4px 20px rgba(99,102,241,0.4)" }}>Hire Me</button>
        </div>
        <button onClick={() => setNavOpen(v => !v)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:"#f9fafb", fontSize:22 }} className="mobile-ham">☰</button>
      </nav>

      {/* Mobile Drawer */}
      {navOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(10,10,10,0.97)", backdropFilter:"blur(20px)", zIndex:999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24 }}>
          <button onClick={() => setNavOpen(false)} style={{ position:"absolute", top:24, right:24, background:"none", border:"none", color:"#9ca3af", fontSize:28, cursor:"pointer" }}>✕</button>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{ background:"none", border:"none", color:"#f9fafb", fontSize:24, fontFamily:"'Sora',sans-serif", fontWeight:700, cursor:"pointer", letterSpacing:-0.5 }}>{n}</button>
          ))}
        </div>
      )}

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,5vw,60px)" }}>

        {/* ── HERO ── */}
        <section id="hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:100, position:"relative", zIndex:1 }}>
          <div style={{ position:"absolute", top:"20%", left:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.1),transparent 70%)", pointerEvents:"none" }} />

          <div className="hero-flex" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:40, flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 400px", maxWidth:620 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:100, padding:"6px 16px 6px 8px", marginBottom:28 }}>
                <span style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontSize:10, fontWeight:700, letterSpacing:2, padding:"4px 10px", borderRadius:100, textTransform:"uppercase" }}>Available</span>
                <span style={{ color:"#9ca3af", fontSize:12, fontWeight:600 }}>Open to opportunities & collaborations</span>
              </div>
              <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, lineHeight:1.1, fontSize:"clamp(36px,5.5vw,68px)", marginBottom:20, letterSpacing:-1.5 }}>
                Hi, I'm{" "}
                <span style={{ background:"linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundSize:"200% 200%", animation:"gradShift 4s ease infinite" }}>
                  Jeevapriyan Elangovan
                </span>
              </h1>
              <p style={{ fontSize:"clamp(16px,2.2vw,22px)", color:"#a855f7", fontWeight:700, marginBottom:16, fontFamily:"'Sora',sans-serif" }}>
                <Typewriter words={["MBA Student","Startup Founder","Marketing Strategist","Creative Entrepreneur","Brand Builder"]} />
              </p>
              <p style={{ color:"#9ca3af", fontSize:"clamp(14px,1.5vw,17px)", lineHeight:1.8, marginBottom:40, maxWidth:540 }}>
                Passionate about Marketing, Business Strategy, Branding & Innovation. Building business ideas into brands that resonate, scale, and matter.
              </p>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {[
                  { label:"📄 View Resume", primary:true, action:() => window.open("https://drive.google.com/file/d/1UjOniHCSZ1Oshc9EMx6xgIH4ouBhXzNt/view","_blank") },
                  { label:"💡 View Projects", primary:false, action:() => scrollTo("projects") },
                  { label:"📬 Contact Me", primary:false, action:() => scrollTo("contact") },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.action} style={{ background: btn.primary ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent", border: btn.primary ? "none" : "1px solid rgba(99,102,241,0.4)", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"'Manrope',sans-serif", padding:"14px 28px", borderRadius:100, cursor:"pointer", letterSpacing:0.3, boxShadow: btn.primary ? "0 8px 30px rgba(99,102,241,0.4)" : "none", transition:"all 0.3s" }}>{btn.label}</button>
                ))}
              </div>
              <div style={{ display:"flex", gap:32, marginTop:56, flexWrap:"wrap" }}>
                {[{ n:"8.4", l:"MBA CGPA" },{ n:"2", l:"Active Startups" },{ n:"10+", l:"Events Led" },{ n:"20+", l:"Certifications" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:28, background:"linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
                    <div style={{ color:"#6b7280", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Photo */}
            <div style={{ flex:"0 0 auto", display:"flex", justifyContent:"center" }}>
              <div style={{ width:"clamp(220px,25vw,320px)", height:"clamp(220px,25vw,320px)", borderRadius:"50%", background:"linear-gradient(135deg,rgba(99,102,241,0.2),rgba(168,85,247,0.15))", border:"2px solid rgba(99,102,241,0.3)", display:"flex", alignItems:"center", justifyContent:"center", animation:"float 4s ease-in-out infinite, pulse-ring 3s ease-in-out infinite", position:"relative", boxShadow:"0 0 60px rgba(99,102,241,0.2)", overflow:"hidden" }}>
                {/*
                  ── HOW TO ADD YOUR REAL PHOTO ──
                  1. Upload photo to https://imgbb.com
                  2. Copy the Direct Link (ending in .jpg/.png)
                  3. Replace the src URL below with your link
                */}
                <img
                  src="https://i.ibb.co/bjh66Zm3/IMG-20260211-144050-4.jpg"
                  alt="Jeevapriyan Elangovan"
                  style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }}
                  onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                />
                <div style={{ display:"none", width:"85%", height:"85%", borderRadius:"50%", background:"linear-gradient(135deg,#1e1b4b,#312e81)", alignItems:"center", justifyContent:"center", fontSize:72 }}>👨‍💼</div>
                <div style={{ position:"absolute", bottom:10, right:10, width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#10b981,#059669)", border:"3px solid #0a0a0a", zIndex:2 }} />
              </div>
            </div>
          </div>

          <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.5 }}>
            <span style={{ color:"#6b7280", fontSize:10, letterSpacing:3, textTransform:"uppercase" }}>Scroll</span>
            <div style={{ width:1, height:40, background:"linear-gradient(to bottom,#6366f1,transparent)" }} />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <Section id="about">
          <SectionHead label="About Me" title="The Story Behind the Brand" sub="Biotechnology graduate turned business strategist and startup founder." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {[
              { icon:"🎯", title:"The Strategist", text:"MBA student specialising in Marketing and Finance with a sharp eye for business strategy. I combine analytical thinking with creative branding to build narratives that convert and scale." },
              { icon:"🔬", title:"The Analyst", text:"A B.Sc Biotechnology graduate with deep analytical and research skills. I bring scientific rigour to every business decision — structured, evidence-based, and result-oriented." },
              { icon:"🚀", title:"The Founder", text:"Running two registered companies as an MBA student. Passionate about startups, consumer innovation, and building food brands that connect with modern India and beyond." },
              { icon:"🏆", title:"The Leader", text:"Joint Secretary, Event Management Head, and Placement Coordinator with a track record of organising national-level events and leading teams of diverse students with purpose." },
            ].map((c, i) => (
              <Glass key={i} style={{ padding:36 }}>
                <div style={{ fontSize:36, marginBottom:16 }}>{c.icon}</div>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:20, marginBottom:12, color:"#f9fafb" }}>{c.title}</h3>
                <p style={{ color:"#9ca3af", lineHeight:1.8, fontSize:15 }}>{c.text}</p>
              </Glass>
            ))}
          </div>
        </Section>

        {/* ── EDUCATION ── */}
        <Section id="education">
          <SectionHead label="Education" title="Academic Journey" sub="A foundation built on science, business, and relentless curiosity." />
          <div style={{ position:"relative", maxWidth:800, margin:"0 auto" }}>
            <div style={{ position:"absolute", left:20, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#6366f1,#a855f7,transparent)" }} />
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ display:"flex", gap:32, marginBottom:40, animation:`fadeIn 0.5s ease ${i * 0.15}s both` }}>
                <div style={{ width:40, height:40, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, zIndex:1, boxShadow:"0 0 20px rgba(99,102,241,0.5)" }}>{e.icon}</div>
                <Glass style={{ flex:1, padding:28 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
                    <div>
                      <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:18, color:"#f9fafb", marginBottom:4 }}>{e.degree}</h3>
                      <p style={{ color:"#6366f1", fontSize:14, fontWeight:600 }}>{e.school}</p>
                      <p style={{ color:"#6b7280", fontSize:13 }}>{e.location}</p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <span style={{ background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", color:"#a5b4fc", fontSize:12, fontWeight:700, padding:"4px 12px", borderRadius:100 }}>{e.year}</span>
                      <div style={{ marginTop:8, color:"#a855f7", fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16 }}>{e.score}</div>
                      {e.link && (
                        <a href={e.link} target="_blank" rel="noopener noreferrer" className="visit-btn" style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:10, background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)", color:"#a5b4fc", fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:100, textDecoration:"none", letterSpacing:0.5, transition:"all 0.2s" }}>
                          🔗 Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </Glass>
              </div>
            ))}
          </div>
        </Section>

        {/* ── EXPERIENCE ── */}
        <Section id="experience">
          <SectionHead label="Experience" title="Practical Learning" sub="Where academic knowledge meets real-world application." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:28 }}>
            {EXPERIENCE.map((e, i) => (
              <Glass key={i} style={{ padding:32 }}>
                <div style={{ display:"inline-block", padding:"5px 14px", borderRadius:100, marginBottom:20, background:`${e.color}20`, border:`1px solid ${e.color}40`, color:e.color, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase" }}>{e.type}</div>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:20, color:"#f9fafb", marginBottom:4 }}>{e.role}</h3>
                <p style={{ color:e.color, fontSize:14, fontWeight:600, marginBottom:4 }}>{e.org}</p>
                <p style={{ color:"#6b7280", fontSize:13, marginBottom:16 }}>{e.location}</p>
                <p style={{ color:"#9ca3af", fontSize:14, lineHeight:1.7, marginBottom:20 }}>{e.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {e.skills.map((s, j) => <span key={j} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#d1d5db", fontSize:12, padding:"4px 12px", borderRadius:100, fontWeight:600 }}>{s}</span>)}
                </div>
              </Glass>
            ))}
          </div>
        </Section>

        {/* ── LEADERSHIP ── */}
        <Section id="leadership">
          <SectionHead label="Leadership" title="Impact Beyond the Classroom" sub="Positions held, events led, communities built — ordered by most recent degree." />
          {[
            { label:"MBA · 2025–2027", level:"MBA", grad:"linear-gradient(135deg,#6366f1,#8b5cf6)", line:"rgba(99,102,241,0.3)", bg:"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.1))", border:"rgba(99,102,241,0.2)" },
            { label:"B.Sc · 2022–2025", level:"B.Sc", grad:"linear-gradient(135deg,#7c3aed,#a855f7)", line:"rgba(168,85,247,0.3)", bg:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.1))", border:"rgba(168,85,247,0.2)" },
            { label:"Ongoing", level:"All", grad:"linear-gradient(135deg,#4f46e5,#6366f1)", line:"rgba(79,70,229,0.3)", bg:"linear-gradient(135deg,rgba(79,70,229,0.15),rgba(99,102,241,0.1))", border:"rgba(79,70,229,0.2)" },
          ].map((group, gi) => (
            <div key={gi} style={{ marginBottom:40 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <span style={{ background:group.grad, color:"#fff", fontSize:11, fontWeight:800, letterSpacing:2, padding:"5px 16px", borderRadius:100, textTransform:"uppercase", whiteSpace:"nowrap" }}>{group.label}</span>
                <div style={{ flex:1, height:1, background:`linear-gradient(to right,${group.line},transparent)` }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
                {LEADERSHIP.filter(l => l.level === group.level).map((l, i) => (
                  <LeaderCard key={i} l={l} borderColor={group.border} bgColor={group.bg} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── STARTUPS ── */}
        <Section id="startups">
          <SectionHead label="Entrepreneurship" title="Founded & Building" sub="Two registered companies. Real products. Real ambition." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:28 }}>
            {STARTUPS.map((s, i) => (
              <div key={i} style={{ borderRadius:24, padding:2, background:`linear-gradient(135deg,${s.color1},${s.color2})`, boxShadow:`0 20px 60px ${s.color1}30` }}>
                <div style={{ borderRadius:22, padding:36, background:"linear-gradient(135deg,#0f0f1a,#0a0a0f)", height:"100%" }}>
                  <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:100, marginBottom:24, background:`linear-gradient(135deg,${s.color1}20,${s.color2}20)`, border:`1px solid ${s.color1}40`, color:s.color1, fontSize:11, fontWeight:700, letterSpacing:2 }}>FOUNDED {s.year}</div>
                  <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, background:`linear-gradient(135deg,${s.color1},${s.color2})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4, letterSpacing:-0.5, lineHeight:1.3 }}>{s.name}</h3>
                  <p style={{ color:"#6b7280", fontSize:13, fontWeight:600, letterSpacing:1.5, marginBottom:20, textTransform:"uppercase" }}>{s.suffix}</p>
                  <p style={{ color:"#9ca3af", lineHeight:1.8, fontSize:15, marginBottom:24 }}>{s.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <span style={{ background:`${s.color1}15`, border:`1px solid ${s.color1}30`, color:s.color1, fontSize:12, fontWeight:700, padding:"5px 14px", borderRadius:100 }}>{s.tag}</span>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="company-btn" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"#e5e7eb", fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:100, textDecoration:"none", transition:"all 0.2s" }}>
                        🔗 View Company
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="skills">
          <SectionHead label="Skills" title="Core Competencies" sub="The toolkit I bring to every challenge." />
          <Glass style={{ padding:40 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"0 60px" }}>
              {SKILLS.map((s, i) => <Bar key={i} name={s.name} pct={s.pct} i={i} />)}
            </div>
          </Glass>
        </Section>

        {/* ── CERTIFICATIONS ── */}
        <Section id="certifications">
          <SectionHead label="Certifications" title="Recognised Learning" sub="Credentials that complement the classroom." />
          <div style={{ display:"flex", flexWrap:"wrap", gap:20, justifyContent:"center" }}>
            {CERTS.map((c, i) => (
              <Glass key={i} style={{ padding:"24px 28px", display:"flex", alignItems:"center", gap:16, minWidth:260 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${c.color}20`, border:`1px solid ${c.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color:"#f9fafb", marginBottom:3 }}>{c.name}</p>
                  <p style={{ color:"#6b7280", fontSize:12, fontWeight:600 }}>{c.issuer}</p>
                </div>
                <div style={{ marginLeft:"auto", color:c.color, fontSize:20, fontWeight:800 }}>✓</div>
              </Glass>
            ))}
          </div>
        </Section>

        {/* ── PROJECTS ── */}
        <Section id="projects">
          <SectionHead label="Projects" title="Work & Ideas" sub="Concepts built, brands imagined, strategies crafted." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
            {PROJECTS.map((p, i) => (
              <Glass key={i} style={{ padding:0, overflow:"hidden" }}>
                <div style={{ height:160, background:`linear-gradient(135deg,${p.color}20,${p.color}08)`, display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:56 }}>
                  {["🏷️","📦","📣","📊","🤖"][i]}
                </div>
                <div style={{ padding:24 }}>
                  <span style={{ background:`${p.color}15`, border:`1px solid ${p.color}30`, color:p.color, fontSize:11, fontWeight:700, letterSpacing:2, padding:"3px 10px", borderRadius:100, textTransform:"uppercase" }}>{p.tag}</span>
                  <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:17, color:"#f9fafb", margin:"12px 0 8px" }}>{p.title}</h3>
                  <p style={{ color:"#9ca3af", fontSize:13, lineHeight:1.7 }}>{p.desc}</p>
                </div>
              </Glass>
            ))}
          </div>
        </Section>

        {/* ── BLOG ── */}
        <Section id="blog">
          <SectionHead label="Insights" title="Thoughts & Strategy" sub="Writing at the intersection of business, branding, and startups." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {BLOGS.map((b, i) => (
              <Glass key={i} style={{ padding:28 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                  <span style={{ background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", color:"#6366f1", fontSize:11, fontWeight:700, letterSpacing:2, padding:"3px 10px", borderRadius:100, textTransform:"uppercase" }}>{b.tag}</span>
                  <span style={{ color:"#6b7280", fontSize:12 }}>{b.read} read</span>
                </div>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:17, color:"#f9fafb", marginBottom:12, lineHeight:1.4 }}>{b.title}</h3>
                <p style={{ color:"#9ca3af", fontSize:13, lineHeight:1.7, marginBottom:20 }}>{b.desc}</p>
                <button style={{ background:"none", border:"1px solid rgba(99,102,241,0.3)", color:"#6366f1", fontSize:13, fontWeight:700, padding:"8px 20px", borderRadius:100, cursor:"pointer", transition:"all 0.3s", fontFamily:"'Manrope',sans-serif" }}>Read More →</button>
              </Glass>
            ))}
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact">
          <SectionHead label="Contact" title="Let's Build Together" sub="Open to collaborations, internships, and startup conversations." />
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, maxWidth:900, margin:"0 auto" }}>
            <div>
              <p style={{ color:"#9ca3af", lineHeight:1.8, marginBottom:32, fontSize:15 }}>Whether you're a recruiter, a fellow entrepreneur, or someone with a bold idea — I'd love to hear from you. Let's create something meaningful.</p>
              {[
                { icon:"✉️", label:"Email", val:"jeevapriyan763@gmail.com", href:"mailto:jeevapriyan763@gmail.com" },
                { icon:"📱", label:"Phone", val:"+91 9361404109", href:"tel:+919361404109" },
                { icon:"💼", label:"LinkedIn", val:"Connect on LinkedIn", href:"https://www.linkedin.com/in/jeevapriyan-e" },
                { icon:"📸", label:"Instagram", val:"@jeevapriyan_e", href:"https://instagram.com/jeevapriyan_e" },
                { icon:"💬", label:"WhatsApp", val:"Message on WhatsApp", href:"https://wa.me/919361404109" },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:16, marginBottom:18, textDecoration:"none" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{c.icon}</div>
                  <div>
                    <p style={{ color:"#6b7280", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:2 }}>{c.label}</p>
                    <p style={{ color:"#e5e7eb", fontSize:14, fontWeight:600 }}>{c.val}</p>
                  </div>
                </a>
              ))}
            </div>
            {sent ? (
              <Glass style={{ padding:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🚀</div>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:22, color:"#f9fafb", marginBottom:8 }}>Message Sent!</h3>
                <p style={{ color:"#9ca3af", fontSize:14 }}>I'll get back to you as soon as possible.</p>
              </Glass>
            ) : (
              <Glass style={{ padding:32 }}>
                {[{ ph:"Your Name", key:"name", type:"text" }, { ph:"Your Email", key:"email", type:"email" }].map((f, i) => (
                  <input key={i} type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]:e.target.value }))}
                    style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"#f9fafb", borderRadius:12, padding:"14px 18px", marginBottom:16, fontSize:14, fontFamily:"'Manrope',sans-serif", transition:"border 0.2s" }}
                    onFocus={e => e.target.style.borderColor="rgba(99,102,241,0.5)"}
                    onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"}
                  />
                ))}
                <textarea placeholder="Your Message" rows={5} value={form.msg} onChange={e => setForm(v => ({ ...v, msg:e.target.value }))}
                  style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"#f9fafb", borderRadius:12, padding:"14px 18px", marginBottom:20, fontSize:14, fontFamily:"'Manrope',sans-serif", resize:"vertical", transition:"border 0.2s" }}
                  onFocus={e => e.target.style.borderColor="rgba(99,102,241,0.5)"}
                  onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"}
                />
                <button onClick={() => { if (form.name && form.email && form.msg) setSent(true); }} style={{ width:"100%", padding:"15px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", color:"#fff", fontSize:15, fontWeight:700, borderRadius:12, cursor:"pointer", fontFamily:"'Manrope',sans-serif", boxShadow:"0 8px 30px rgba(99,102,241,0.4)" }}>
                  Send Message ✈️
                </button>
              </Glass>
            )}
          </div>
        </Section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"40px clamp(20px,5vw,80px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20, background:"rgba(255,255,255,0.01)", position:"relative", zIndex:1 }}>
        <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, background:"linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>JE.</span>
        <p style={{ color:"#4b5563", fontSize:13 }}>© 2025 Jeevapriyan Elangovan · <span style={{ color:"#6366f1", fontWeight:700 }}>Building Business Ideas into Brands</span></p>
        <p style={{ color:"#4b5563", fontSize:12 }}>Designed & Built by Jeevapriyan E</p>
      </footer>
    </>
  );
}