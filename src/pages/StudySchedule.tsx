import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, CheckCircle2, Circle, Trash2, Edit, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface StudySchedule {
  id: string;
  title: string;
  description: string;
  color: string;
  todos: TodoItem[];
  createdAt: Date;
}

const StudySchedule = () => {
  const [schedules, setSchedules] = useState<StudySchedule[]>([
    {
      id: '1',
      title: 'Học React Native',
      description: 'Lộ trình học React Native từ cơ bản đến nâng cao',
      color: 'bg-blue-500',
      todos: [
        { id: '1', title: 'Cài đặt môi trường', completed: true, createdAt: new Date() },
        { id: '2', title: 'Học về Components', completed: false, createdAt: new Date() },
        { id: '3', title: 'Tìm hiểu Navigation', completed: false, createdAt: new Date() }
      ],
      createdAt: new Date()
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({ title: '', description: '', color: 'bg-blue-500' });
  const [newTodo, setNewTodo] = useState({ title: '', description: '', scheduleId: '' });
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false);
  const { toast } = useToast();

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  const createSchedule = () => {
    if (!newSchedule.title.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên lịch học",
        variant: "destructive"
      });
      return;
    }

    const schedule: StudySchedule = {
      id: Date.now().toString(),
      title: newSchedule.title,
      description: newSchedule.description,
      color: newSchedule.color,
      todos: [],
      createdAt: new Date()
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({ title: '', description: '', color: 'bg-blue-500' });
    setIsScheduleDialogOpen(false);

    toast({
      title: "Thành công",
      description: "Đã tạo lịch học mới"
    });
  };

  const createTodo = () => {
    if (!newTodo.title.trim() || !newTodo.scheduleId) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    const todo: TodoItem = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      createdAt: new Date()
    };

    setSchedules(schedules.map(schedule => 
      schedule.id === newTodo.scheduleId 
        ? { ...schedule, todos: [...schedule.todos, todo] }
        : schedule
    ));

    setNewTodo({ title: '', description: '', scheduleId: '' });
    setIsTodoDialogOpen(false);

    toast({
      title: "Thành công",
      description: "Đã thêm nhiệm vụ mới"
    });
  };

  const toggleTodo = (scheduleId: string, todoId: string) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            todos: schedule.todos.map(todo =>
              todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
          }
        : schedule
    ));
  };

  const deleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    toast({
      title: "Đã xóa",
      description: "Lịch học đã được xóa"
    });
  };

  const deleteTodo = (scheduleId: string, todoId: string) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === scheduleId
        ? { ...schedule, todos: schedule.todos.filter(todo => todo.id !== todoId) }
        : schedule
    ));
  };

  const getCompletionRate = (todos: TodoItem[]) => {
    if (todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.completed).length;
    return Math.round((completed / todos.length) * 100);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Lịch Học Cá Nhân
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý lịch học và theo dõi tiến độ học tập của bạn
          </p>
        </div>

        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tạo Lịch Học
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Lịch Học Mới</DialogTitle>
              <DialogDescription>
                Tạo một lịch học để theo dõi tiến độ học tập
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="schedule-title">Tên lịch học</Label>
                <Input
                  id="schedule-title"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                  placeholder="Ví dụ: Học React Native"
                />
              </div>
              
              <div>
                <Label htmlFor="schedule-description">Mô tả</Label>
                <Textarea
                  id="schedule-description"
                  value={newSchedule.description}
                  onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                  placeholder="Mô tả chi tiết về lịch học..."
                />
              </div>

              <div>
                <Label>Màu sắc</Label>
                <div className="flex gap-2 mt-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} ${
                        newSchedule.color === color ? 'ring-2 ring-ring ring-offset-2' : ''
                      }`}
                      onClick={() => setNewSchedule({...newSchedule, color})}
                    />
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={createSchedule}>Tạo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {schedules.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Chưa có lịch học nào
          </h3>
          <p className="text-muted-foreground mb-4">
            Tạo lịch học đầu tiên để bắt đầu theo dõi tiến độ học tập
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${schedule.color}`} />
                    <div>
                      <CardTitle className="text-lg">{schedule.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {schedule.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSchedule(schedule.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary">
                    {schedule.todos.length} nhiệm vụ
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {getCompletionRate(schedule.todos)}% hoàn thành
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {schedule.todos.map((todo) => (
                    <div key={todo.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(schedule.id, todo.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {todo.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(schedule.id, todo.id)}
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive p-1 h-auto"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <Dialog open={isTodoDialogOpen} onOpenChange={setIsTodoDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setNewTodo({...newTodo, scheduleId: schedule.id})}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm nhiệm vụ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm Nhiệm Vụ Mới</DialogTitle>
                        <DialogDescription>
                          Thêm nhiệm vụ vào lịch học "{schedule.title}"
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="todo-title">Tên nhiệm vụ</Label>
                          <Input
                            id="todo-title"
                            value={newTodo.title}
                            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                            placeholder="Ví dụ: Hoàn thành bài tập số 1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="todo-description">Mô tả (tùy chọn)</Label>
                          <Textarea
                            id="todo-description"
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                            placeholder="Chi tiết về nhiệm vụ..."
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTodoDialogOpen(false)}>
                          Hủy
                        </Button>
                        <Button onClick={createTodo}>Thêm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudySchedule;