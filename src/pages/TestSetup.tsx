
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowLeft, Play } from 'lucide-react';

const TestSetup = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [timeMode, setTimeMode] = useState<'standard' | 'custom'>('standard');
  const [customTime, setCustomTime] = useState(120);

  const toeicParts = [
    { id: '1', name: 'Part 1: Photographs', section: 'Listening', questions: 6, time: 10 },
    { id: '2', name: 'Part 2: Question-Response', section: 'Listening', questions: 25, time: 15 },
    { id: '3', name: 'Part 3: Conversations', section: 'Listening', questions: 39, time: 20 },
    { id: '4', name: 'Part 4: Talks', section: 'Listening', questions: 30, time: 20 },
    { id: '5', name: 'Part 5: Incomplete Sentences', section: 'Reading', questions: 30, time: 30 },
    { id: '6', name: 'Part 6: Text Completion', section: 'Reading', questions: 16, time: 20 },
    { id: '7', name: 'Part 7: Reading Comprehension', section: 'Reading', questions: 54, time: 40 },
  ];

  const testData = {
    1: { title: 'TOEIC Practice Test 1', description: 'Complete practice test covering all sections' },
    2: { title: 'TOEIC Practice Test 2', description: 'Intermediate level test with detailed explanations' },
    3: { title: 'TOEIC Practice Test 3', description: 'Advanced test for high achievers' },
    4: { title: 'TOEIC Speaking & Writing Test', description: 'Practice test for speaking and writing sections' },
    5: { title: 'TOEIC Listening Focus Test', description: 'Specialized test focusing on listening comprehension' },
    6: { title: 'TOEIC Reading Focus Test', description: 'Intensive reading comprehension practice' },
  };

  const currentTest = testData[testId as keyof typeof testData];

  const handlePartToggle = (partId: string) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const calculateTotalQuestions = () => {
    if (selectedParts.length === 0) return 200;
    return toeicParts
      .filter(part => selectedParts.includes(part.id))
      .reduce((sum, part) => sum + part.questions, 0);
  };

  const calculateTotalTime = () => {
    if (selectedParts.length === 0) return 120;
    if (timeMode === 'custom') return customTime;
    return toeicParts
      .filter(part => selectedParts.includes(part.id))
      .reduce((sum, part) => sum + part.time, 0);
  };

  const handleStartTest = () => {
    const params = new URLSearchParams();
    if (selectedParts.length > 0) {
      params.set('parts', selectedParts.join(','));
    }
    if (timeMode === 'custom') {
      params.set('time', customTime.toString());
    }
    
    const queryString = params.toString();
    navigate(`/test/${testId}${queryString ? `?${queryString}` : ''}`);
  };

  const selectAllParts = () => {
    setSelectedParts(toeicParts.map(part => part.id));
  };

  const clearAllParts = () => {
    setSelectedParts([]);
  };

  if (!currentTest) {
    return <div>Test not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/practice-tests')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice Tests
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentTest.title}
          </h1>
          <p className="text-gray-600">{currentTest.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Setup */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Test Mode</CardTitle>
                <CardDescription>
                  Select full test or choose specific parts to practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedParts.length === 0 ? 'full' : 'parts'}
                  onValueChange={(value) => {
                    if (value === 'full') {
                      setSelectedParts([]);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="font-medium">
                      Full Test (200 questions, 120 minutes)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parts" id="parts" />
                    <Label htmlFor="parts" className="font-medium">
                      Choose Specific Parts
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Part Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Select Parts</CardTitle>
                    <CardDescription>
                      Choose which parts you want to practice
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={selectAllParts}>
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAllParts}>
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Listening Parts */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Listening Comprehension</h4>
                  <div className="space-y-3">
                    {toeicParts.filter(part => part.section === 'Listening').map((part) => (
                      <div key={part.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`part-${part.id}`}
                            checked={selectedParts.includes(part.id)}
                            onCheckedChange={() => handlePartToggle(part.id)}
                          />
                          <div>
                            <Label htmlFor={`part-${part.id}`} className="font-medium cursor-pointer">
                              {part.name}
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {part.questions} questions
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ~{part.time} min
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reading Parts */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Reading Comprehension</h4>
                  <div className="space-y-3">
                    {toeicParts.filter(part => part.section === 'Reading').map((part) => (
                      <div key={part.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`part-${part.id}`}
                            checked={selectedParts.includes(part.id)}
                            onCheckedChange={() => handlePartToggle(part.id)}
                          />
                          <div>
                            <Label htmlFor={`part-${part.id}`} className="font-medium cursor-pointer">
                              {part.name}
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {part.questions} questions
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ~{part.time} min
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Settings */}
            {selectedParts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Time Settings</CardTitle>
                  <CardDescription>
                    Choose how much time you want for your selected parts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={timeMode} onValueChange={(value) => setTimeMode(value as 'standard' | 'custom')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">
                        Standard Time ({calculateTotalTime()} minutes)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Time</Label>
                    </div>
                  </RadioGroup>
                  
                  {timeMode === 'custom' && (
                    <div className="mt-4">
                      <Label htmlFor="customTime" className="text-sm font-medium">
                        Minutes: {customTime}
                      </Label>
                      <input
                        id="customTime"
                        type="range"
                        min="10"
                        max="180"
                        value={customTime}
                        onChange={(e) => setCustomTime(parseInt(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Test Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-medium">{calculateTotalQuestions()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {calculateTotalTime()} minutes
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Parts:</span>
                    <span className="font-medium">
                      {selectedParts.length === 0 ? 'All (1-7)' : selectedParts.join(', ')}
                    </span>
                  </div>
                </div>

                {selectedParts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Selected Parts:</h4>
                    <div className="space-y-1">
                      {selectedParts.map(partId => {
                        const part = toeicParts.find(p => p.id === partId);
                        return (
                          <div key={partId} className="text-xs text-gray-600">
                            Part {partId}: {part?.name.split(': ')[1]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleStartTest}
                  className="w-full"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSetup;
