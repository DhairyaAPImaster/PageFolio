import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TemplatesPreview } from '@/components/landing/TemplatesPreview';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <div id="templates-section">
        <TemplatesPreview />
      </div>
      <div id="pricing-section">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
