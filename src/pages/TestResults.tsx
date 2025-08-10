import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, CheckCircle, XCircle, AlertCircle, Home, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface PartDetail {
  partNumber: number;
  partName: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracyPercent: number;
}

interface AnswerDetail {
  questionNumber: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean | null;
  explanation?: string;
  partNumber: number;
}

interface ExamSummary {
  examId: number;
  examName: string;
  examDescription: string;
  totalQuestions: number;
}

interface TestResult {
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  completionTimeMinutes: number;
  submittedAt: string;
  partsDetail: PartDetail[];
  answersDetail: AnswerDetail[];
  examSummary: ExamSummary;
}

export default function TestResults() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    // Mock data based on provided JSON - replace with actual API call
    const mockResult: TestResult = {
      totalScore: 50,
      listeningScore: 50,
      readingScore: 0,
      completionTimeMinutes: 0.13333333333333333,
      submittedAt: "2025-08-10T09:36:06",
      partsDetail: [
        {
          partNumber: 1,
          partName: "Photographs",
          correctAnswers: 1,
          totalQuestions: 6,
          accuracyPercent: 16.67
        }
      ],
      answersDetail: [
        {
          questionNumber: 1,
          userAnswer: "B",
          correctAnswer: "C",
          isCorrect: false,
          explanation: "(A) Cô ấy có một số túi hàng tạp hóa.(B) Cô ấy đang cầm một vài bông hoa.(C) Cô ấy đang với tay nhặt rau.(D) Cô ấy đang rửa trái cây.",
          partNumber: 1
        },
        {
          questionNumber: 2,
          userAnswer: "D",
          correctAnswer: "D",
          isCorrect: true,
          partNumber: 1
        },
        {
          questionNumber: 3,
          userAnswer: "",
          correctAnswer: "B",
          isCorrect: null,
          partNumber: 1
        },
        {
          questionNumber: 4,
          userAnswer: "",
          correctAnswer: "A",
          isCorrect: null,
          partNumber: 1
        },
        {
          questionNumber: 5,
          userAnswer: "",
          correctAnswer: "A",
          isCorrect: null,
          explanation: "(A) Có một số thiết kế tòa nhà trên bàn.(B) Người phụ nữ đang uống một tách cà phê.(C) Người phụ nữ đang viết công thức nấu ăn.(D) Người phụ nữ đang nói chuyện điện thoại.",
          partNumber: 1
        },
        {
          questionNumber: 6,
          userAnswer: "",
          correctAnswer: "D",
          isCorrect: null,
          explanation: "(A) Người đàn ông đang gõ máy tính.(B) Cả hai đều đang nhìn vào máy tính xách tay.(C) Những người đàn ông đang đeo cà vạt.(D) Những người đàn ông đang kiểm tra một số bản thiết kế.",
          partNumber: 1
        }
      ],
      examSummary: {
        examId: 1,
        examName: "New Economy TOEIC Test 6",
        examDescription: "New Economy Toeic",
        totalQuestions: 200
      }
    };
    setResult(mockResult);
  }, [resultId]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes % 1) * 60);
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getAnswerIcon = (isCorrect: boolean | null) => {
    if (isCorrect === true) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (isCorrect === false) return <XCircle className="h-4 w-4 text-red-600" />;
    return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  };

  const getAnswerBadge = (isCorrect: boolean | null) => {
    if (isCorrect === true) return <Badge variant="secondary" className="bg-green-100 text-green-800">Đúng</Badge>;
    if (isCorrect === false) return <Badge variant="destructive">Sai</Badge>;
    return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Chưa trả lời</Badge>;
  };

  if (!result) {
    return <div className="container mx-auto px-4 py-8">Đang tải kết quả...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Kết Quả Bài Thi</h1>
        <p className="text-muted-foreground">{result.examSummary.examName}</p>
      </div>

      {/* Overall Score */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tổng Quan Kết Quả
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{result.totalScore}</div>
              <div className="text-sm text-muted-foreground">Tổng Điểm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{result.listeningScore}</div>
              <div className="text-sm text-muted-foreground">Listening</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{result.readingScore}</div>
              <div className="text-sm text-muted-foreground">Reading</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg font-semibold">{formatTime(result.completionTimeMinutes)}</span>
              </div>
              <div className="text-sm text-muted-foreground">Thời Gian Hoàn Thành</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-sm text-muted-foreground">
            <span>Nộp bài lúc: {formatDate(result.submittedAt)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Parts Detail */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Chi Tiết Theo Phần</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.partsDetail.map((part) => (
              <div key={part.partNumber} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Phần {part.partNumber}: {part.partName}</h3>
                  <Badge variant="outline">
                    {part.correctAnswers}/{part.totalQuestions} câu đúng
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Độ chính xác</span>
                    <span className="font-medium">{part.accuracyPercent.toFixed(2)}%</span>
                  </div>
                  <Progress value={part.accuracyPercent} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Answers Detail */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Chi Tiết Từng Câu Hỏi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.answersDetail.map((answer) => (
              <div key={answer.questionNumber} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Câu {answer.questionNumber}</h4>
                  <div className="flex items-center gap-2">
                    {getAnswerIcon(answer.isCorrect)}
                    {getAnswerBadge(answer.isCorrect)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Câu trả lời của bạn:</span>
                    <div className="font-medium">
                      {answer.userAnswer || <span className="text-muted-foreground italic">Chưa trả lời</span>}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Đáp án đúng:</span>
                    <div className="font-medium text-green-600">{answer.correctAnswer}</div>
                  </div>
                </div>

                {answer.explanation && (
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Giải thích:</div>
                    <div className="text-sm">{answer.explanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate("/")} variant="outline">
          <Home className="h-4 w-4 mr-2" />
          Về Trang Chủ
        </Button>
        <Button onClick={() => navigate("/practice-tests")}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Luyện Thi Tiếp
        </Button>
      </div>
    </div>
  );
}