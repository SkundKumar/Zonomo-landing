"use client";

import LightRays from "../LightRays/LightRays";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import WrapButton from "@/components/ui/wrap-button";
import { Globe } from "lucide-react";
import CurvedLoop from "../CurvedLoop/CurvedLoop";
import ScrollStack, { ScrollStackItem } from "../ScrollStack/ScrollStack";

export default function Home() {
  const rotatingWords = ["Modernizing", "Transforming", "Revolutionizing"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  const stackPinRef = useRef<HTMLDivElement>(null);
  const stackScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordRef.current) return;
    gsap.fromTo(wordRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const animate = async () => {
      while (isMounted) {
        await new Promise((res) => setTimeout(res, 1000));
        if (!wordRef.current) return;
        await gsap.to(wordRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
        // Change word
        setCurrentWordIdx((idx) => (idx + 1) % rotatingWords.length);
        // Wait for React to render new word
        await new Promise((res) => setTimeout(res, 50));
        if (!wordRef.current) return;
        await gsap.fromTo(wordRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }
    };
    animate();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!stackPinRef.current || !stackScrollRef.current) return;
    const pin = stackPinRef.current;
    const scroller = stackScrollRef.current;
    const scrollHeight = scroller.scrollHeight - scroller.clientHeight;
    gsap.to(scroller, {
      scrollTop: scrollHeight,
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top center",
        end: () => `+=${scrollHeight}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          scroller.scrollTop = progress * scrollHeight;
        }
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border border-white/10">
      {/* Light Rays Background fills the hero section */}
      <div className="absolute inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#b3c6ff"
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={2.8}
          fadeDistance={1.2}
          saturation={1}
          followMouse={true`2234`}
          noiseAmount={0.1}
          distortion={0.03}
          className="custom-rays w-full h-full"
        />
      </div>
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between w-full max-w-3xl mx-auto mt-8 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="font-extrabold text-2xl tracking-tight text-white">Zonomo</div>
        <div className="flex items-center gap-8 font-medium text-white">
          
          <a href="#" className="hover:underline">About us</a>
          <a href="#" className="ml-4 py-2 md:px-5 rounded-full bg-white/80 text-black font-semibold shadow-lg hover:bg-white transition">Get Started</a>
        </div>
      </nav>
      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center mt-30 flex-1 w-full px-4 py-24">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center text-white mb-4 drop-shadow-lg" style={{ position: 'relative', height: '90px' }}>
          <span
            ref={wordRef}
            className="block"
            style={{ minWidth: 220, display: 'inline-block', position: 'relative' }}
          >
            {rotatingWords[currentWordIdx]}
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl font-bold mt-2 relative z-10">
            urban services
          </span>
        </h1>
        <p className="text-lg mt-15 sm:text-xl text-white/90 font-medium text-center mb-40 max-w-2xl">
          Verified professionals | Instant quotes | AI-powered matching.
        </p>
       
        <div className="w-full flex justify-center absolute left-0 right-0 bottom-25">
          <WrapButton className="mt-10" href="/docs/components/card-carousel">
            <Globe className="animate-spin" /> Get started
          </WrapButton>
        </div>
      </main>
      {/* CurvedLoop Filler Section */}
      <section className="w-full flex justify-center items-center py-0 bg-transparent mt-20 mb-10">
        <CurvedLoop marqueeText="Discover the future of urban services • Fast • Reliable • Smart •" speed={2} curveAmount={300} direction="left" />
      </section>
      {/* Scroll Stack Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 md:py-24 gap-6 md:gap-12 bg-transparent">
        {/* Left: Header and Paragraph */}
        <div className="flex-1 max-w-xl px-2 md:px-12 mb-6 md:mb-0">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Zonomo?</h2>
          <p className="text-lg text-white/80">Zonomo brings all your urban needs to one platform. From home repairs to personal care, our AI-powered stack ensures you get the best professionals, instant quotes, and seamless service every time.</p>
        </div>
        {/* Right: ScrollStack with pinning and synced scroll */}
        <div className="flex-1 w-full min-w-xl  md:px-0">
          <div ref={stackPinRef} className="relative">
            <div ref={stackScrollRef} className="h-[500px] md:h-[600px] w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <ScrollStack className="scrollbar-none" itemDistance={180} itemScale={0.01} itemStackDistance={40}>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Verified Professionals</h2>
                    <p className="text-center">Book only trusted, background-checked service providers for your needs.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">On-Demand Scheduling</h2>
                    <p className="text-center">Choose your preferred time and get services when you need them.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Direct Communication</h2>
                    <p className="text-center">Chat directly with providers to clarify requirements and get updates.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Secure Payments</h2>
                    <p className="text-center">Pay safely through the platform with multiple payment options.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Satisfaction Guarantee</h2>
                    <p className="text-center">Enjoy quality assurance and support for every booking you make.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Exclusive Offers</h2>
                    <p className="text-center">Access special deals, discounts, and loyalty rewards as a valued client.</p>
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </div>
      </section>
      {/* Reversed Scroll Stack Section for Service Providers */}
      <section className="w-full flex flex-col md:flex-row-reverse items-center justify-center py-12 md:py-24 gap-6 md:gap-12 bg-transparent">
        {/* Right: Header and Paragraph */}
        <div className="flex-1 max-w-xl px-2 md:px-12 mb-6 md:mb-0">
          <h2 className="text-4xl font-bold mb-4 text-white">What Service Providers Get</h2>
          <p className="text-lg text-white/80">Joining Zonomo comes with exclusive benefits for professionals</p>
        </div>
        {/* Left: ScrollStack with pinning and synced scroll */}
        <div className="flex-1 w-full min-w-xl  md:px-0">
          <div className="relative">
            <div className="h-[500px] md:h-[600px] w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <ScrollStack className="scrollbar-none" itemDistance={180} itemScale={0.01} itemStackDistance={40}>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">No Agency Cuts</h2>
                    <p className="text-center">Work independently and keep what you earn — no middlemen taking commissions.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">More Visibility</h2>
                    <p className="text-center">Get discovered by high-intent users looking for your service in real-time.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Flexible Scheduling</h2>
                    <p className="text-center">Work on your own terms — choose your working hours and availability.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Direct Communication</h2>
                    <p className="text-center">Chat with clients, accept or reject requests, and build long-term relationships.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Growth Support</h2>
                    <p className="text-center">Get access to reviews, ratings, and tools to help grow your reputation.</p>
                  </div>
                </ScrollStackItem>
                <ScrollStackItem>
                  <div className="bg-[#ff4433]/90 backdrop-blur-3xl text-white border border-[#ff4433]/40 rounded-2xl w-full h-60 md:h-72 flex flex-col justify-center items-center p-4 md:p-8 shadow-[0_0_40px_10px_rgba(255,68,51,0.4)]">
                    <h2 className="text-2xl font-semibold mb-2">Fast Payments</h2>
                    <p className="text-center">Receive payments quickly and securely after each job.</p>
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
