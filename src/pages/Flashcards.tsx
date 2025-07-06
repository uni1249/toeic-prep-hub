
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookPlus, Book, FlipHorizontal } from 'lucide-react';

interface FlashcardSet {
  id: number;
  title: string;
  description: string;
  cardCount: number;
  createdAt: string;
}

const Flashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([
    {
      id: 1,
      title: 'TOEIC Vocabulary - Business',
      description: 'Essential business vocabulary for TOEIC',
      cardCount: 50,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Common Phrases',
      description: 'Frequently used phrases in TOEIC tests',
      cardCount: 30,
      createdAt: '2024-01-10'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSetTitle, setNewSetTitle] = useState('');
  const [newSetDescription, setNewSetDescription] = useState('');

  const handleCreateSet = () => {
    if (newSetTitle.trim()) {
      const newSet: FlashcardSet = {
        id: Date.now(),
        title: newSetTitle.trim(),
        description: newSetDescription.trim(),
        cardCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setFlashcardSets([...flashcardSets, newSet]);
      setNewSetTitle('');
      setNewSetDescription('');
      setIsCreateDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flashcards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and study flashcard sets to improve your vocabulary.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Flashcard Sets</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <BookPlus className="h-4 w-4 mr-2" />
                Create New Set
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Flashcard Set</DialogTitle>
                <DialogDescription>
                  Create a new flashcard set to organize your vocabulary study.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter flashcard set title"
                    value={newSetTitle}
                    onChange={(e) => setNewSetTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    value={newSetDescription}
                    onChange={(e) => setNewSetDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSet} disabled={!newSetTitle.trim()}>
                    Create Set
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSets.map((set) => (
            <Card key={set.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  {set.title}
                </CardTitle>
                <CardDescription>{set.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>{set.cardCount} cards</p>
                    <p>Created: {new Date(set.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/flashcards/${set.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Book className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </Link>
                    <Link to={`/flashcards/${set.id}/study`} className="flex-1">
                      <Button className="w-full">
                        <FlipHorizontal className="h-4 w-4 mr-2" />
                        Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {flashcardSets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No flashcard sets yet.</p>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <BookPlus className="h-4 w-4 mr-2" />
                  Create Your First Set
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
