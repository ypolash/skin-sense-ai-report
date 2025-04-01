
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "SkinAnalyzerPro gave me insights about my skin that I never knew before. The personalized recommendations have made a huge difference!",
      name: "Sarah Johnson",
      title: "Skincare Enthusiast"
    },
    {
      quote: "As a dermatologist, I'm impressed by the accuracy of the analysis. It's a great tool for my patients to monitor their skin health between appointments.",
      name: "Dr. Michael Chen",
      title: "Board Certified Dermatologist"
    },
    {
      quote: "The detailed analysis helped me address my specific skin concerns. My skin has never looked better!",
      name: "Lisa Rodriguez",
      title: "Beauty Blogger"
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied users who have transformed their skincare routine with our AI-powered analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-background">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <p className="italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
