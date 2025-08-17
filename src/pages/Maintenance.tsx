import { Wrench, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Maintenance() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Wrench className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hệ thống đang bảo trì
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn cho bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Thời gian dự kiến</h3>
                <p className="text-gray-600">2-4 giờ</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Liên hệ hỗ trợ</h3>
                <p className="text-gray-600">support@example.com</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Những gì chúng tôi đang cải thiện:
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Tối ưu hóa hiệu suất hệ thống</li>
              <li>• Cập nhật tính năng mới</li>
              <li>• Tăng cường bảo mật</li>
              <li>• Sửa lỗi và cải thiện trải nghiệm người dùng</li>
            </ul>
          </div>

          <Button 
            onClick={refreshPage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Thử lại
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Cảm ơn bạn đã kiên nhẫn chờ đợi. Chúng tôi sẽ quay lại sớm nhất có thể!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}