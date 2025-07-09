
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Upload, Image, Volume2, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const partTypes = {
    '1': { name: 'Photographs', hasAudio: true, hasImage: true, hasText: false },
    '2': { name: 'Question-Response', hasAudio: true, hasImage: false, hasText: false },
    '3': { name: 'Conversations', hasAudio: true, hasImage: false, hasText: false },
    '4': { name: 'Talks', hasAudio: true, hasImage: false, hasText: false },
    '5': { name: 'Incomplete Sentences', hasAudio: false, hasImage: false, hasText: false },
    '6': { name: 'Text Completion', hasAudio: false, hasImage: false, hasText: true },
    '7': { name: 'Reading Comprehension', hasAudio: false, hasImage: true, hasText: true },
  };

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

  const handleFileUpload = (file: File, type: 'audio' | 'image') => {
    if (type === 'audio') {
      setNewQuestion({ ...newQuestion, audio: file });
    } else {
      setNewQuestion({ ...newQuestion, image: file });
    }
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
    toast({
      title: "Thành công",
      description: "Đề thi đã được lưu thành công"
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đề thi</CardTitle>
                <CardDescription>
                  Cấu hình cơ bản cho đề thi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="test-title">Tên đề thi</Label>
                  <Input
                    id="test-title"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="VD: TOEIC Practice Test 1"
                  />
                </div>
                <div>
                  <Label htmlFor="test-description">Mô tả</Label>
                  <Textarea
                    id="test-description"
                    value={testDescription}
                    onChange={(e) => setTestDescription(e.target.value)}
                    placeholder="Mô tả ngắn về đề thi..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Chọn phần để thêm câu hỏi</Label>
                  <Select value={currentPart} onValueChange={setCurrentPart}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(partTypes).map(([part, info]) => (
                        <SelectItem key={part} value={part}>
                          Part {part}: {info.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => {
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
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm câu hỏi Part {currentPart}
                </Button>
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Tổng câu hỏi: {questions.length}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(partTypes).map(([part, info]) => {
                      const count = questions.filter(q => q.part === part).length;
                      return count > 0 ? (
                        <Badge key={part} variant="outline">
                          Part {part}: {count}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveTest} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu đề thi
                  </Button>
                  <Button variant="outline" onClick={handlePreviewTest}>
                    <Eye className="h-4 w-4 mr-2" />
                    Xem trước
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Form */}
          <div className="lg:col-span-2">
            {showQuestionForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    Thêm câu hỏi Part {newQuestion.part}: {partTypes[newQuestion.part as keyof typeof partTypes]?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Audio Upload */}
                  {partTypes[newQuestion.part as keyof typeof partTypes]?.hasAudio && (
                    <div>
                      <Label>Tệp âm thanh</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'audio');
                          }}
                          className="hidden"
                          id="audio-upload"
                        />
                        <Label
                          htmlFor="audio-upload"
                          className="flex items-center space-x-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                        >
                          <Volume2 className="h-5 w-5 text-gray-500" />
                          <span>{newQuestion.audio ? newQuestion.audio.name : 'Chọn tệp âm thanh'}</span>
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Image Upload */}
                  {partTypes[newQuestion.part as keyof typeof partTypes]?.hasImage && (
                    <div>
                      <Label>Hình ảnh</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'image');
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label
                          htmlFor="image-upload"
                          className="flex items-center space-x-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                        >
                          <Image className="h-5 w-5 text-gray-500" />
                          <span>{newQuestion.image ? newQuestion.image.name : 'Chọn hình ảnh'}</span>
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Reading Text */}
                  {partTypes[newQuestion.part as keyof typeof partTypes]?.hasText && (
                    <div>
                      <Label htmlFor="question-text">Đoạn văn/Văn bản</Label>
                      <Textarea
                        id="question-text"
                        value={newQuestion.text || ''}
                        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                        placeholder="Nhập đoạn văn hoặc văn bản..."
                        rows={4}
                      />
                    </div>
                  )}

                  {/* Question */}
                  <div>
                    <Label htmlFor="question">Câu hỏi</Label>
                    <Textarea
                      id="question"
                      value={newQuestion.question || ''}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      placeholder="Nhập câu hỏi..."
                      rows={2}
                    />
                  </div>

                  {/* Options */}
                  <div>
                    <Label>Các lựa chọn</Label>
                    <div className="space-y-2">
                      {newQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm font-medium w-8">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(newQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setNewQuestion({ ...newQuestion, options: newOptions });
                            }}
                            placeholder={`Lựa chọn ${String.fromCharCode(65 + index)}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <Label htmlFor="correct-answer">Đáp án đúng</Label>
                    <Select
                      value={newQuestion.correct || ''}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, correct: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn đáp án đúng" />
                      </SelectTrigger>
                      <SelectContent>
                        {newQuestion.options?.map((option, index) => (
                          option && (
                            <SelectItem key={index} value={option}>
                              {String.fromCharCode(65 + index)}. {option}
                            </SelectItem>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddQuestion}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm câu hỏi
                    </Button>
                    <Button variant="outline" onClick={() => setShowQuestionForm(false)}>
                      Hủy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Questions List */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách câu hỏi ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge>Part {question.part}</Badge>
                            <span className="text-sm text-gray-600">
                              Câu {index + 1}
                            </span>
                            {question.audio && (
                              <Badge variant="outline" className="text-xs">
                                <Volume2 className="h-3 w-3 mr-1" />
                                Audio
                              </Badge>
                            )}
                            {question.image && (
                              <Badge variant="outline" className="text-xs">
                                <Image className="h-3 w-3 mr-1" />
                                Image
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {question.text && (
                          <div className="mb-2 p-2 bg-gray-50 rounded text-sm">
                            <strong>Đoạn văn:</strong> {question.text.substring(0, 100)}...
                          </div>
                        )}
                        
                        <div className="mb-2">
                          <strong>Câu hỏi:</strong> {question.question}
                        </div>
                        
                        <div className="text-sm space-y-1">
                          {question.options.map((option, idx) => (
                            <div key={idx} className={`flex items-center space-x-2 ${
                              option === question.correct ? 'text-green-600 font-medium' : ''
                            }`}>
                              <span>{String.fromCharCode(65 + idx)}.</span>
                              <span>{option}</span>
                              {option === question.correct && (
                                <Badge variant="outline" className="text-xs text-green-600">
                                  Đúng
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCreator;
