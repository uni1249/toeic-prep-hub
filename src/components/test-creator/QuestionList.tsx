
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Volume2, Image } from 'lucide-react';

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

interface QuestionListProps {
  questions: Question[];
  onRemoveQuestion: (id: string) => void;
}

const QuestionList = ({ questions, onRemoveQuestion }: QuestionListProps) => {
  return (
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
                    onClick={() => onRemoveQuestion(question.id)}
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
  );
};

export default QuestionList;
