import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Blogs from '@/components/Blogs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    // EXPLICIT STYLING:
    // 1. bg-[#FDFBF7]: Forces Cream color in Light Mode
    // 2. dark:bg-[#0B1120]: Forces Deep Ocean in Dark Mode
    // 3. overflow-x-hidden: Kills the mobile white bar issue
    <main className="min-h-screen w-full bg-[#FDFBF7] dark:bg-[#0B1120] transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Destinations />
      <Blogs />
      <Testimonials />
      <Footer />
    </main>
  );
}
