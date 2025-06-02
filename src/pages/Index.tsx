
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RefreshCw, Award } from 'lucide-react';

// Mock data for impressionist paintings and their transformations
const paintingPairs = [
  {
    id: 1,
    leftPainting: {
      title: "Water Lilies",
      artist: "Claude Monet",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      transformations: [
        { name: "Brightness +20%", similarity: 0.92, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&brightness=1.2" },
        { name: "Contrast +15%", similarity: 0.87, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&contrast=1.15" },
        { name: "Saturation +10%", similarity: 0.95, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&saturation=1.1" },
        { name: "Gaussian Blur σ=2", similarity: 0.78, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&blur=2" }
      ]
    },
    rightPainting: {
      title: "Starry Night",
      artist: "Vincent van Gogh",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      transformations: [
        { name: "Brightness +20%", similarity: 0.89, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&brightness=1.2" },
        { name: "Contrast +15%", similarity: 0.93, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&contrast=1.15" },
        { name: "Saturation +10%", similarity: 0.91, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&saturation=1.1" },
        { name: "Gaussian Blur σ=2", similarity: 0.82, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&blur=2" }
      ]
    }
  },
  {
    id: 2,
    leftPainting: {
      title: "Impression, Sunrise",
      artist: "Claude Monet",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      transformations: [
        { name: "Brightness +20%", similarity: 0.88, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&brightness=1.2" },
        { name: "Contrast +15%", similarity: 0.94, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&contrast=1.15" },
        { name: "Saturation +10%", similarity: 0.86, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&saturation=1.1" },
        { name: "Gaussian Blur σ=2", similarity: 0.79, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&blur=2" }
      ]
    },
    rightPainting: {
      title: "The Scream",
      artist: "Edvard Munch",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=180",
      transformations: [
        { name: "Brightness +20%", similarity: 0.85, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=180&brightness=1.2" },
        { name: "Contrast +15%", similarity: 0.91, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=180&contrast=1.15" },
        { name: "Saturation +10%", similarity: 0.97, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=180&saturation=1.1" },
        { name: "Gaussian Blur σ=2", similarity: 0.83, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=180&blur=2" }
      ]
    }
  }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'analysis'>('intro');
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showTransformations, setShowTransformations] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentPair = paintingPairs[currentPairIndex];

  const handleStart = () => {
    setCurrentStep('analysis');
    setTimeout(() => setShowTransformations(true), 500);
    setTimeout(() => setShowResults(true), 1500);
  };

  const handleNextPair = () => {
    setShowTransformations(false);
    setShowResults(false);
    setTimeout(() => {
      setCurrentPairIndex((prev) => (prev + 1) % paintingPairs.length);
      setTimeout(() => setShowTransformations(true), 500);
      setTimeout(() => setShowResults(true), 1500);
    }, 300);
  };

  const getHighestSimilarity = (transformations: any[]) => {
    return Math.max(...transformations.map(t => t.similarity));
  };

  const formatSimilarity = (similarity: number) => {
    return (similarity * 100).toFixed(1) + '%';
  };

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gallery-50 to-academic-100 flex items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 animate-scale-in">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-academic-500 to-academic-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white font-serif">VA</span>
            </div>
            <p className="text-gallery-600 font-medium">Visual Analytics Lab</p>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gallery-800 mb-6 leading-tight">
            Compositional Similarity Analysis of
            <span className="text-academic-600 block">Impressionist Painting Transformations</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gallery-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            An automated framework for evaluating visual transformation impacts on compositional similarity 
            in impressionist artworks through advanced computer vision techniques
          </p>

          {/* Start Button */}
          <Button 
            onClick={handleStart}
            size="lg"
            className="bg-academic-600 hover:bg-academic-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Play className="mr-2 h-5 w-5" />
            Begin Analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gallery-50 to-academic-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-serif font-bold text-gallery-800 mb-4">
            Transformation Analysis Results
          </h2>
          <p className="text-gallery-600">
            Pair {currentPairIndex + 1} of {paintingPairs.length} • Compositional Similarity Assessment
          </p>
        </div>

        {/* Paintings Comparison */}
        <div className={`grid md:grid-cols-2 gap-12 mb-12 transition-all duration-1000 ${showTransformations ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Left Painting */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-serif font-bold text-gallery-800">{currentPair.leftPainting.title}</h3>
                <p className="text-gallery-600">{currentPair.leftPainting.artist}</p>
              </div>
              <div className="relative group">
                <img 
                  src={currentPair.leftPainting.image} 
                  alt={currentPair.leftPainting.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              </div>
            </Card>

            {/* Left Transformations */}
            <div className="grid grid-cols-2 gap-4">
              {currentPair.leftPainting.transformations.map((transformation, index) => {
                const isHighest = transformation.similarity === getHighestSimilarity(currentPair.leftPainting.transformations);
                return (
                  <Card 
                    key={index} 
                    className={`p-4 transition-all duration-500 ${
                      showResults 
                        ? isHighest 
                          ? 'animate-highlight border-academic-500 border-2 bg-academic-50' 
                          : 'animate-scale-in' 
                        : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <img 
                      src={transformation.image} 
                      alt={transformation.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <p className="text-sm font-medium text-gallery-700 mb-2">{transformation.name}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={isHighest && showResults ? "default" : "secondary"}
                        className={isHighest && showResults ? "bg-academic-600 text-white" : ""}
                      >
                        {formatSimilarity(transformation.similarity)}
                      </Badge>
                      {isHighest && showResults && (
                        <Award className="h-4 w-4 text-academic-600" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Painting */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-serif font-bold text-gallery-800">{currentPair.rightPainting.title}</h3>
                <p className="text-gallery-600">{currentPair.rightPainting.artist}</p>
              </div>
              <div className="relative group">
                <img 
                  src={currentPair.rightPainting.image} 
                  alt={currentPair.rightPainting.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              </div>
            </Card>

            {/* Right Transformations */}
            <div className="grid grid-cols-2 gap-4">
              {currentPair.rightPainting.transformations.map((transformation, index) => {
                const isHighest = transformation.similarity === getHighestSimilarity(currentPair.rightPainting.transformations);
                return (
                  <Card 
                    key={index} 
                    className={`p-4 transition-all duration-500 ${
                      showResults 
                        ? isHighest 
                          ? 'animate-highlight border-academic-500 border-2 bg-academic-50' 
                          : 'animate-scale-in' 
                        : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <img 
                      src={transformation.image} 
                      alt={transformation.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <p className="text-sm font-medium text-gallery-700 mb-2">{transformation.name}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={isHighest && showResults ? "default" : "secondary"}
                        className={isHighest && showResults ? "bg-academic-600 text-white" : ""}
                      >
                        {formatSimilarity(transformation.similarity)}
                      </Badge>
                      {isHighest && showResults && (
                        <Award className="h-4 w-4 text-academic-600" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary and Controls */}
        {showResults && (
          <div className="text-center animate-fade-in-up">
            <Card className="p-8 max-w-2xl mx-auto mb-8 shadow-lg">
              <h3 className="text-xl font-serif font-bold text-gallery-800 mb-4">Analysis Summary</h3>
              <p className="text-gallery-600 mb-4">
                Highest compositional similarity achieved:
              </p>
              <div className="flex justify-center space-x-8 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gallery-500 mb-1">{currentPair.leftPainting.title}</p>
                  <Badge className="bg-academic-600 text-white text-lg px-3 py-1">
                    {formatSimilarity(getHighestSimilarity(currentPair.leftPainting.transformations))}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gallery-500 mb-1">{currentPair.rightPainting.title}</p>
                  <Badge className="bg-academic-600 text-white text-lg px-3 py-1">
                    {formatSimilarity(getHighestSimilarity(currentPair.rightPainting.transformations))}
                  </Badge>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleNextPair}
              size="lg"
              className="bg-gallery-700 hover:bg-gallery-800 text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Next Painting Pair
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
