import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import PracticeAreas from '@/components/sections/PracticeAreas';
import Credentials from '@/components/sections/Credentials';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Booking from '@/components/sections/Booking';
import Contact from '@/components/sections/Contact';
import Ticker from '@/components/ui/Ticker';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import FloatingCall from '@/components/ui/FloatingCall';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <About />
      <PracticeAreas />
      <Credentials />
      <Testimonials />
      <FAQ />
      <Booking />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <FloatingCall />
    </main>
  );
}
