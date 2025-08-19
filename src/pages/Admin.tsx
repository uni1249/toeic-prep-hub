
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FolderTree, 
  Database, 
  FileText, 
  Settings,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: BarChart3 },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: Users },
    { name: 'Phân loại đề thi', path: '/admin/categories', icon: FolderTree },
    { name: 'Ngân hàng câu hỏi', path: '/admin/questions', icon: Database },
    { name: 'Quản lý đề thi', path: '/admin/tests', icon: FileText },
    { name: 'Quản lý phản hồi', path: '/admin/feedback', icon: MessageSquare },
    { name: 'Tạo đề thi', path: '/test-creator', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 fixed h-full z-10`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {sidebarOpen && <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <nav className="mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    isActive(item.path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} flex-1 transition-all duration-300`}>
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
