"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import * as THREE from 'three';

// --- Logos ---
const logos = [
    { name: "EMAAR", color: "#1F2937" },
    { name: "DAMAC", color: "#1F2937" },
    { name: "REMAX", color: "#DC2626" },
    { name: "CBRE", color: "#006A4D" },
    { name: "JLL", color: "#E30613" },
    { name: "Keller Williams", color: "#B40101" },
    { name: "Century 21", color: "#BEAF87" },
    { name: "Sothebys", color: "#002349" },
    { name: "Coldwell Banker", color: "#002a5f" },
    { name: "Savills", color: "#CCA400" },
    { name: "Knight Frank", color: "#D6000F" },
    { name: "Colliers", color: "#004F9F" },
    { name: "Betterhomes", color: "#00AEEF" },
    { name: "Allsopp & Allsopp", color: "#1F2937" },
    { name: "Haus & Haus", color: "#1F2937" },
];

const row1 = [...logos.slice(0, 8), ...logos.slice(0, 8), ...logos.slice(0, 8), ...logos.slice(0, 8)];
const row2 = [...logos.slice(8), ...logos.slice(8), ...logos.slice(8), ...logos.slice(8), ...logos.slice(8)];

const reviews = [
    {
        id: 0,
        text: "We tripled our lead qualification speed in just two weeks. Validating international numbers used to be a nightmare, but the AI agent handles it flawlessly. The sentiment analysis also helps us prioritize who to call back immediately.",
        author: "Mohammed Khan",
        role: "Sales Director, Emaar Properties",
        initials: "MK",
        color: "bg-indigo-100 text-[#0b1847]"
    },
    {
        id: 1,
        text: "The autonomous dialing capability is unmatched. We used to spend hours just dialing; now our agents only speak to interested prospects. It's essentially doubled our closing rate in the Australian market.",
        author: "Sarah Jenkins",
        role: "Head of Growth, Ray White",
        initials: "SJ",
        color: "bg-emerald-100 text-[#0b1847]"
    },
    {
        id: 2,
        text: "I was skeptical about AI voice quality, but this is different. It pauses, listens, and actually understands context. Our clients in California don't even realize they're talking to an automated system initially.",
        author: "David Ross",
        role: "Broker Owner, REMAX LA",
        initials: "DR",
        color: "bg-blue-100 text-[#0b1847]"
    },
    {
        id: 3,
        text: "Setup was frictionless. We integrated our HubSpot CRM in minutes and started the first campaign the same afternoon. The dashboard provides exactly the insights we need to tweak our scripts.",
        author: "James Al Maktoum",
        role: "CEO, Luxury Estates Dubai",
        initials: "JA",
        color: "bg-amber-100 text-[#0b1847]"
    }
];

// --- Three.js Wave Background ---
const WaveCanvas = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xf1f5f9, 0.001); // slate-100
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
        camera.position.z = 50;
        camera.position.y = 15;
        camera.lookAt(0, 0, 0);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            scales[i] = Math.random();
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
        const material = new THREE.PointsMaterial({
            color: 0x0b1847, size: 1.5, map: sprite, transparent: true, opacity: 0.2, sizeAttenuation: true, alphaTest: 0.5
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let frameId: number;
        let t = 0;
        const animate = () => {
            t += 0.005;
            const positions = particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                const x = positions[i * 3];
                const z = positions[i * 3 + 2];
                positions[i * 3 + 1] = Math.sin((x * 0.05) + t) * 5 + Math.sin((z * 0.1) + t) * 3;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
            scene.clear();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);
    return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" />;
};

const CarouselRow = ({ items, speed = 1 }: { items: typeof logos, speed?: number }) => {
    const baseX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Determines the visual position. We use % units.
    // We assume 4 repeats. One full set is 25% of the total width.
    // When we reach -25%, we wrap back to 0.
    const x = useTransform(baseX, (v) => `${v}%`);

    useAnimationFrame((t, delta) => {
        if (isHovered || isDragging) return;

        // Move logic
        // Adjust speed factor as needed. Delta is ms since last frame (~16ms).
        const moveBy = -0.002 * speed * delta; // Slow movement

        let newX = baseX.get() + moveBy;

        // Wrap logic: assuming 4 copies, one copy is 25% width.
        // If we slide past -25%, snap back to 0. (Actually simpler to just wrap on modulus)
        // But modulus with negative numbers is tricky in JS.
        // If < -25, add 25.
        if (newX <= -25) {
            newX += 25;
        }

        baseX.set(newX);
    });

    const handleDragEnd = () => {
        setIsDragging(false);
        // On drag end, we need to ensure we are still within a reasonable "loop" range
        // so the animation doesn't drift too far to wrap nicely.
        // But for <25% wrap logic, it matters less as long as we keep decrementing.
        // Let's just normalize the value roughly to be within -50 to 0 for safety?
        // Actually, just let it run. The modulo logic handles the infinite scroll.
        // Wait, if drag pulls it positive, we should handle that.
        let currentX = baseX.get();
        if (currentX > 0) {
            // If dragged right past 0, shift back to 'end' of sequence
            baseX.set(currentX - 25);
        } else if (currentX < -25) {
            // Already handled by loop, but good to be safe
            baseX.set(currentX + 25);
        }
    };

    return (
        <div
            className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-6 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex items-center gap-16 w-max pl-6"
                style={{ x }}
                drag="x"
                // Drag constraints large enough to allow free movement, 
                // but we rely on the wrap logic to keep visual consistency.
                dragConstraints={{ left: -10000, right: 10000 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
            >
                {items.map((logo, i) => (
                    <div key={i} className="flex flex-col items-center justify-center shrink-0 transition-transform hover:scale-105 duration-300">
                        <span
                            className="text-2xl font-black tracking-tighter"
                            style={{
                                color: logo.color,
                                fontFamily: i % 3 === 0 ? 'serif' : 'sans-serif'
                            }}
                        >
                            {logo.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-slate-100 relative overflow-hidden">
            <WaveCanvas />

            {/* --- 2-Row Logos Slider --- */}
            <div className="w-full mb-32 relative z-10 text-center">
                <h3 className="text-4xl md:text-4xl font-semibold text-[#0b1847] mb-12">
                    Our Partner Real Estate Organizations Across the Globe
                </h3>

                {/* Fade Edges matching bg-slate-100 */}
                <div className="absolute left-0 top-12 bottom-0 w-32 bg-gradient-to-r from-slate-100 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-12 bottom-0 w-32 bg-gradient-to-l from-slate-100 to-transparent z-20 pointer-events-none" />

                <div className="space-y-4">
                    <CarouselRow items={row1} speed={1} />
                    <CarouselRow items={row2} speed={0.8} />
                </div>
            </div>

            {/* --- Reviews (Light Glass Card) --- */}
            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-lg md:text-xl font-display font-bold text-[#0b1847] mb-12 uppercase tracking-wider">
                    Our Happy Customers
                </h2>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-12 shadow-2xl shadow-[#0b1847]/5 border border-white/60 text-left h-[320px] md:h-[280px] flex flex-col justify-center">

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Avatar */}
                        <div className="shrink-0">
                            <div className={`w-16 h-16 rounded-full ${reviews[activeIndex].color} flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg`}>
                                {reviews[activeIndex].initials}
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            {/* Stars */}
                            <div className="flex text-amber-400 mb-3 gap-0.5 justify-center md:justify-start">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>

                            {/* Text Area (Fixed height) */}
                            <div className="h-28 overflow-hidden mb-2 relative">
                                <p key={activeIndex} className="text-md md:text-lg font-medium text-slate-700 font-sans">
                                    &quot;{reviews[activeIndex].text}&quot;
                                </p>
                            </div>

                            <div className="border-t border-slate-200/60 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                                <div>
                                    <div className="font-bold text-[#0b1847] text-lg">{reviews[activeIndex].author}</div>
                                    <div className="text-slate-500 text-sm font-medium">{reviews[activeIndex].role}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-2 rounded-full transition-all duration-200 ${i === activeIndex
                                ? 'w-8 bg-[#0b1847]'
                                : 'w-2 bg-[#0b1847]/20 hover:bg-[#0b1847]/40'
                                }`}
                            aria-label={`View review ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
