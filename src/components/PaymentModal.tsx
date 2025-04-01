
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFreeTrial: () => void;
  onPay: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onOpenChange,
  onFreeTrial,
  onPay,
}) => {
  const { toast } = useToast();

  const handleFreeTrial = () => {
    toast({
      title: "Free Trial Activated",
      description: "You can analyze 1 image for free",
    });
    onFreeTrial();
    onOpenChange(false);
  };

  const handlePayment = () => {
    toast({
      title: "Redirecting to Payment",
      description: "Please complete your payment to continue",
    });
    onPay();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Skin Analysis</DialogTitle>
          <DialogDescription>
            Choose an option to continue with your skin analysis
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="relative overflow-hidden rounded-lg border p-6 bg-gradient-to-b from-blue-50 to-blue-100 shadow-sm">
            <div className="absolute -top-6 -right-6 bg-primary/10 w-20 h-20 rounded-full blur-xl"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-lg">Free Trial</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Try our skin analysis once for free. Perfect for first-time users.
            </p>
            
            <Button 
              onClick={handleFreeTrial} 
              variant="outline" 
              className="w-full"
            >
              Start Free Trial
            </Button>
          </div>
          
          <div className="relative overflow-hidden rounded-lg border p-6 bg-gradient-to-b from-primary/5 to-primary/10 shadow-sm">
            <div className="absolute -bottom-6 -left-6 bg-accent/20 w-20 h-20 rounded-full blur-xl"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg">Premium Analysis</h3>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <span className="text-xl font-medium text-muted-foreground line-through">100 BDT</span>
                <div className="absolute -top-3 right-0 transform translate-x-full bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  90% OFF
                </div>
              </div>
              <span className="text-2xl font-bold ml-3 text-primary">10 BDT</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Get detailed skin analysis and personalized recommendations.
            </p>
            
            <Button 
              onClick={handlePayment} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Pay & Analyze
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
