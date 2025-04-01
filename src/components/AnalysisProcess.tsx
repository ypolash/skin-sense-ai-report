
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/button';
import { Upload, Check, Loader2 } from 'lucide-react';
import { AnalysisResult } from './AnalysisResult';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo purposes
const mockAnalysisResult = {
  skinType: "Combination",
  skinAge: 32,
  hydration: 65,
  sensitivity: 40,
  concerns: [
    {
      name: "Fine Lines",
      severity: 45,
      description: "Moderate fine lines visible around the eyes and forehead."
    },
    {
      name: "Hyperpigmentation",
      severity: 30,
      description: "Mild uneven skin tone and sun spots."
    },
    {
      name: "Dehydration",
      severity: 35,
      description: "Slightly dehydrated skin with minor tightness."
    }
  ],
  recommendations: [
    "Use a gentle cleanser with hyaluronic acid for added hydration.",
    "Apply vitamin C serum in the morning to address hyperpigmentation.",
    "Include retinol in your evening routine to improve fine lines and skin texture.",
    "Use a broad-spectrum SPF 30+ sunscreen daily to prevent further sun damage.",
    "Consider monthly exfoliation to remove dead skin cells and improve product absorption."
  ]
};

export const AnalysisProcess = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = (image: File) => {
    setSelectedImage(image);
    setAnalysisComplete(false);
  };

  const startAnalysis = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Your skin analysis is ready to view",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Upload Your Image</h2>
            <p className="text-muted-foreground">
              For best results, use a well-lit, front-facing photo without makeup or filters.
            </p>
            <ImageUploader onImageSelected={handleImageSelected} />
            <div className="flex justify-end mt-4">
              <Button 
                onClick={startAnalysis}
                disabled={!selectedImage || isAnalyzing}
                className="bg-primary hover:bg-primary/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : analysisComplete ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Analysis Complete
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisComplete && (
        <AnalysisResult result={mockAnalysisResult} />
      )}

      {isAnalyzing && (
        <Card className="p-6 text-center">
          <div className="py-12 flex flex-col items-center">
            <div className="mb-4">
              <div className="inline-block p-3 rounded-full bg-primary/10">
                <Loader2 size={36} className="text-primary animate-spin" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Analyzing Your Skin</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is examining your image to identify skin type, concerns, and generate personalized recommendations.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
