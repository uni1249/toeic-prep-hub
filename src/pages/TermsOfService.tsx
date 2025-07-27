import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang chủ
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Điều Khoản Dịch Vụ</h1>
        <p className="text-gray-600">Cập nhật lần cuối: Tháng 12, 2024</p>
      </div>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Chấp Nhận Điều Khoản</h2>
          <p className="text-gray-700 mb-4">
            Bằng việc truy cập và sử dụng website TOEIC Master, bạn đồng ý tuân theo và bị ràng buộc bởi 
            các điều khoản và điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các 
            điều khoản này, bạn không được phép sử dụng dịch vụ của chúng tôi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Mô Tả Dịch Vụ</h2>
          <p className="text-gray-700 mb-4">
            TOEIC Master cung cấp các dịch vụ học tập và luyện thi TOEIC trực tuyến, bao gồm:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Đề thi thử TOEIC với nhiều mức độ khó khác nhau</li>
            <li>Ngân hàng câu hỏi phong phú và đa dạng</li>
            <li>Hệ thống flashcard để học từ vựng</li>
            <li>Theo dõi tiến độ học tập cá nhân</li>
            <li>Blog và tài liệu học tập</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Đăng Ký Tài Khoản</h2>
          <p className="text-gray-700 mb-4">
            Để sử dụng đầy đủ các tính năng của TOEIC Master, bạn cần tạo tài khoản. Bạn cam kết:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
            <li>Bảo mật thông tin đăng nhập của mình</li>
            <li>Chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của bạn</li>
            <li>Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái phép tài khoản</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Quyền và Nghĩa Vụ Của Người Dùng</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-3">Quyền của người dùng:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Truy cập và sử dụng các dịch vụ theo gói đã đăng ký</li>
              <li>Được hỗ trợ kỹ thuật và tư vấn học tập</li>
              <li>Được bảo mật thông tin cá nhân theo chính sách riêng tư</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Nghĩa vụ của người dùng:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Không được sao chép, phân phối, hoặc sử dụng nội dung cho mục đích thương mại</li>
              <li>Không được can thiệp vào hoạt động bình thường của hệ thống</li>
              <li>Tuân thủ các quy tắc và hướng dẫn sử dụng</li>
              <li>Thanh toán đầy đủ và đúng hạn các khoản phí (nếu có)</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Sở Hữu Trí Tuệ</h2>
          <p className="text-gray-700 mb-4">
            Tất cả nội dung trên TOEIC Master, bao gồm văn bản, hình ảnh, âm thanh, video, và phần mềm, 
            đều thuộc quyền sở hữu của chúng tôi hoặc các đối tác được cấp phép. Bạn không được sao chép, 
            chỉnh sửa, phân phối, hoặc sử dụng cho mục đích thương mại mà không có sự cho phép bằng văn bản.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Chính Sách Thanh Toán và Hoàn Tiền</h2>
          <p className="text-gray-700 mb-4">
            Các gói dịch vụ trả phí sẽ được tính theo thời gian sử dụng. Chúng tôi có chính sách hoàn tiền 
            trong vòng 7 ngày kể từ ngày thanh toán nếu bạn không hài lòng với dịch vụ, với điều kiện 
            chưa sử dụng quá 20% nội dung của gói dịch vụ.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Giới Hạn Trách Nhiệm</h2>
          <p className="text-gray-700 mb-4">
            TOEIC Master không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, 
            hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Chấm Dứt Dịch Vụ</h2>
          <p className="text-gray-700 mb-4">
            Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản của bạn nếu phát hiện vi phạm các 
            điều khoản sử dụng. Bạn cũng có thể hủy tài khoản bất kỳ lúc nào bằng cách liên hệ với 
            bộ phận hỗ trợ.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Thay Đổi Điều Khoản</h2>
          <p className="text-gray-700 mb-4">
            Chúng tôi có quyền cập nhật và thay đổi các điều khoản này bất kỳ lúc nào. Các thay đổi 
            sẽ có hiệu lực ngay khi được đăng tải trên website. Việc tiếp tục sử dụng dịch vụ sau 
            khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Thông Tin Liên Hệ</h2>
          <p className="text-gray-700 mb-4">
            Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Email: support@toeicmaster.com</li>
            <li>Điện thoại: +84 (028) 1234 5678</li>
            <li>Địa chỉ: 123 Đường Giáo Dục, Quận 1, TP.HCM</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;