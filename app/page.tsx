"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';

// --- 1. 3D MODEL COMPONENT (PRECISION SCALED) ---
function Model({ setHovered }: { setHovered: (hovered: boolean) => void }) {
  const { scene } = useGLTF('/camera.glb');
  const [scale, setScale] = useState(1.1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { setScale(0.7); } 
      else { setScale(1.1); }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={[0, -0.4, 0]} 
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    />
  );
}

// --- 2. MAIN PAGE ---
export default function CyberEyeMaster() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(new Date());

  const reviews = [
    { name: "Dr. Aris V.", role: "Lead Architect", text: "The optics on the 8MP units are surgical. CyberEye provided a complete perimeter intelligence solution." },
    { name: "K. Malhotra", role: "Logistics Director", text: "Implemented the IP/NVR protocol across our warehouse. The storage management is highly efficient." },
    { name: "Sarah J.", role: "Estate Owner", text: "Aesthetics mattered to me as much as security. The night vision clarity is honestly startling." },
    { name: "Maj. R. Singh", role: "Security Consultant", text: "CyberEye’s 'Always Watching' protocol is the first one that actually delivers on its promise." },
    { name: "Vikram E.", role: "Retail Chain Founder", text: "The configuration process was seamless. I didn't pay for bloat I didn't need." }
  ];

  const faqs = [
    { q: "Does the system work during power outages?", a: "Yes. When paired with our CyberEye Power-Vault UPS, the system maintains full recording capabilities for up to 4 hours." },
    { q: "Can I monitor the feed from my phone?", a: "Absolutely. Every CyberEye protocol includes encrypted remote access for Android, iOS, and MacOS." },
    { q: "How long is the data stored?", a: "Depending on selection, a 4TB drive typically holds 30 days of 24/7 high-definition footage before overwriting." },
    { q: "Are the cameras weather-resistant?", a: "All CyberEye Optics are IP67-rated, meaning they are completely dust-tight and protected against rain." },
    { q: "Is there a warranty on the installation?", a: "Every installation comes with a 2-year hardware replacement warranty as per company standards." }
  ];

  const [specs, setSpecs] = useState({ qty: 4, tech: 'IP / NVR', storage: '2 TB' });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRequestQuote = () => {
    const phoneNumber = "917204849998"; 
    const message = `*CyberEye Configuration Request*%0A` +
                    `------------------------------%0A` +
                    `*Quantity:* ${specs.qty} Units%0A` +
                    `*Protocol:* ${specs.tech}%0A` +
                    `*Hard Drive:* ${specs.storage}%0A` +
                    `------------------------------%0A` +
                    `Please provide the final quote for this system.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <main className="relative w-full bg-white font-sans selection:bg-black selection:text-white">
      
      {/* SECTION A: HERO 3D */}
      <section className="relative w-full h-[85vh] md:h-screen overflow-hidden border-b border-gray-100 bg-white">
        <nav className="absolute top-0 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center md:items-start z-40 gap-4 md:gap-0">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-black text-2xl tracking-tighter uppercase italic leading-none text-black">CyberEye</h1>
            <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-red-600">Security Systems</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-black font-mono text-[9px] tracking-[0.2em] uppercase font-bold">REC ● LIVE</span>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-black font-mono text-[10px] tracking-widest uppercase font-bold">{time.toLocaleTimeString()}</div>
            <div className="text-red-600 font-mono text-[8px] tracking-widest uppercase">SYSTEM: ONLINE</div>
          </div>
        </nav>

        {/* AUTHORIZED DEALER BAR */}
        <div className="absolute top-[20%] w-full flex justify-center z-40 px-4">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-3 flex items-center gap-6 shadow-sm">
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic">Authorized Dealer</span>
            <div className="flex gap-4 text-[10px] font-black italic uppercase text-black">
              <span>CP PLUS</span>
              <span className="text-red-600">/</span>
              <span>HIKVISION</span>
              <span className="text-red-600">/</span>
              <span>DAHUA</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 mt-[-5vh] md:mt-0">
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 40 }} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5} adjustCamera={false}><Model setHovered={setHovered} /></Stage>
            </Suspense>
            <OrbitControls makeDefault enableZoom={false} autoRotate={!hovered} autoRotateSpeed={2.5} />
          </Canvas>
        </div>

        <div className="absolute bottom-[35%] md:bottom-[45%] w-full text-center z-20 pointer-events-none">
          <p className="text-[7px] md:text-[9px] font-mono text-red-600 uppercase tracking-[0.5em] opacity-80 animate-pulse">UPLINK SECURED // PACKETS: 1024kbps // ENCRYPTION: AES-256</p>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-24 md:pb-0 pointer-events-none z-10 text-center">
          <h2 className={`text-5xl md:text-[120px] font-black tracking-[-0.07em] uppercase italic leading-[0.8] transition-all duration-700 select-none ${hovered ? 'text-red-600 scale-105 opacity-100' : 'text-black opacity-30'}`}>
            {hovered ? <>SENSORS<br />ACTIVE.</> : <>CYBER<br />EYE.</>}
          </h2>
        </div>

        {hovered && <div className="absolute left-0 w-full h-[1px] bg-red-600 shadow-[0_0_15px_red] z-20 pointer-events-none animate-scan" />}
      </section>

      {/* SECTION B: SPEC SELECTOR */}
      <section className="bg-black text-white py-32 px-10 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 border-b border-white/10 pb-12">
              <p className="text-red-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 italic">Security Protocol</p>
              <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic">Spec Selection_</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 block italic">01. Camera Quantity</label>
                <div className="flex gap-4">
                  {[1, 4, 8, 16].map(n => (<button key={n} onClick={() => setSpecs({...specs, qty: n})} className={`flex-1 py-4 border font-black transition-all ${specs.qty === n ? 'bg-red-600 border-red-600' : 'border-white/10 hover:border-white'}`}>{n}</button>))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 block italic">02. Transmission Protocol</label>
                <div className="flex gap-4">
                  {['HD-Analog', 'IP / NVR'].map(t => (<button key={t} onClick={() => setSpecs({...specs, tech: t})} className={`flex-1 py-4 border text-[10px] font-black transition-all ${specs.tech === t ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white'}`}>{t}</button>))}
                </div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">System Vault</h4>
                  <span className="text-[8px] bg-red-600 px-2 py-1 font-black">ENCRYPTED</span>
                </div>
                <div className="space-y-8">
                  <div className="flex justify-between items-end"><span className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Nodes</span><span className="text-sm font-black italic text-white">{specs.qty} Units</span></div>
                  <div className="flex justify-between items-end"><span className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Protocol</span><span className="text-sm font-black italic text-white">{specs.tech}</span></div>
                  <div className="flex justify-between items-end"><span className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Warranty</span><span className="text-sm font-black italic text-red-600">2 YEARS</span></div>
                </div>
              </div>
              <button onClick={handleRequestQuote} className="mt-16 w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl">Request PRICE (WhatsApp)</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: CONTACT STRIP (UPDATED FROM CARD) */}
      <section className="bg-white border-t border-gray-100 py-16 px-10 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex items-center gap-5">
              <div className="text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Lines</p><p className="text-sm font-black text-black italic leading-none">72048 49998 / 79757 45063</p></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">HQ Address</p><p className="text-[11px] font-bold text-black leading-tight">Bommanahalli, Bangalore<br/>560 068</p></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Intelligence</p><p className="text-sm font-black text-black italic leading-none">hello@CyberEye.online</p></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg></div>
              <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Operating Hours</p><p className="text-sm font-black text-black italic leading-none">Mon-Sat: 9am – 7pm</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-24 px-10 text-center border-t border-gray-900">
        <h4 className="text-white font-black text-5xl italic tracking-tighter uppercase mb-6 leading-none">CyberEye<br />Uncompromised.</h4>
        <div className="w-24 h-[1px] bg-red-600 mx-auto mb-8"></div>
        <p className="text-white font-mono text-[9px] tracking-[1.2em] uppercase opacity-40">CyberEye Protocol © 2026</p>
      </footer>

      <style jsx global>{`
        @keyframes scanLine { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scanLine 2s linear infinite; }
      `}</style>
    </main>
  );
}