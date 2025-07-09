
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, Eye } from 'lucide-react';

interface TestInfoProps {
  testTitle: string;
  setTestTitle: (title: string) => void;
  testDescription: string;
  setTestDescription: (description: string) => void;
  currentPart: string;
  setCurrentPart: (part: string) => void;
  questions: any[];
  onAddQuestion: () => void;
  onSaveTest: () => void;
  onPreviewTest: () => void;
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

const TestInfo = ({
  testTitle,
  setTestTitle,
  testDescription,
  setTestDescription,
  currentPart,
  setCurrentPart,
  questions,
  onAddQuestion,
  onSaveTest,
  onPreviewTest
}: TestInfoProps) => {
  return (
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
        <Button onClick={onAddQuestion} className="w-full">
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
          <Button onClick={onSaveTest} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Lưu đề thi
          </Button>
          <Button variant="outline" onClick={onPreviewTest}>
            <Eye className="h-4 w-4 mr-2" />
            Xem trước
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInfo;
