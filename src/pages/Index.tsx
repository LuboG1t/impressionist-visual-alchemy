
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    },
    rightPainting: {
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    },
    transformations: [
      { 
        name: "Mapa de Calor", 
        similarity: 0.92, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=30",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&hue=30"
      },
      { 
        name: "Tono", 
        similarity: 0.87, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=60",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&hue=60"
      },
      { 
        name: "Saturación", 
        similarity: 0.95, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&saturation=1.3",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&saturation=1.3"
      },
      { 
        name: "Brillo", 
        similarity: 0.78, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&brightness=1.3",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&brightness=1.3"
      },
      { 
        name: "Contraste", 
        similarity: 0.89, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&contrast=1.4",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&contrast=1.4"
      },
      { 
        name: "Textura", 
        similarity: 0.83, 
        leftImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&blur=1",
        rightImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop&blur=1"
      }
    ]
  },
  {
    id: 2,
    leftPainting: {
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop",
    },
    rightPainting: {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=180",
    },
    transformations: [
      { 
        name: "Mapa de Calor", 
        similarity: 0.88, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&hue=30",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&hue=30"
      },
      { 
        name: "Tono", 
        similarity: 0.94, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&hue=60",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&hue=60"
      },
      { 
        name: "Saturación", 
        similarity: 0.86, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&saturation=1.3",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&saturation=1.3"
      },
      { 
        name: "Brillo", 
        similarity: 0.79, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&brightness=1.3",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&brightness=1.3"
      },
      { 
        name: "Contraste", 
        similarity: 0.91, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&contrast=1.4",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&contrast=1.4"
      },
      { 
        name: "Textura", 
        similarity: 0.97, 
        leftImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&h=200&fit=crop&blur=1",
        rightImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&hue=180&blur=1"
      }
    ]
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

  const getHighestTransformation = (transformations: any[]) => {
    return transformations.find(t => t.similarity === getHighestSimilarity(transformations));
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
            <p className="text-gallery-600 font-medium">Laboratorio de Análisis Visual</p>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gallery-800 mb-6 leading-tight">
            Análisis de Similitud Composicional de
            <span className="text-academic-600 block">Transformaciones de Pinturas Impresionistas</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gallery-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Un marco automatizado para evaluar los impactos de las transformaciones visuales en la similitud 
            composicional en obras de arte impresionistas a través de técnicas avanzadas de visión por computadora
          </p>

          {/* Start Button */}
          <Button 
            onClick={handleStart}
            size="lg"
            className="bg-academic-600 hover:bg-academic-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Play className="mr-2 h-5 w-5" />
            Comenzar Análisis
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
            Resultados del Análisis de Transformaciones
          </h2>
          <p className="text-gallery-600">
            Par {currentPairIndex + 1} de {paintingPairs.length} • Evaluación de Similitud Composicional
          </p>
        </div>

        {/* Main Images */}
        <div className={`grid md:grid-cols-2 gap-12 mb-12 transition-all duration-1000 ${showTransformations ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Left Main Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src={currentPair.leftPainting.image} 
                alt="Pintura izquierda"
                className="w-80 h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
            </div>
          </div>

          {/* Right Main Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src={currentPair.rightPainting.image} 
                alt="Pintura derecha"
                className="w-80 h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Transformations Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${showTransformations ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {currentPair.transformations.map((transformation, index) => {
            const isHighest = transformation.similarity === getHighestSimilarity(currentPair.transformations);
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
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <img 
                    src={transformation.leftImage} 
                    alt={`${transformation.name} izquierda`}
                    className="w-full h-20 object-cover rounded"
                  />
                  <img 
                    src={transformation.rightImage} 
                    alt={`${transformation.name} derecha`}
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
                <p className="text-sm font-medium text-gallery-700 mb-2 text-center">{transformation.name}</p>
                <div className="flex justify-center">
                  <Badge 
                    variant={isHighest && showResults ? "default" : "secondary"}
                    className={isHighest && showResults ? "bg-academic-600 text-white" : ""}
                  >
                    {formatSimilarity(transformation.similarity)}
                  </Badge>
                  {isHighest && showResults && (
                    <Award className="h-4 w-4 text-academic-600 ml-2" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary and Controls */}
        {showResults && (
          <div className="text-center animate-fade-in-up">
            <Card className="p-8 max-w-2xl mx-auto mb-8 shadow-lg">
              <h3 className="text-xl font-serif font-bold text-gallery-800 mb-4">Resumen del Análisis</h3>
              <p className="text-gallery-600 mb-4">
                Mayor similitud composicional obtenida:
              </p>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-lg font-medium text-gallery-700">
                  {getHighestTransformation(currentPair.transformations)?.name}
                </span>
                <Badge className="bg-academic-600 text-white text-lg px-3 py-1">
                  {formatSimilarity(getHighestSimilarity(currentPair.transformations))}
                </Badge>
              </div>
            </Card>

            <Button 
              onClick={handleNextPair}
              size="lg"
              className="bg-gallery-700 hover:bg-gallery-800 text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Siguiente Par de Pinturas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
