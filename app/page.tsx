"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';

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
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    />
  );
}

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
    { q: "Can I monitor the feed from my phone?", a: "Absolutely. Every CyberEye protocol includes encrypted remote access for Android, iOS, and MacOS with zero-latency streaming." },
    { q: "How long is the data stored?", a: "Depending on selection, a 4TB drive typically holds 30 days of footage before overwriting." },
    { q: "Are the cameras weather-resistant?", a: "All CyberEye Optics are IP67-rated, meaning they are completely dust-tight and protected against heavy rain." },
    { q: "Is there a warranty on the installation?", a: "Every installation comes with a 1-year technical support guarantee and a 2-year hardware warranty." }
  ];

  const [specs, setSpecs] = useState({ qty: 4, tech: 'IP / NVR', storage: '2 TB' });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRequestQuote = () => {
    const phoneNumber = "919916649881"; 
    const message = `*CyberEye Configuration Request*%0A------------------------------%0A*Quantity:* ${specs.qty} Units%0A*Protocol:* ${specs.tech}%0A*Hard Drive:* ${specs.storage}%0A------------------------------%0APlease provide the final quote.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <main className="relative w-full bg-white font-sans selection:bg-black selection:text-white">
      
      {/* HERO SECTION - EXACT REPLICA OF ORIGINAL */}
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

        {/* AUTHORIZED DEALER HUD - THE "FABULOUS SPOT" */}
        <div className="absolute top-[22%] w-full flex justify-center z-40 px-4 pointer-events-none">
          <div className="bg-white/40 backdrop-blur-md border border-gray-100 px-6 py-2 flex items-center gap-6 shadow-sm pointer-events-auto">
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-gray-400 italic">Authorized Dealer</span>
            <div className="flex gap-4 text-[10px] font-black italic uppercase text-black">
              <span>CP PLUS</span> <span className="text-red-600">/</span>
              <span>HIKVISION</span> <span className="text-red-600">/</span>
              <span>DAHUA</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 40 }} style={{ touchAction: 'pan-y' }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5} adjustCamera={false}><Model setHovered={setHovered} /></Stage>
            </Suspense>
            <OrbitControls makeDefault enableZoom={false} enablePan={false} autoRotate={!hovered} autoRotateSpeed={2.5} />
          </Canvas>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-24 md:pb-0 pointer-events-none z-10 text-center">
          <h2 className={`text-5xl md:text-[120px] font-black tracking-[-0.07em] uppercase italic leading-[0.8] transition-all duration-700 select-none ${hovered ? 'text-red-600 scale-105 opacity-100' : 'text-black opacity-30'}`}>
            {hovered ? <>SENSORS<br />ACTIVE.</> : <>CYBER<br />EYE.</>}
          </h2>
        </div>
        {hovered && <div className="absolute left-0 w-full h-[1px] bg-red-600 shadow-[0_0_15px_red] z-20 pointer-events-none animate-scan" />}
      </section>

      {/* CONFIGURATOR - ORIGINAL STONE DESIGN */}
      <section className="bg-black text-white py-32 px-10 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 border-b border-white/10 pb-12">
              <p className="text-red-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 italic">Configuration Protocol</p>
              <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic">Spec Selection_</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 block italic">01. Nodes</label>
                <div className="flex gap-4">{[1, 4, 8, 16].map(n => (<button key={n} onClick={() => setSpecs({...specs, qty: n})} className={`flex-1 py-4 border font-black transition-all ${specs.qty === n ? 'bg-red-600 border-red-600' : 'border-white/10'}`}>{n}</button>))}</div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 block italic">02. Protocol</label>
                <div className="flex gap-4">{['HD-Analog', 'IP / NVR'].map(t => (<button key={t} onClick={() => setSpecs({...specs, tech: t})} className={`flex-1 py-4 border text-[10px] font-black transition-all ${specs.tech === t ? 'bg-white text-black' : 'border-white/10'}`}>{t}</button>))}</div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-6"><h4 className="text-2xl font-black uppercase italic">Vault</h4><span className="text-[8px] bg-red-600 px-2 py-1 font-black">ENCRYPTED</span></div>
                <div className="flex justify-between"><span className="text-[10px] font-bold uppercase text-gray-600">Quantity</span><span className="text-sm font-black italic">{specs.qty} Units</span></div>
                <div className="flex justify-between"><span className="text-[10px] font-bold uppercase text-gray-600">Tech</span><span className="text-sm font-black italic">{specs.tech}</span></div>
              </div>
              <button onClick={handleRequestQuote} className="mt-16 w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-red-600 hover:text-white transition-all">Secure Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC CLOSER & FAQ */}
      <section className="bg-white py-32 px-10 border-t border-gray-100 relative z-30">
        <div className="max-w-4xl mx-auto text-center mb-32">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-8">Ready to secure <span className="text-red-600">Your Perimeter?</span></h3>
          <button onClick={handleRequestQuote} className="px-12 py-6 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all">Claim 20% Discount</button>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-center text-3xl font-black uppercase italic mb-12">Intelligence Briefing_</h3>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 bg-white p-8 hover:border-black transition-all">
              <h4 className="text-sm font-black uppercase text-black mb-3">0{i+1}. {faq.q}</h4>
              <p className="text-xs leading-relaxed text-gray-500 font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER STRIP */}
      <footer className="bg-black py-24 px-10 text-center text-white border-t border-gray-900">
        <h4 className="text-5xl font-black italic uppercase mb-8">CyberEye</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>Direct: 72048 49198 / 9916649881</p>
          <p>Bommanahalli, Bangalore - 560068</p>
        </div>
        <p className="mt-12 opacity-20 text-[8px] tracking-[1em]">CyberEye Protocol © 2026</p>
      </footer>

      <style jsx global>{`
        @keyframes scanLine { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scanLine 2s linear infinite; }
      `}</style>
    </main>
  );
}