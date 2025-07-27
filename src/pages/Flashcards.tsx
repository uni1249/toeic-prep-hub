
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { BookPlus, Book, FlipHorizontal, Edit2, Globe, Lock } from 'lucide-react';

interface FlashcardSet {
  id: number;
  title: string;
  description: string;
  cardCount: number;
  createdAt: string;
  isPublic: boolean;
}

const Flashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([
    {
      id: 1,
      title: 'TOEIC Vocabulary - Business',
      description: 'Essential business vocabulary for TOEIC',
      cardCount: 50,
      createdAt: '2024-01-15',
      isPublic: false
    },
    {
      id: 2,
      title: 'Common Phrases',
      description: 'Frequently used phrases in TOEIC tests',
      cardCount: 30,
      createdAt: '2024-01-10',
      isPublic: true
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<FlashcardSet | null>(null);
  const [newSetTitle, setNewSetTitle] = useState('');
  const [newSetDescription, setNewSetDescription] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const handleCreateSet = () => {
    if (newSetTitle.trim()) {
      const newSet: FlashcardSet = {
        id: Date.now(),
        title: newSetTitle.trim(),
        description: newSetDescription.trim(),
        cardCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isPublic: false
      };
      setFlashcardSets([...flashcardSets, newSet]);
      setNewSetTitle('');
      setNewSetDescription('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditSet = (set: FlashcardSet) => {
    setEditingSet(set);
    setEditTitle(set.title);
  };

  const handleSaveEdit = () => {
    if (editingSet && editTitle.trim()) {
      setFlashcardSets(flashcardSets.map(set => 
        set.id === editingSet.id 
          ? { ...set, title: editTitle.trim() }
          : set
      ));
      setEditingSet(null);
      setEditTitle('');
    }
  };

  const handleTogglePublic = (setId: number) => {
    setFlashcardSets(flashcardSets.map(set => 
      set.id === setId 
        ? { ...set, isPublic: !set.isPublic }
        : set
    ));
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    {set.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditSet(set)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{set.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>{set.cardCount} cards</p>
                    <p>Created: {new Date(set.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {set.isPublic ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                      <span className="text-sm font-medium">
                        {set.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <Switch
                      checked={set.isPublic}
                      onCheckedChange={() => handleTogglePublic(set.id)}
                    />
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

        {/* Edit Dialog */}
        <Dialog open={!!editingSet} onOpenChange={() => setEditingSet(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Flashcard Set</DialogTitle>
              <DialogDescription>
                Update the title of your flashcard set.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  placeholder="Enter flashcard set title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingSet(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} disabled={!editTitle.trim()}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Flashcards;
