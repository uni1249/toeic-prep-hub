
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FlipHorizontal } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

const FlashcardStudy = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  
  const [flashcards] = useState<Flashcard[]>([
    {
      id: 1,
      front: 'Budget',
      back: 'A plan for spending money over a specific period'
    },
    {
      id: 2,
      front: 'Revenue',
      back: 'The total amount of income generated by a business'
    },
    {
      id: 3,
      front: 'Profit',
      back: 'The money that remains after all business expenses have been paid'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/flashcards/${setId}`)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Set
            </Button>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No flashcards to study in this set.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/flashcards/${setId}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Set
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Study Flashcards
          </h1>
          <p className="text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Card 
              className={`cursor-pointer transition-all duration-500 transform-gpu min-h-[300px] ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <CardContent className="flex items-center justify-center p-8 min-h-[300px]">
                <div 
                  className={`text-center ${isFlipped ? 'rotate-y-180' : ''}`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className={`${isFlipped ? 'hidden' : 'block'}`}>
                    <div className="text-xs text-gray-500 mb-4">FRONT</div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {currentCard.front}
                    </div>
                  </div>
                  <div className={`${isFlipped ? 'block' : 'hidden'}`}>
                    <div className="text-xs text-gray-500 mb-4">BACK</div>
                    <div className="text-lg text-gray-700 leading-relaxed">
                      {currentCard.back}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Button onClick={handleFlip} className="flex items-center gap-2">
            <FlipHorizontal className="h-4 w-4" />
            Flip Card
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {flashcards.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            variant="outline"
          >
            Next
          </Button>
        </div>

        {currentIndex === flashcards.length - 1 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">You've reached the end of this set!</p>
            <Button onClick={() => setCurrentIndex(0)}>
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardStudy;
