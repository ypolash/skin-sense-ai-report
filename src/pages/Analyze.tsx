
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnalysisProcess } from '@/components/AnalysisProcess';
import { PaymentModal } from '@/components/PaymentModal';
import { useToast } from '@/hooks/use-toast';

const Analyze = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Skin Analysis</h1>
            <p className="text-muted-foreground mb-8">
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
      </main>
      <Footer />
    </div>
  );
};

export default Analyze;
