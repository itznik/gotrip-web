import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <Hero />
      <Destinations />
    </main>
  );
}
