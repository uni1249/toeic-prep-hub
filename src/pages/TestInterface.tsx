
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Clock, Volume2, FileText } from 'lucide-react';

type Question = {
  id: number;
  section: string;
  type: string;
  question: string;
  options: string[];
  correct: string;
  audio?: boolean;
  image?: string;
  text?: string;
};

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [showResults, setShowResults] = useState(false);

  // Mock test data
  const testData = {
    id: testId,
    title: 'TOEIC Practice Test - Intermediate',
    questions: [
      {
        id: 1,
        section: 'Listening',
        type: 'audio',
        question: 'What is the main topic of the conversation?',
        audio: true,
        options: [
          'A business meeting',
          'A job interview',
          'A phone call about scheduling',
          'A restaurant reservation'
        ],
        correct: 'A phone call about scheduling'
      },
      {
        id: 2,
        section: 'Reading',
        type: 'comprehension',
        question: 'According to the passage, what is the company\'s main goal?',
        text: 'TechCorp has announced its expansion plans for the next fiscal year. The company aims to increase its market share by 25% through strategic partnerships and innovative product development. The CEO emphasized that customer satisfaction remains their top priority.',
        options: [
          'To hire more employees',
          'To increase market share by 25%',
          'To reduce operational costs',
          'To open new offices'
        ],
        correct: 'To increase market share by 25%'
      },
      {
        id: 3,
        section: 'Reading',
        type: 'grammar',
        question: 'Choose the best option to complete the sentence: "The meeting has been _______ until next week."',
        options: [
          'postponed',
          'postpone',
          'postponing',
          'to postpone'
        ],
        correct: 'postponed'
      },
      {
        id: 4,
        section: 'Listening',
        type: 'image',
        question: 'What is the person in the image most likely doing?',
        image: '/placeholder.svg',
        options: [
          'Making a presentation',
          'Attending a meeting',
          'Working on a computer',
          'Having lunch'
        ],
        correct: 'Making a presentation'
      }
    ] as Question[]
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [testData.questions[currentQuestion].id]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    setShowResults(true);
    // Here you would typically send results to backend
  };

  const calculateScore = () => {
    let correct = 0;
    testData.questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / testData.questions.length) * 100);
  };

  const currentQ = testData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
              <p className="text-gray-600">
                You answered {testData.questions.filter(q => answers[q.id] === q.correct).length} out of {testData.questions.length} questions correctly
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Section Breakdown:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Listening: 85%</div>
                <div>Reading: 78%</div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/practice-tests')}>
                More Tests
              </Button>
              <Button variant="outline" onClick={() => navigate('/progress')}>
                View Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{testData.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <Button variant="outline" onClick={handleSubmitTest}>
            Submit Test
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {testData.questions.length}</span>
          <span>{currentQ.section}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Audio player for listening questions */}
          {currentQ.audio && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Volume2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Audio Question</span>
              </div>
              <audio controls className="w-full">
                <source src="/audio/sample.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Image for image-based questions */}
          {currentQ.image && (
            <div className="mb-4">
              <img 
                src={currentQ.image} 
                alt="Question image" 
                className="max-w-full h-64 object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          {/* Reading passage */}
          {currentQ.text && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Reading Passage</span>
              </div>
              <p className="text-sm leading-relaxed">{currentQ.text}</p>
            </div>
          )}

          {/* Question */}
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>

          {/* Options */}
          <RadioGroup
            value={answers[currentQ.id] || ''}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNextQuestion}
          disabled={currentQuestion === testData.questions.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TestInterface;
