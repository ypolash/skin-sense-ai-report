
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeatureSection />
        <TestimonialsSection />
        
        <div className="bg-primary/5 py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Skin's Needs?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get personalized skincare recommendations based on advanced AI analysis. It only takes a minute!
            </p>
            <Link to="/analyze">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Start Your Skin Analysis
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
