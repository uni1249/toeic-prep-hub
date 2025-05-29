
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, TrendingUp, Play, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Practice Tests',
      description: 'Full-length TOEIC practice tests covering all sections: Listening, Reading, Speaking, and Writing.',
    },
    {
      icon: Users,
      title: 'Expert-Curated Content',
      description: 'Questions designed by TOEIC experts to match the actual test format and difficulty.',
    },
    {
      icon: Award,
      title: 'Detailed Performance Analytics',
      description: 'Track your progress with detailed statistics and identify areas for improvement.',
    },
    {
      icon: TrendingUp,
      title: 'Adaptive Learning Path',
      description: 'Personalized study recommendations based on your performance and goals.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Kim',
      score: '945',
      quote: 'TOEIC Master helped me improve my score by 200 points in just 3 months!',
      image: '/placeholder.svg',
    },
    {
      name: 'David Chen',
      score: '890',
      quote: 'The practice tests are incredibly realistic and prepared me perfectly for the real exam.',
      image: '/placeholder.svg',
    },
    {
      name: 'Maria Garcia',
      score: '920',
      quote: 'The detailed analytics helped me focus on my weak areas and improve efficiently.',
      image: '/placeholder.svg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master the TOEIC Test with{' '}
              <span className="text-yellow-300">Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Practice with authentic TOEIC questions, track your progress, and achieve your target score
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Start Free Practice
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/practice-tests">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  View Practice Tests
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-6 text-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm">Practice Questions</div>
              </div>
              <div className="w-px h-8 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm">Students</div>
              </div>
              <div className="w-px h-8 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TOEIC Master?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed on the TOEIC test, backed by proven methodology and expert content.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Test Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice Tests for Every Level
            </h2>
            <p className="text-xl text-gray-600">
              From beginner to advanced, we have practice tests tailored to your skill level.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: 'Beginner',
                color: 'bg-green-500',
                score: '400-600',
                tests: '25 Tests',
                description: 'Perfect for those starting their TOEIC journey',
              },
              {
                level: 'Intermediate',
                color: 'bg-yellow-500',
                score: '600-800',
                tests: '30 Tests',
                description: 'Build confidence and improve your skills',
              },
              {
                level: 'Advanced',
                color: 'bg-red-500',
                score: '800-990',
                tests: '20 Tests',
                description: 'Challenge yourself with the hardest questions',
              },
            ].map((level, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Badge className={`${level.color} text-white w-fit mx-auto mb-4`}>
                    {level.level}
                  </Badge>
                  <CardTitle className="text-2xl">{level.score}</CardTitle>
                  <CardDescription>{level.tests} Available</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{level.description}</p>
                  <Link to="/practice-tests">
                    <Button className="w-full">
                      Start Practicing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how our students achieved their TOEIC goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Score: {testimonial.score}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your TOEIC Score?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of successful students and start your TOEIC preparation today.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started for Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
