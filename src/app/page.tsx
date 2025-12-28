import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Blogs from '@/components/Blogs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <Hero />
      <Destinations />
      <Blogs />
      <Testimonials />
      <Footer />
    </main>
  );
}
