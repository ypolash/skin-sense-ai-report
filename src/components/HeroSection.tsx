
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-skin-50 to-skin-100 opacity-50"></div>
      <div className="relative container mx-auto px-4 sm:px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">AI-Powered</span> Skin Analysis for Personalized Care
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Upload a photo and receive detailed analysis of your skin condition, with personalized recommendations tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/analyze">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                  Analyze My Skin
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Skin analysis demonstration" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
