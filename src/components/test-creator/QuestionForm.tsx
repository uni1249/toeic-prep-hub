
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Volume2, Image } from 'lucide-react';

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

interface QuestionFormProps {
  newQuestion: Partial<Question>;
  setNewQuestion: (question: Partial<Question>) => void;
  onAddQuestion: () => void;
  onCancel: () => void;
}

const partTypes = {
  '1': { name: 'Photographs', hasAudio: true, hasImage: true, hasText: false },
  '2': { name: 'Question-Response', hasAudio: true, hasImage: false, hasText: false },
  '3': { name: 'Conversations', hasAudio: true, hasImage: false, hasText: false },
  '4': { name: 'Talks', hasAudio: true, hasImage: false, hasText: false },
  '5': { name: 'Incomplete Sentences', hasAudio: false, hasImage: false, hasText: false },
  '6': { name: 'Text Completion', hasAudio: false, hasImage: false, hasText: true },
  '7': { name: 'Reading Comprehension', hasAudio: false, hasImage: true, hasText: true },
};

const QuestionForm = ({ newQuestion, setNewQuestion, onAddQuestion, onCancel }: QuestionFormProps) => {
  const handleFileUpload = (file: File, type: 'audio' | 'image') => {
    if (type === 'audio') {
      setNewQuestion({ ...newQuestion, audio: file });
    } else {
      setNewQuestion({ ...newQuestion, image: file });
    }
  };

  const currentPartInfo = partTypes[newQuestion.part as keyof typeof partTypes];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          Thêm câu hỏi Part {newQuestion.part}: {currentPartInfo?.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Audio Upload */}
        {currentPartInfo?.hasAudio && (
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
        {currentPartInfo?.hasImage && (
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
        {currentPartInfo?.hasText && (
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
          <Button onClick={onAddQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm câu hỏi
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Hủy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
