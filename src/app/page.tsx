import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-light">
      <Navbar />
      <Hero />
      
      {/* Temporary spacing to see the scrolling effect */}
      <div className="h-[500px] flex items-center justify-center text-gray-400">
        Next Section: Featured Destinations (Coming Soon)
      </div>
    </main>
  );
}
