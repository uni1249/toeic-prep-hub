
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Lock, Bell, Calendar, Award, BookOpen } from 'lucide-react';

const Account = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    currentLevel: 'intermediate',
    targetScore: '800',
    studyGoal: 'daily',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    studyReminders: true,
    weeklyProgress: true,
    marketingEmails: false,
  });

  const testHistory = [
    {
      id: 1,
      title: 'TOEIC Practice Test 1',
      date: '2024-01-15',
      score: 720,
      sections: {
        listening: 385,
        reading: 335,
      },
      timeSpent: '120 minutes',
      status: 'completed',
    },
    {
      id: 2,
      title: 'TOEIC Practice Test 2',
      date: '2024-01-10',
      score: 680,
      sections: {
        listening: 350,
        reading: 330,
      },
      timeSpent: '118 minutes',
      status: 'completed',
    },
    {
      id: 3,
      title: 'TOEIC Listening Focus Test',
      date: '2024-01-08',
      score: 390,
      sections: {
        listening: 390,
        reading: 0,
      },
      timeSpent: '45 minutes',
      status: 'completed',
    },
  ];

  const achievements = [
    {
      title: 'First Test Completed',
      description: 'Completed your first practice test',
      date: '2024-01-05',
      icon: '🎯',
    },
    {
      title: 'Score Improver',
      description: 'Improved your score by 40 points',
      date: '2024-01-10',
      icon: '📈',
    },
    {
      title: '7-Day Streak',
      description: 'Studied for 7 consecutive days',
      date: '2024-01-12',
      icon: '🔥',
    },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    // Handle profile update logic
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change requested');
    // Handle password change logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">Manage your profile, preferences, and track your progress</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="history">Test History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and study preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentLevel">Current Level</Label>
                          <Select
                            value={profileData.currentLevel}
                            onValueChange={(value) => setProfileData(prev => ({ ...prev, currentLevel: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (300-500)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (500-700)</SelectItem>
                              <SelectItem value="advanced">Advanced (700-900)</SelectItem>
                              <SelectItem value="expert">Expert (900+)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="targetScore">Target Score</Label>
                          <Select
                            value={profileData.targetScore}
                            onValueChange={(value) => setProfileData(prev => ({ ...prev, targetScore: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="600">600+</SelectItem>
                              <SelectItem value="700">700+</SelectItem>
                              <SelectItem value="800">800+</SelectItem>
                              <SelectItem value="900">900+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input id="confirmNewPassword" type="password" />
                      </div>
                      <Button type="submit" className="w-full">
                        Change Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Test History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Test History
                  </CardTitle>
                  <CardDescription>
                    View your completed practice tests and scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testHistory.map((test) => (
                      <div key={test.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{test.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{test.score}/990</Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {test.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {new Date(test.date).toLocaleDateString()}
                          </div>
                          <div>Listening: {test.sections.listening}/495</div>
                          <div>Reading: {test.sections.reading}/495</div>
                          <div>Time: {test.timeSpent}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Your study milestones and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            <p className="text-xs text-gray-500">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Study Reminders</h4>
                        <p className="text-sm text-gray-600">Daily reminders to practice</p>
                      </div>
                      <Switch
                        checked={preferences.studyReminders}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, studyReminders: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weekly Progress</h4>
                        <p className="text-sm text-gray-600">Weekly progress summaries</p>
                      </div>
                      <Switch
                        checked={preferences.weeklyProgress}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, weeklyProgress: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-sm text-gray-600">Promotional content and offers</p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, marketingEmails: checked }))
                        }
                      />
                    </div>
                  </div>

                  <Button className="w-full">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
