import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Image, 
  Edit, 
  Search,
  Filter
} from "lucide-react";

interface FeedbackItem {
  id: number;
  content: string;
  submittedAt: string;
  status: "pending" | "processed";
  adminNote?: string;
  attachments?: string[];
  userEmail?: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: 1,
    content: "Ứng dụng rất hữu ích nhưng tốc độ tải trang hơi chậm. Mong được cải thiện.",
    submittedAt: "2024-01-15T10:30:00",
    status: "processed",
    adminNote: "Đã tối ưu hóa database và CDN. Cảm ơn phản hồi!",
    userEmail: "user@example.com"
  },
  {
    id: 2,
    content: "Giao diện đẹp và dễ sử dụng. Có thể thêm chế độ dark mode không?",
    submittedAt: "2024-01-10T14:20:00",
    status: "pending",
    userEmail: "feedback@test.com"
  },
  {
    id: 3,
    content: "Tính năng flashcard rất hay, nhưng có thể thêm chế độ ôn tập theo khoảng cách không?",
    submittedAt: "2024-01-08T09:15:00",
    status: "pending",
    userEmail: "student@university.edu"
  }
];

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>(mockFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "processed">("all");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProcessFeedback = async (id: number, note: string) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedback(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: "processed" as const, adminNote: note }
          : item
      ));
      
      toast({
        title: "Đã xử lý phản hồi",
        description: "Phản hồi đã được cập nhật thành công."
      });
      
      setSelectedFeedback(null);
      setAdminNote("");
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const pendingCount = feedback.filter(item => item.status === "pending").length;
  const processedCount = feedback.filter(item => item.status === "processed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Quản lý Phản hồi</h1>
        <p className="text-muted-foreground">
          Xem và phản hồi các góp ý từ người dùng
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Tổng phản hồi</p>
                <p className="text-2xl font-bold">{feedback.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Đã xử lý</p>
                <p className="text-2xl font-bold">{processedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm phản hồi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processed">Đã xử lý</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Không tìm thấy phản hồi nào</p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedback.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={item.status === "processed" ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {item.status === "processed" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status === "processed" ? "Đã xử lý" : "Chờ xử lý"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.submittedAt)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFeedback(item);
                          setAdminNote(item.adminNote || "");
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-foreground leading-relaxed">{item.content}</p>
                    {item.userEmail && (
                      <p className="text-sm text-muted-foreground">
                        Từ: {item.userEmail}
                      </p>
                    )}
                  </div>

                  {item.adminNote && (
                    <div className="bg-secondary/50 p-3 rounded-md border-l-4 border-primary">
                      <p className="text-sm font-medium text-primary mb-1">Phản hồi từ Admin:</p>
                      <p className="text-sm">{item.adminNote}</p>
                    </div>
                  )}

                  {item.attachments && item.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Hình ảnh đính kèm:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.attachments.map((attachment, index) => (
                          <img
                            key={index}
                            src={attachment}
                            alt={`Attachment ${index + 1}`}
                            className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                            onClick={() => window.open(attachment, '_blank')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Process Feedback Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xử lý phản hồi</DialogTitle>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nội dung phản hồi:</Label>
                <div className="bg-secondary/50 p-3 rounded-md">
                  <p className="text-sm">{selectedFeedback.content}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-note">Ghi chú/Phản hồi của Admin:</Label>
                <Textarea
                  id="admin-note"
                  placeholder="Nhập phản hồi hoặc ghi chú xử lý..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Hủy
                </Button>
                <Button 
                  onClick={() => handleProcessFeedback(selectedFeedback.id, adminNote)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : "Xử lý phản hồi"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}