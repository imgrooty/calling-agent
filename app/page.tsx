import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c1d56] transition-colors duration-300">
      <Navbar />
      <Hero />
      <div className='relative z-10'>
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
