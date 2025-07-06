import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Clock, Volume2, FileText, Image } from 'lucide-react';

type Question = {
  id: number;
  part: string;
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
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [showResults, setShowResults] = useState(false);

  const selectedParts = searchParams.get('parts')?.split(',') || [];
  const isPartialTest = selectedParts.length > 0;

  // Mock test data with TOEIC parts 1-7
  const allQuestions: Question[] = [
    {
      id: 1,
      part: '1',
      type: 'photograph',
      question: 'Look at the picture and choose the best description.',
      image: '/placeholder.svg',
      audio: true,
      options: [
        'The woman is reading a book',
        'The woman is writing on a board',
        'The woman is making a presentation',
        'The woman is using a computer'
      ],
      correct: 'The woman is making a presentation'
    },
    {
      id: 2,
      part: '2',
      type: 'question-response',
      question: 'You will hear a question followed by three responses. Choose the best response.',
      audio: true,
      options: [
        'At 3 o\'clock',
        'In the conference room',
        'With my colleagues'
      ],
      correct: 'At 3 o\'clock'
    },
    {
      id: 3,
      part: '3',
      type: 'conversation',
      question: 'What is the main topic of the conversation?',
      audio: true,
      options: [
        'Planning a business trip',
        'Scheduling a meeting',
        'Discussing a project deadline',
        'Arranging a lunch appointment'
      ],
      correct: 'Scheduling a meeting'
    },
    {
      id: 4,
      part: '4',
      type: 'talk',
      question: 'What is the speaker announcing?',
      audio: true,
      options: [
        'A company reorganization',
        'New office hours',
        'A product launch',
        'System maintenance'
      ],
      correct: 'System maintenance'
    },
    {
      id: 5,
      part: '5',
      type: 'incomplete-sentence',
      question: 'The meeting has been _______ until next week due to the holiday.',
      options: [
        'postponed',
        'postpone',
        'postponing',
        'to postpone'
      ],
      correct: 'postponed'
    },
    {
      id: 6,
      part: '6',
      type: 'text-completion',
      question: 'Choose the best word or phrase to complete the text.',
      text: 'We are pleased to announce that our company has _______ expanded its operations to include three new locations across the region.',
      options: [
        'successfully',
        'success',
        'successful',
        'succeed'
      ],
      correct: 'successfully'
    },
    {
      id: 7,
      part: '7',
      type: 'reading-comprehension',
      question: 'According to the passage, what is the company\'s main goal?',
      text: 'TechCorp has announced its expansion plans for the next fiscal year. The company aims to increase its market share by 25% through strategic partnerships and innovative product development. The CEO emphasized that customer satisfaction remains their top priority.',
      options: [
        'To hire more employees',
        'To increase market share by 25%',
        'To reduce operational costs',
        'To open new offices'
      ],
      correct: 'To increase market share by 25%'
    }
  ];

  const testData = {
    id: testId,
    title: isPartialTest 
      ? `TOEIC Practice Test - Parts ${selectedParts.join(', ')}` 
      : 'TOEIC Practice Test - Complete',
    questions: isPartialTest 
      ? allQuestions.filter(q => selectedParts.includes(q.part))
      : allQuestions
  };

  // Adjust timer based on selected parts
  useEffect(() => {
    if (isPartialTest) {
      const timePerPart = { '1': 600, '2': 900, '3': 1200, '4': 1200, '5': 1800, '6': 1200, '7': 2400 };
      const totalTime = selectedParts.reduce((sum, part) => sum + (timePerPart[part as keyof typeof timePerPart] || 600), 0);
      setTimeLeft(totalTime);
    } else {
      setTimeLeft(7200); // 2 hours for full test
    }
  }, [isPartialTest, selectedParts]);

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

  const getPartName = (part: string) => {
    const partNames: Record<string, string> = {
      '1': 'Photographs',
      '2': 'Question-Response',
      '3': 'Conversations',
      '4': 'Talks',
      '5': 'Incomplete Sentences',
      '6': 'Text Completion',
      '7': 'Reading Comprehension'
    };
    return partNames[part] || part;
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
            {isPartialTest && (
              <div className="space-y-2">
                <h3 className="font-semibold">Parts Completed:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedParts.map(part => (
                    <Badge key={part} variant="outline">
                      Part {part}: {getPartName(part)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
          <span>Part {currentQ.part}: {getPartName(currentQ.part)}</span>
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
                <span className="text-sm font-medium">Audio Question - Part {currentQ.part}</span>
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
              <div className="flex items-center space-x-2 mb-2">
                <Image className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Part {currentQ.part}: {getPartName(currentQ.part)}</span>
              </div>
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
                <span className="text-sm font-medium">Part {currentQ.part}: {getPartName(currentQ.part)}</span>
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
