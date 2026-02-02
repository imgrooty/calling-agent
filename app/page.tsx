import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
