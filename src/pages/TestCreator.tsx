
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TestInfo from '@/components/test-creator/TestInfo';
import QuestionForm from '@/components/test-creator/QuestionForm';
import QuestionList from '@/components/test-creator/QuestionList';

type Question = {
  id: string;
  part: string;
  type: string;
  question: string;
  options: string[];
  correct: string;
  audio?: File | null;
  image?: File | null;
  text?: string;
};

const TestCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testTitle, setTestTitle] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPart, setCurrentPart] = useState('1');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [testSaved, setTestSaved] = useState(false);

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    part: '1',
    type: 'photograph',
    question: '',
    options: ['', '', '', ''],
    correct: '',
    audio: null,
    image: null,
    text: ''
  });

  const getQuestionType = (part: string) => {
    const types: Record<string, string> = {
      '1': 'photograph',
      '2': 'question-response',
      '3': 'conversation',
      '4': 'talk',
      '5': 'incomplete-sentence',
      '6': 'text-completion',
      '7': 'reading-comprehension'
    };
    return types[part] || 'photograph';
  };

  const handleAddQuestionClick = () => {
    setNewQuestion({
      part: currentPart,
      type: getQuestionType(currentPart),
      question: '',
      options: ['', '', '', ''],
      correct: '',
      audio: null,
      image: null,
      text: ''
    });
    setShowQuestionForm(true);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.correct) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập câu hỏi và đáp án đúng",
        variant: "destructive"
      });
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      part: newQuestion.part || '1',
      type: newQuestion.type || 'photograph',
      question: newQuestion.question || '',
      options: newQuestion.options || ['', '', '', ''],
      correct: newQuestion.correct || '',
      audio: newQuestion.audio || null,
      image: newQuestion.image || null,
      text: newQuestion.text || ''
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      part: currentPart,
      type: getQuestionType(currentPart),
      question: '',
      options: ['', '', '', ''],
      correct: '',
      audio: null,
      image: null,
      text: ''
    });
    setShowQuestionForm(false);
    
    toast({
      title: "Thành công",
      description: "Đã thêm câu hỏi mới"
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Đã xóa",
      description: "Câu hỏi đã được xóa"
    });
  };

  const handleSaveTest = () => {
    if (!testTitle || questions.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên đề thi và thêm ít nhất một câu hỏi",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving
    console.log('Saving test:', { testTitle, testDescription, questions });
    setTestSaved(true);
    toast({
      title: "Thành công",
      description: "Đề thi đã được lưu thành công. Bây giờ bạn có thể tiếp tục thêm câu hỏi!"
    });
  };

  const handlePreviewTest = () => {
    if (questions.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng thêm ít nhất một câu hỏi để xem trước",
        variant: "destructive"
      });
      return;
    }

    // Navigate to preview
    navigate('/test-preview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Admin
          </Button>
          
          {testSaved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800">
                ✅ Đề thi "{testTitle}" đã được lưu thành công! Bạn có thể tiếp tục thêm câu hỏi.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Info */}
          <div className="lg:col-span-1">
            <TestInfo
              testTitle={testTitle}
              setTestTitle={setTestTitle}
              testDescription={testDescription}
              setTestDescription={setTestDescription}
              currentPart={currentPart}
              setCurrentPart={setCurrentPart}
              questions={questions}
              onAddQuestion={handleAddQuestionClick}
              onSaveTest={handleSaveTest}
              onPreviewTest={handlePreviewTest}
            />
          </div>

          {/* Question Form and List */}
          <div className="lg:col-span-2">
            {showQuestionForm && (
              <QuestionForm
                newQuestion={newQuestion}
                setNewQuestion={setNewQuestion}
                onAddQuestion={handleAddQuestion}
                onCancel={() => setShowQuestionForm(false)}
              />
            )}

            <QuestionList
              questions={questions}
              onRemoveQuestion={handleRemoveQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCreator;
