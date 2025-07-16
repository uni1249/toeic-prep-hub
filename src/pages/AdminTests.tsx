
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, FileText, Eye, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AdminTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const tests = [
    { 
      id: 1, 
      title: 'TOEIC Practice Test 1', 
      category: 'TOEIC Practice',
      questionsCount: 200,
      status: 'published',
      createdAt: '2024-01-15',
      attempts: 150
    },
    { 
      id: 2, 
      title: 'Listening Skills Test', 
      category: 'Listening Focus',
      questionsCount: 100,
      status: 'draft',
      createdAt: '2024-02-01',
      attempts: 0
    },
    { 
      id: 3, 
      title: 'Reading Comprehension', 
      category: 'Reading Focus',
      questionsCount: 75,
      status: 'published',
      createdAt: '2024-02-10',
      attempts: 89
    },
    { 
      id: 4, 
      title: 'Grammar Focus Test', 
      category: 'Grammar',
      questionsCount: 50,
      status: 'archived',
      createdAt: '2024-01-20',
      attempts: 45
    },
    { 
      id: 5, 
      title: 'TOEIC Simulation Full', 
      category: 'TOEIC Simulation',
      questionsCount: 200,
      status: 'published',
      createdAt: '2024-02-15',
      attempts: 234
    },
  ];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      published: { variant: 'default' as const, label: 'Đã xuất bản' },
      draft: { variant: 'secondary' as const, label: 'Bản nháp' },
      archived: { variant: 'destructive' as const, label: 'Đã lưu trữ' },
    };
    return config[status as keyof typeof config] || config.draft;
  };

  const handleDuplicateTest = (testId: number) => {
    console.log('Duplicate test:', testId);
    // Implement duplicate test logic
  };

  const handleDeleteTest = (testId: number) => {
    console.log('Delete test:', testId);
    // Implement delete test logic
  };

  const handleToggleStatus = (testId: number, currentStatus: string) => {
    console.log('Toggle test status:', testId, currentStatus);
    // Implement status toggle logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đề thi</h1>
          <p className="text-gray-600 mt-2">Quản lý tất cả đề thi và phần thi</p>
        </div>
        <Link to="/test-creator">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tạo đề thi mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
                <p className="text-sm text-gray-600">Tổng đề thi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {tests.filter(t => t.status === 'published').length}
                </p>
                <p className="text-sm text-gray-600">Đã xuất bản</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">●</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {tests.filter(t => t.status === 'draft').length}
                </p>
                <p className="text-sm text-gray-600">Bản nháp</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">#</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {tests.reduce((sum, t) => sum + t.attempts, 0)}
                </p>
                <p className="text-sm text-gray-600">Lượt thi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm đề thi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="published">Đã xuất bản</SelectItem>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="archived">Đã lưu trữ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đề thi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đề thi</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Số câu hỏi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lượt thi</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => {
                const statusConfig = getStatusBadge(test.status);
                return (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>{test.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.questionsCount} câu</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.attempts}</TableCell>
                    <TableCell>{test.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateTest(test.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTest(test.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTests;
