import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Plus, Clock, CheckCircle, Image, X } from "lucide-react";

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
  }
];

export default function Feedback() {
  const [feedbackContent, setFeedbackContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Chỉ chấp nhận file hình ảnh",
        description: "Vui lòng chọn các file có định dạng JPG, PNG, GIF...",
        variant: "destructive"
      });
      return;
    }

    setAttachments(prev => [...prev, ...imageFiles].slice(0, 5)); // Limit to 5 files
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackContent.trim()) {
      toast({
        title: "Vui lòng nhập nội dung góp ý",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Gửi góp ý thành công!",
        description: "Cảm ơn bạn đã đóng góp ý kiến. Chúng tôi sẽ xem xét và phản hồi sớm nhất."
      });

      // Reset form
      setFeedbackContent("");
      setUserEmail("");
      setAttachments([]);
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Phản hồi & Góp ý</h1>
        <p className="text-muted-foreground">
          Chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện ứng dụng tốt hơn
        </p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Gửi góp ý mới
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Danh sách góp ý
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Gửi góp ý mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (không bắt buộc)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Để lại email nếu bạn muốn nhận phản hồi từ chúng tôi
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung góp ý *</Label>
                  <Textarea
                    id="content"
                    placeholder="Chia sẻ ý kiến, đề xuất hoặc báo lỗi của bạn..."
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Hình ảnh đính kèm (tối đa 5 file)</Label>
                  <Input
                    id="attachments"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md">
                            <Image className="w-4 h-4" />
                            <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Danh sách góp ý</h2>
              <Badge variant="secondary">
                {mockFeedback.length} góp ý
              </Badge>
            </div>

            {mockFeedback.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có góp ý nào</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockFeedback.map((item) => (
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
                              {item.status === "processed" ? "Đã xử lý" : "Đang xử lý"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(item.submittedAt)}
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
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}