import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    // Changed bg-brand-light to bg-brand-dark
    <main className="min-h-screen bg-brand-dark">
      <Navbar />
      <Hero />
      
      {/* Temporary spacing */}
      <div className="h-[500px] flex items-center justify-center text-gray-400">
        Next Section: Featured Destinations (Coming Soon)
      </div>
    </main>
  );
}
