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

    const x = useTransform(baseX, (v) => `${v}%`);

    useAnimationFrame((t, delta) => {
        if (isHovered || isDragging) return;
        const moveBy = -0.002 * speed * delta;
        let newX = baseX.get() + moveBy;
        if (newX <= -25) {
            newX += 25;
        }
        baseX.set(newX);
    });

    const handleDragEnd = () => {
        setIsDragging(false);
        let currentX = baseX.get();
        if (currentX > 0) {
            baseX.set(currentX - 25);
        } else if (currentX < -25) {
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
                dragConstraints={{ left: -10000, right: 10000 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
            >
                {items.map((logo, i) => (
                    <motion.div 
                        key={i} 
                        className="flex flex-col items-center justify-center shrink-0 transition-transform hover:scale-105 duration-300"
                        whileHover={{ y: -5 }}
                    >
                        <span
                            className="text-2xl font-black tracking-tighter text-white/40 hover:text-white/70 transition-colors"
                            style={{
                                fontFamily: i % 3 === 0 ? 'serif' : 'sans-serif'
                            }}
                        >
                            {logo.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.05),transparent_50%)]" />
            
            {/* --- 2-Row Logos Slider --- */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full mb-32 relative z-10 text-center"
            >
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
                    Trusted by <span className="text-gradient-ai">Leading Organizations</span> Worldwide
                </h3>

                {/* Fade Edges matching dark theme */}
                <div className="absolute left-0 top-12 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-12 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-20 pointer-events-none" />

                <div className="space-y-4">
                    <CarouselRow items={row1} speed={1} />
                    <CarouselRow items={row2} speed={0.8} />
                </div>
            </motion.div>

            {/* --- Reviews (Dark Glass Card) --- */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto px-6 relative z-10 text-center"
            >
                <h2 className="text-lg md:text-xl font-display font-bold text-white mb-12 uppercase tracking-wider">
                    Our Happy Customers
                </h2>

                <motion.div 
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative glass rounded-[2.5rem] p-12 shadow-2xl shadow-[#6366f1]/10 border border-white/10 text-left min-h-[320px] md:min-h-[280px] flex flex-col justify-center"
                >
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Avatar */}
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="shrink-0"
                        >
                            <div className={`w-16 h-16 rounded-full ${reviews[activeIndex].color} flex items-center justify-center text-xl font-bold border-4 border-[#6366f1]/20 shadow-lg shadow-[#6366f1]/20`}>
                                {reviews[activeIndex].initials}
                            </div>
                        </motion.div>

                        <div className="flex-1 w-full">
                            {/* Stars */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex text-[#00d9ff] mb-3 gap-0.5 justify-center md:justify-start"
                            >
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </motion.div>

                            {/* Text Area */}
                            <div className="overflow-hidden mb-4">
                                <p className="text-md md:text-lg font-medium text-gray-300 font-sans leading-relaxed">
                                    &quot;{reviews[activeIndex].text}&quot;
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                                <div>
                                    <div className="font-bold text-white text-lg">{reviews[activeIndex].author}</div>
                                    <div className="text-gray-400 text-sm font-medium">{reviews[activeIndex].role}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {reviews.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex
                                ? 'w-8 bg-gradient-to-r from-[#6366f1] to-[#00d9ff]'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`View review ${i + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;
