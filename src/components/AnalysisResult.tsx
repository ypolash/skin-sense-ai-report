
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AnalysisResultProps {
  result: {
    skinType: string;
    skinAge: number;
    hydration: number;
    sensitivity: number;
    concerns: {
      name: string;
      emoji?: string;
      severity: number;
      description: string;
    }[];
    recommendations: string[];
  };
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skin Analysis Results</CardTitle>
          <CardDescription>Based on the image you provided</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Skin Type</p>
              <p className="font-semibold text-lg">{result.skinType}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Skin Age</p>
              <p className="font-semibold text-lg">{result.skinAge}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Hydration</p>
              <div className="mt-2">
                <Progress value={result.hydration} className="h-2" />
              </div>
              <p className="mt-1 text-sm">{result.hydration}%</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-lg mb-3">Skin Concerns</h3>
            <div className="space-y-4">
              {result.concerns.map((concern, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-1 items-center">
                    <span className="font-medium flex items-center">
                      {concern.emoji && <span className="mr-2 text-xl">{concern.emoji}</span>}
                      {concern.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {concern.severity < 30 ? 'Mild' : concern.severity < 70 ? 'Moderate' : 'Severe'}
                    </span>
                  </div>
                  <Progress value={concern.severity} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">{concern.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-lg mb-3">Recommendations</h3>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start bg-primary/5 p-3 rounded-lg">
                  <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
