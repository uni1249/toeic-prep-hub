
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, Volume2, BookOpen, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock test data
  const testData = {
    id: testId,
    title: 'TOEIC Practice Test 1',
    totalQuestions: 20, // Reduced for demo
    sections: [
      {
        name: 'Listening',
        questions: 10,
        current: currentQuestion < 10,
      },
      {
        name: 'Reading', 
        questions: 10,
        current: currentQuestion >= 10,
      },
    ],
    questions: [
      // Listening questions (0-9)
      {
        id: 1,
        section: 'Listening',
        type: 'Photo Description',
        question: 'Look at the picture and choose the best description.',
        image: '/placeholder.svg',
        audio: true,
        options: [
          'The woman is reading a book in the library.',
          'The woman is typing on a computer.',
          'The woman is writing with a pen.',
          'The woman is talking on the phone.',
        ],
        correct: 'B',
      },
      // Add more listening questions...
      ...Array.from({ length: 9 }, (_, i) => ({
        id: i + 2,
        section: 'Listening',
        type: 'Question-Response',
        question: `Listen to the question and choose the best response. (Question ${i + 2})`,
        audio: true,
        options: [
          'Option A for question ' + (i + 2),
          'Option B for question ' + (i + 2), 
          'Option C for question ' + (i + 2),
        ],
        correct: 'A',
      })),
      // Reading questions (10-19)
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        section: 'Reading',
        type: 'Text Completion',
        question: `Choose the word or phrase that best completes the sentence. (Question ${i + 11})`,
        text: `The company's quarterly report shows a significant _____ in sales compared to last year.`,
        options: [
          'increase',
          'increasing',
          'increased',
          'to increase',
        ],
        correct: 'A',
      })),
    ],
  };

  const currentQuestionData = testData.questions[currentQuestion];

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(testData.totalQuestions).fill(''));
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testData.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Calculate score (mock)
    const score = Math.floor(Math.random() * 200) + 700; // Random score between 700-900
    navigate('/progress', { 
      state: { 
        testCompleted: true, 
        score: score,
        testId: testId,
        testTitle: testData.title 
      } 
    });
  };

  const progress = ((currentQuestion + 1) / testData.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Test Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{testData.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {testData.totalQuestions}
                </Badge>
                <Badge className={currentQuestionData.section === 'Listening' ? 'bg-blue-500' : 'bg-green-500'}>
                  {currentQuestionData.section}
                </Badge>
                <span className="text-sm text-gray-600">{currentQuestionData.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-lg font-mono">
                <Clock className="h-5 w-5 text-red-500" />
                <span className={timeRemaining < 300 ? 'text-red-500' : 'text-gray-900'}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button 
                onClick={handleSubmit}
                variant="destructive"
                disabled={isSubmitted}
              >
                Submit Test
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">
              Progress: {Math.round(progress)}% complete
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    Question {currentQuestion + 1}
                  </CardTitle>
                  {currentQuestionData.audio && (
                    <Button variant="outline" size="sm">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Play Audio
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Image */}
                {currentQuestionData.image && (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Test Image Placeholder</span>
                  </div>
                )}

                {/* Question Text */}
                <div>
                  <p className="text-lg font-medium mb-4">{currentQuestionData.question}</p>
                  {currentQuestionData.text && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800">{currentQuestionData.text}</p>
                    </div>
                  )}
                </div>

                {/* Answer Options */}
                <RadioGroup 
                  value={selectedAnswer} 
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestionData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                      <RadioGroupItem 
                        value={String.fromCharCode(65 + index)} 
                        id={`option-${index}`} 
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-base"
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button 
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={currentQuestion === testData.totalQuestions - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {testData.sections.map((section, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${
                      section.current ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {section.name === 'Listening' ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                      <span className="font-medium">{section.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {section.questions} questions
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: testData.totalQuestions }, (_, index) => (
                    <Button
                      key={index}
                      variant={currentQuestion === index ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 ${
                        answers[index] 
                          ? 'bg-green-100 border-green-300' 
                          : currentQuestion === index 
                          ? '' 
                          : 'bg-gray-50'
                      }`}
                      onClick={() => {
                        setCurrentQuestion(index);
                        setSelectedAnswer(answers[index] || '');
                      }}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded"></div>
                    <span>Not answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            {timeRemaining < 300 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Less than 5 minutes remaining! Make sure to submit your test.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
