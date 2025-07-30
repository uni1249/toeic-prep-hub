import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Clock, Users, Star } from 'lucide-react';

const TestCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 1,
      name: 'TOEIC Listening & Reading',
      description: 'Bài thi TOEIC chuẩn với 2 phần nghe và đọc hiểu',
      testCount: 25,
      totalQuestions: 200,
      duration: '120 phút',
      difficulty: 'Tất cả cấp độ',
      participants: 15420,
      rating: 4.8,
      icon: '🎧',
      color: 'bg-blue-50 border-blue-200',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'TOEIC Speaking & Writing',
      description: 'Bài thi TOEIC phần nói và viết',
      testCount: 12,
      totalQuestions: 19,
      duration: '80 phút',
      difficulty: 'Trung cấp - Cao cấp',
      participants: 8750,
      rating: 4.6,
      icon: '🗣️',
      color: 'bg-green-50 border-green-200',
      badgeColor: 'bg-green-500',
    },
    {
      id: 3,
      name: 'TOEIC Listening Only',
      description: 'Chuyên luyện tập kỹ năng nghe hiểu',
      testCount: 18,
      totalQuestions: 100,
      duration: '45 phút',
      difficulty: 'Cơ bản - Trung cấp',
      participants: 12300,
      rating: 4.7,
      icon: '👂',
      color: 'bg-purple-50 border-purple-200',
      badgeColor: 'bg-purple-500',
    },
    {
      id: 4,
      name: 'TOEIC Reading Only',
      description: 'Tập trung luyện tập kỹ năng đọc hiểu',
      testCount: 20,
      totalQuestions: 100,
      duration: '75 phút',
      difficulty: 'Trung cấp - Cao cấp',
      participants: 10900,
      rating: 4.5,
      icon: '📖',
      color: 'bg-orange-50 border-orange-200',
      badgeColor: 'bg-orange-500',
    },
    {
      id: 5,
      name: 'TOEIC Part Practice',
      description: 'Luyện tập từng phần riêng biệt (Part 1-7)',
      testCount: 35,
      totalQuestions: 'Đa dạng',
      duration: '15-30 phút',
      difficulty: 'Tất cả cấp độ',
      participants: 18650,
      rating: 4.9,
      icon: '🎯',
      color: 'bg-red-50 border-red-200',
      badgeColor: 'bg-red-500',
    },
    {
      id: 6,
      name: 'TOEIC Vocabulary',
      description: 'Bài kiểm tra từ vựng TOEIC theo chủ đề',
      testCount: 28,
      totalQuestions: 50,
      duration: '20 phút',
      difficulty: 'Cơ bản - Cao cấp',
      participants: 22100,
      rating: 4.6,
      icon: '📝',
      color: 'bg-indigo-50 border-indigo-200',
      badgeColor: 'bg-indigo-500',
    },
    {
      id: 7,
      name: 'TOEIC Grammar',
      description: 'Luyện tập ngữ pháp TOEIC cơ bản đến nâng cao',
      testCount: 22,
      totalQuestions: 40,
      duration: '25 phút',
      difficulty: 'Cơ bản - Cao cấp',
      participants: 16800,
      rating: 4.4,
      icon: '📚',
      color: 'bg-yellow-50 border-yellow-200',
      badgeColor: 'bg-yellow-500',
    },
    {
      id: 8,
      name: 'TOEIC Mock Tests',
      description: 'Đề thi thử TOEIC mô phỏng hoàn toàn như thi thật',
      testCount: 15,
      totalQuestions: 200,
      duration: '120 phút',
      difficulty: 'Cao cấp',
      participants: 9500,
      rating: 4.9,
      icon: '🏆',
      color: 'bg-gray-50 border-gray-200',
      badgeColor: 'bg-gray-500',
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Danh Mục Đề Thi TOEIC
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các danh mục đề thi đa dạng từ cơ bản đến nâng cao, được thiết kế để giúp bạn cải thiện điểm số TOEIC một cách hiệu quả.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm danh mục đề thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={`/practice-tests?category=${category.id}`}>
              <Card className={`${category.color} hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 h-full`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <Badge className={`${category.badgeColor} text-white`}>
                      {category.testCount} đề thi
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{category.totalQuestions} câu</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{category.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{category.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{category.rating}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-xs font-medium text-gray-700">
                        Độ khó: {category.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy danh mục nào phù hợp.</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Thống Kê Tổng Quan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Danh mục</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {categories.reduce((sum, cat) => sum + cat.testCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Tổng đề thi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {categories.reduce((sum, cat) => sum + cat.participants, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Lượt thi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {(categories.reduce((sum, cat) => sum + cat.rating, 0) / categories.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Đánh giá TB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCategories;