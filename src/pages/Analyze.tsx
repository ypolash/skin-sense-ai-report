
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnalysisProcess } from '@/components/AnalysisProcess';

const Analyze = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Skin Analysis</h1>
            <p className="text-muted-foreground mb-8">
              Upload a photo to receive a detailed analysis of your skin condition and personalized recommendations.
            </p>
            
            <AnalysisProcess />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyze;
