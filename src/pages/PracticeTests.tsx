
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Users, Star, Filter, Search } from 'lucide-react';

const PracticeTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const practiceTests = [
    {
      id: 1,
      title: 'TOEIC Practice Test 1',
      description: 'Complete practice test covering all sections',
      level: 'beginner',
      duration: '120 minutes',
      questions: 200,
      difficulty: 'Easy',
      participants: 1234,
      rating: 4.8,
      sections: ['Listening', 'Reading'],
    },
    {
      id: 2,
      title: 'TOEIC Practice Test 2',
      description: 'Intermediate level test with detailed explanations',
      level: 'intermediate',
      duration: '120 minutes',
      questions: 200,
      difficulty: 'Medium',
      participants: 987,
      rating: 4.7,
      sections: ['Listening', 'Reading'],
    },
    {
      id: 3,
      title: 'TOEIC Practice Test 3',
      description: 'Advanced test for high achievers',
      level: 'advanced',
      duration: '120 minutes',
      questions: 200,
      difficulty: 'Hard',
      participants: 654,
      rating: 4.9,
      sections: ['Listening', 'Reading'],
    },
    {
      id: 4,
      title: 'TOEIC Speaking & Writing Test',
      description: 'Practice test for speaking and writing sections',
      level: 'intermediate',
      duration: '80 minutes',
      questions: 19,
      difficulty: 'Medium',
      participants: 543,
      rating: 4.6,
      sections: ['Speaking', 'Writing'],
    },
    {
      id: 5,
      title: 'TOEIC Listening Focus Test',
      description: 'Specialized test focusing on listening comprehension',
      level: 'beginner',
      duration: '45 minutes',
      questions: 100,
      difficulty: 'Easy',
      participants: 876,
      rating: 4.5,
      sections: ['Listening'],
    },
    {
      id: 6,
      title: 'TOEIC Reading Focus Test',
      description: 'Intensive reading comprehension practice',
      level: 'advanced',
      duration: '75 minutes',
      questions: 100,
      difficulty: 'Hard',
      participants: 432,
      rating: 4.8,
      sections: ['Reading'],
    },
  ];

  const filteredTests = practiceTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || test.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TOEIC Practice Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of practice tests designed to help you achieve your target TOEIC score.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search practice tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Level:</span>
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Test Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`${getLevelColor(test.level)} text-white mb-2`}>
                      {test.level.charAt(0).toUpperCase() + test.level.slice(1)}
                    </Badge>
                    <CardTitle className="text-xl mb-2">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {test.sections.map((section) => (
                    <Badge key={section} variant="outline" className="text-xs">
                      {section}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {test.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {test.participants} taken
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{test.questions} questions</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{test.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(test.difficulty)}>
                      {test.difficulty}
                    </Badge>
                  </div>
                </div>
                <Link to={`/test/${test.id}`} className="block mt-4">
                  <Button className="w-full">
                    Start Test
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No practice tests found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeTests;
