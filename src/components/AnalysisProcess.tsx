import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/button';
import { Upload, Check, Loader2 } from 'lucide-react';
import { AnalysisResult } from './AnalysisResult';
import { useToast } from '@/hooks/use-toast';
import { analyzeSkinImage } from '@/services/apiService';

// Skin types
const skinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];

// Skin concerns
const skinConcerns = [
  {
    name: "Fine Lines",
    emoji: "👵",
    descriptionTemplates: [
      "Mild fine lines visible around the eyes and forehead.",
      "Moderate lines appearing around eyes and between brows.",
      "Noticeable fine lines across the face, especially when smiling."
    ]
  },
  {
    name: "Hyperpigmentation",
    emoji: "🟤",
    descriptionTemplates: [
      "Mild uneven skin tone and sun spots.",
      "Moderate dark spots and discoloration patches.",
      "Significant areas of darkened skin and post-inflammatory marks."
    ]
  },
  {
    name: "Dehydration",
    emoji: "💧",
    descriptionTemplates: [
      "Slightly dehydrated skin with minor tightness.",
      "Moderately dehydrated with visible dryness patterns.",
      "Severely dehydrated skin showing flakiness and discomfort."
    ]
  },
  {
    name: "Acne",
    emoji: "🔴",
    descriptionTemplates: [
      "Occasional breakouts, mostly around T-zone.",
      "Regular acne occurrences with some inflammation.",
      "Persistent inflammatory acne across multiple areas."
    ]
  },
  {
    name: "Redness",
    emoji: "🔺",
    descriptionTemplates: [
      "Mild facial redness, mostly after product use.",
      "Moderate redness across cheeks and nose.",
      "Significant redness with visible broken capillaries."
    ]
  }
];

// Recommendation templates
const recommendationTemplates = [
  "Use a gentle cleanser with {ingredient} for added {benefit}.",
  "Apply {ingredient} serum in the morning to address {concern}.",
  "Include {ingredient} in your evening routine to improve {concern}.",
  "Use a broad-spectrum SPF 30+ sunscreen daily to prevent further {concern}.",
  "Consider monthly exfoliation with {ingredient} to remove dead skin cells.",
  "Try incorporating a {ingredient} mask weekly to boost {benefit}.",
  "Stay hydrated and consider a humidifier to improve skin {benefit}.",
  "Avoid harsh products containing alcohol that can worsen {concern}."
];

// Ingredients and benefits to fill templates
const ingredients = ["hyaluronic acid", "vitamin C", "retinol", "niacinamide", "salicylic acid", "glycolic acid", "ceramides", "peptides"];
const benefits = ["hydration", "brightness", "texture", "skin barrier", "cell turnover", "collagen production"];
const concerns = ["sun damage", "dehydration", "hyperpigmentation", "fine lines", "acne", "sensitivity"];

interface AnalysisProcessProps {
  onAnalysisRequest: () => void;
  trialActivated?: boolean;
}

export const AnalysisProcess: React.FC<AnalysisProcessProps> = ({ 
  onAnalysisRequest,
  trialActivated = false 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageSelected = (image: File) => {
    setSelectedImage(image);
    setAnalysisComplete(false);
  };

  const startAnalysis = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }

    if (!trialActivated) {
      onAnalysisRequest();
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // If we're in a real environment with the backend set up
      if (process.env.NODE_ENV === 'production') {
        // Call the API service to analyze the image
        const result = await analyzeSkinImage(selectedImage);
        setAnalysisResult(result);
      } else {
        // For development/demo: simulate API call with a timeout
        setTimeout(() => {
          // Generate dynamic analysis result
          const result = generateRandomAnalysisResult();
          setAnalysisResult(result);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          toast({
            title: "Analysis Complete",
            description: "Your skin analysis is ready to view",
          });
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }
  };

  // Generate random but realistic analysis result
  const generateRandomAnalysisResult = () => {
    // Random skin age between 20 and 45
    const skinAge = Math.floor(Math.random() * 25) + 20;
    
    // Random hydration between 40 and 80
    const hydration = Math.floor(Math.random() * 40) + 40;
    
    // Random sensitivity between 20 and 60
    const sensitivity = Math.floor(Math.random() * 40) + 20;
    
    // Random skin type
    const skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
    
    // Random set of 2-4 concerns
    const concernCount = Math.floor(Math.random() * 3) + 2;
    const shuffledConcerns = [...skinConcerns].sort(() => 0.5 - Math.random());
    const selectedConcerns = shuffledConcerns.slice(0, concernCount);
    
    const concerns = selectedConcerns.map(concern => {
      // Random severity between 20 and 80
      const severity = Math.floor(Math.random() * 60) + 20;
      // Pick a random description template
      const descriptionIndex = Math.floor(Math.random() * concern.descriptionTemplates.length);
      
      return {
        name: concern.name,
        emoji: concern.emoji,
        severity: severity,
        description: concern.descriptionTemplates[descriptionIndex]
      };
    });
    
    // Generate 3-6 randomized recommendations
    const recommendationCount = Math.floor(Math.random() * 4) + 3;
    const recommendations = [];
    
    for (let i = 0; i < recommendationCount; i++) {
      // Pick random template
      const template = recommendationTemplates[Math.floor(Math.random() * recommendationTemplates.length)];
      
      // Fill in with random values
      const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
      const benefit = benefits[Math.floor(Math.random() * benefits.length)];
      const concern = concerns[Math.floor(Math.random() * concerns.length)];
      
      let recommendation = template
        .replace("{ingredient}", ingredient)
        .replace("{benefit}", benefit);
      
      // Sometimes template has {concern} placeholder
      if (recommendation.includes("{concern}")) {
        const concernText = concerns[i % concerns.length].name.toLowerCase();
        recommendation = recommendation.replace("{concern}", concernText);
      }
      
      recommendations.push(recommendation);
    }
    
    return {
      skinType,
      skinAge,
      hydration,
      sensitivity,
      concerns,
      recommendations
    };
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

      {analysisComplete && analysisResult && (
        <AnalysisResult result={analysisResult} />
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
