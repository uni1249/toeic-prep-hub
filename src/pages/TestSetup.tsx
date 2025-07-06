
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const TestSetup = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [customTime, setCustomTime] = useState<string>('');
  const [useFullTest, setUseFullTest] = useState(false);

  const parts = [
    { id: 1, name: 'Part 1: Photographs', questions: 6, time: 10 },
    { id: 2, name: 'Part 2: Question-Response', questions: 25, time: 15 },
    { id: 3, name: 'Part 3: Conversations', questions: 39, time: 30 },
    { id: 4, name: 'Part 4: Talks', questions: 30, time: 30 },
    { id: 5, name: 'Part 5: Incomplete Sentences', questions: 30, time: 15 },
    { id: 6, name: 'Part 6: Text Completion', questions: 16, time: 10 },
    { id: 7, name: 'Part 7: Reading Comprehension', questions: 54, time: 30 },
  ];

  const handlePartToggle = (partId: number) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
    setUseFullTest(false);
  };

  const handleFullTestToggle = () => {
    setUseFullTest(!useFullTest);
    if (!useFullTest) {
      setSelectedParts([]);
    }
  };

  const getTotalQuestions = () => {
    if (useFullTest) return 200;
    return selectedParts.reduce((total, partId) => {
      const part = parts.find(p => p.id === partId);
      return total + (part?.questions || 0);
    }, 0);
  };

  const getDefaultTime = () => {
    if (useFullTest) return 120;
    return selectedParts.reduce((total, partId) => {
      const part = parts.find(p => p.id === partId);
      return total + (part?.time || 0);
    }, 0);
  };

  const handleStartTest = () => {
    const timeLimit = customTime ? parseInt(customTime) : getDefaultTime();
    const partsParam = useFullTest ? 'all' : selectedParts.join(',');
    navigate(`/test/${testId}?parts=${partsParam}&time=${timeLimit}`);
  };

  const canStartTest = useFullTest || selectedParts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/practice-tests')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice Tests
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Test Setup</CardTitle>
            <CardDescription>
              Choose your test options. You can select specific parts or take the full test.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Full Test Option */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="full-test"
                  checked={useFullTest}
                  onCheckedChange={handleFullTestToggle}
                />
                <Label htmlFor="full-test" className="text-lg font-semibold">
                  Full Test (200 questions, 120 minutes)
                </Label>
              </div>
            </div>

            {/* Individual Parts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Or Select Individual Parts:</h3>
              <div className="grid gap-3">
                {parts.map((part) => (
                  <div key={part.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={`part-${part.id}`}
                      checked={selectedParts.includes(part.id)}
                      onCheckedChange={() => handlePartToggle(part.id)}
                      disabled={useFullTest}
                    />
                    <Label htmlFor={`part-${part.id}`} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>{part.name}</span>
                        <span className="text-sm text-gray-500">
                          {part.questions} questions • {part.time} min
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Time Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="custom-time">
                  Custom Time Limit (minutes) - Leave empty for default
                </Label>
                <Input
                  id="custom-time"
                  type="number"
                  placeholder={`Default: ${getDefaultTime()} minutes`}
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  min="1"
                  max="300"
                />
              </div>
            </div>

            {/* Test Summary */}
            {canStartTest && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Test Summary:</h4>
                <div className="space-y-1 text-sm">
                  <p>Total Questions: {getTotalQuestions()}</p>
                  <p>Time Limit: {customTime ? `${customTime} minutes (custom)` : `${getDefaultTime()} minutes (default)`}</p>
                  {!useFullTest && selectedParts.length > 0 && (
                    <p>Selected Parts: {selectedParts.join(', ')}</p>
                  )}
                </div>
              </div>
            )}

            {/* Start Button */}
            <Button 
              onClick={handleStartTest}
              disabled={!canStartTest}
              className="w-full"
              size="lg"
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestSetup;
