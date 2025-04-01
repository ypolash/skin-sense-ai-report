
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About SkinAnalyzerPro</h1>
            
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground">
                    SkinAnalyzerPro is dedicated to democratizing access to professional-level skin analysis. 
                    We believe everyone deserves personalized skincare recommendations based on their unique 
                    skin profile, without expensive consultations or trial and error.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
                  <p className="text-muted-foreground mb-6">
                    Powered by the advanced SkinGPT-4 AI model, our platform analyzes images with exceptional 
                    accuracy to identify various skin conditions, types, and concerns. The technology was 
                    developed by analyzing thousands of dermatological images and has been validated by 
                    skincare professionals.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-3">Key Features:</h3>
                  <ul className="space-y-3">
                    {[
                      "Multi-factor skin type assessment",
                      "Detection of common skin concerns",
                      "Age estimation based on skin appearance",
                      "Hydration level analysis",
                      "Personalized treatment recommendations"
                    ].map((feature, index) => (
                      <li key={index} className="flex">
                        <CheckCircle size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">How To Use</h2>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Take a clear photo of your skin</p>
                        <p className="text-muted-foreground text-sm">
                          Use natural lighting and avoid filters. Remove makeup for best results.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Upload your photo</p>
                        <p className="text-muted-foreground text-sm">
                          Use our simple upload tool on the "Analyze" page.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Review your analysis</p>
                        <p className="text-muted-foreground text-sm">
                          Receive a comprehensive breakdown of your skin's condition and recommendations.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
                  <p className="text-muted-foreground mb-4">
                    While our AI provides valuable insights, it's not a replacement for professional medical advice. 
                    For serious skin concerns, we recommend consulting with a dermatologist.
                  </p>
                  <p className="text-muted-foreground">
                    Your privacy is important to us. All uploaded images are processed securely and are not shared with third parties.
                    Images are automatically deleted after analysis is complete.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
