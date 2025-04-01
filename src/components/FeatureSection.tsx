
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Image, FileText, Clock } from 'lucide-react';

export const FeatureSection = () => {
  const features = [
    {
      icon: <Image className="text-primary" />,
      title: "Easy Image Upload",
      description: "Simply upload a photo of your skin from your phone or computer for instant analysis."
    },
    {
      icon: <FileText className="text-primary" />,
      title: "Detailed Analysis",
      description: "Get comprehensive insights about your skin type, concerns, and condition."
    },
    {
      icon: <CheckCircle className="text-primary" />,
      title: "Personalized Recommendations",
      description: "Receive tailored skincare recommendations based on your unique skin profile."
    },
    {
      icon: <Clock className="text-primary" />,
      title: "Instant Results",
      description: "Get your analysis report in seconds - no waiting or complicated processes."
    }
  ];

  return (
    <div className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How SkinAnalyzerPro Works</h2>
          <p className="text-muted-foreground">
            Our advanced AI technology analyzes your skin with precision to provide you with valuable insights and personalized care recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
