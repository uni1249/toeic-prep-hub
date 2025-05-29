
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';

const BlogPost = () => {
  const { postId } = useParams();

  // Mock blog post data
  const post = {
    id: postId,
    title: '10 Essential TOEIC Listening Tips for Success',
    content: `
      <div class="prose max-w-none">
        <p>The TOEIC Listening section can be challenging, but with the right strategies and consistent practice, you can significantly improve your score. Here are 10 essential tips that have helped thousands of students achieve their target scores.</p>
        
        <h2>1. Familiarize Yourself with the Test Format</h2>
        <p>Understanding the structure of the TOEIC Listening test is crucial. The section contains four parts:</p>
        <ul>
          <li>Part 1: Photographs (6 questions)</li>
          <li>Part 2: Question-Response (25 questions)</li>
          <li>Part 3: Conversations (39 questions)</li>
          <li>Part 4: Talks (30 questions)</li>
        </ul>
        
        <h2>2. Practice Active Listening</h2>
        <p>Active listening involves fully concentrating on what you hear, understanding the message, and remembering key details. Practice this skill daily by listening to English podcasts, news, and conversations.</p>
        
        <h2>3. Learn to Predict Answers</h2>
        <p>Before the audio starts, quickly read the questions and answer choices. This helps you predict what you're listening for and makes it easier to identify the correct answer.</p>
        
        <h2>4. Pay Attention to Key Words</h2>
        <p>Listen for keywords that relate to the question. These might include:</p>
        <ul>
          <li>Time expressions (tomorrow, next week, yesterday)</li>
          <li>Location words (office, restaurant, airport)</li>
          <li>People (manager, customer, colleague)</li>
          <li>Actions (meeting, traveling, purchasing)</li>
        </ul>
        
        <h2>5. Don't Get Stuck on Difficult Questions</h2>
        <p>If you miss a question or find it difficult, move on quickly. Don't let one challenging question affect your performance on subsequent questions.</p>
        
        <h2>6. Practice Note-Taking</h2>
        <p>For Parts 3 and 4, practice taking brief notes while listening. Focus on key information like names, numbers, locations, and main ideas.</p>
        
        <h2>7. Improve Your Vocabulary</h2>
        <p>Build your business and everyday English vocabulary. The TOEIC test frequently uses workplace-related terms and common situations.</p>
        
        <h2>8. Listen to Various English Accents</h2>
        <p>The TOEIC test includes speakers with different accents (American, British, Canadian, Australian). Practice listening to various English accents to become comfortable with different pronunciations.</p>
        
        <h2>9. Use the Process of Elimination</h2>
        <p>If you're unsure about an answer, eliminate the options that are clearly incorrect. This increases your chances of selecting the right answer.</p>
        
        <h2>10. Take Regular Practice Tests</h2>
        <p>Consistent practice with full-length tests helps you build stamina and become familiar with the test timing. Aim to take at least one practice test per week.</p>
        
        <h2>Conclusion</h2>
        <p>Improving your TOEIC Listening score requires dedication, consistent practice, and the right strategies. Implement these tips in your study routine, and you'll see gradual improvement in your listening skills and test performance.</p>
        
        <p>Remember, success in TOEIC is not just about understanding English—it's about understanding the test format and applying effective test-taking strategies.</p>
      </div>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Listening',
    tags: ['TOEIC', 'Listening', 'Tips', 'Study Guide'],
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Common Grammar Mistakes in TOEIC Reading',
      category: 'Reading',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'How to Score 900+ on TOEIC: A Complete Guide',
      category: 'Strategy',
      readTime: '12 min read',
    },
    {
      id: 4,
      title: 'Business Vocabulary for TOEIC Success',
      category: 'Vocabulary',
      readTime: '6 min read',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Listening': 'bg-blue-100 text-blue-800',
      'Reading': 'bg-green-100 text-green-800',
      'Strategy': 'bg-gray-100 text-gray-800',
      'Vocabulary': 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>

              {/* Author Bio */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-lg">{post.author}</h3>
                      <p className="text-gray-600 mb-4">
                        TOEIC instructor with over 10 years of experience helping students achieve their target scores. 
                        Certified English teacher and test preparation specialist.
                      </p>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#section1" className="block text-blue-600 hover:underline">
                      1. Familiarize Yourself with the Test Format
                    </a>
                    <a href="#section2" className="block text-blue-600 hover:underline">
                      2. Practice Active Listening
                    </a>
                    <a href="#section3" className="block text-blue-600 hover:underline">
                      3. Learn to Predict Answers
                    </a>
                    <a href="#section4" className="block text-blue-600 hover:underline">
                      4. Pay Attention to Key Words
                    </a>
                    <a href="#section5" className="block text-blue-600 hover:underline">
                      5. Don't Get Stuck on Difficult Questions
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Related Articles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <Link 
                        to={`/blog/${relatedPost.id}`}
                        className="block hover:text-blue-600"
                      >
                        <h4 className="font-medium mb-2">{relatedPost.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge className={`${getCategoryColor(relatedPost.category)} text-xs`}>
                            {relatedPost.category}
                          </Badge>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Practice Test CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">
                    Ready to Practice?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 mb-4">
                    Apply these listening tips with our practice tests.
                  </p>
                  <Link to="/practice-tests">
                    <Button className="w-full">
                      Start Practice Test
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
