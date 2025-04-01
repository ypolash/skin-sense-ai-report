
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AnalysisProcess } from '@/components/AnalysisProcess';
import { PaymentModal } from '@/components/PaymentModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [trialUsed, setTrialUsed] = useState(false);
  const { toast } = useToast();

  const handleAnalysisRequest = () => {
    setShowPaymentModal(true);
  };

  const handleFreeTrial = () => {
    setTrialUsed(true);
    toast({
      title: "Free Trial Activated",
      description: "You can now analyze one image for free",
    });
  };

  const handlePayment = () => {
    toast({
      title: "Payment Demo",
      description: "In a real app, this would redirect to a payment gateway for 10 BDT",
    });
    // In a real app, this would redirect to a payment page
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-[60%] -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-40 left-40 w-60 h-60 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
      
      <Header />
      <main className="flex-1 pt-16 relative z-10">
        <HeroSection />
        
        <div className="py-12 bg-background relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center">Analyze Your Skin Now</h2>
              <p className="text-muted-foreground mb-8 text-center">
                Upload a photo to receive a detailed analysis of your skin condition and personalized recommendations.
              </p>
              
              <AnalysisProcess 
                onAnalysisRequest={handleAnalysisRequest} 
                trialActivated={trialUsed}
              />
              
              <PaymentModal 
                open={showPaymentModal} 
                onOpenChange={setShowPaymentModal}
                onFreeTrial={handleFreeTrial}
                onPay={handlePayment}
              />
            </div>
          </div>
        </div>
        
        <FeatureSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
