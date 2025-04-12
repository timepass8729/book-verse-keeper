
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import { Book } from "@/types/book";
import { addBook, getBooksByUser, updateBook, deleteBook } from "@/services/bookService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookPlus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) {
      fetchBooks();
    }
  }, [currentUser]);

  const fetchBooks = async () => {
    if (!currentUser?.uid) return;
    
    setLoading(true);
    try {
      const fetchedBooks = await getBooksByUser(currentUser.uid);
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        variant: "destructive",
        title: "Failed to load books",
        description: "There was an error loading your books. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: Omit<Book, "id" | "userId" | "createdAt">) => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    try {
      const newBook = await addBook({
        ...bookData,
        userId: currentUser.uid,
      });
      
      setBooks([...books, newBook as Book]);
      setIsDialogOpen(false);
      toast({
        title: "Book added successfully",
        description: `"${bookData.title}" has been added to your collection.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add book",
        description: "There was an error adding your book. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleUpdateBook = async (bookData: Omit<Book, "id" | "userId" | "createdAt">) => {
    if (!editingBook || !editingBook.id) return;
    
    setIsSubmitting(true);
    try {
      const updatedBook = await updateBook(editingBook.id, {
        ...bookData,
        userId: editingBook.userId,
      });
      
      setBooks(books.map(book => 
        book.id === editingBook.id ? { ...book, ...bookData } : book
      ));
      
      setIsDialogOpen(false);
      setEditingBook(undefined);
      
      toast({
        title: "Book updated successfully",
        description: `"${bookData.title}" has been updated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update book",
        description: "There was an error updating your book. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteBook = (bookId: string) => {
    setDeletingBookId(bookId);
    setIsAlertDialogOpen(true);
  };

  const handleDeleteBook = async () => {
    if (!deletingBookId) return;
    
    try {
      await deleteBook(deletingBookId);
      
      setBooks(books.filter(book => book.id !== deletingBookId));
      
      toast({
        title: "Book deleted successfully",
        description: "The book has been removed from your collection.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete book",
        description: "There was an error deleting the book. Please try again.",
      });
    } finally {
      setIsAlertDialogOpen(false);
      setDeletingBookId(null);
    }
  };

  return (
    <div className="min-h-screen bg-book-secondary/80 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-book-primary">My Books</h2>
          <Button
            onClick={() => {
              setEditingBook(undefined);
              setIsDialogOpen(true);
            }}
            className="bg-book-primary hover:bg-book-primary/90 text-white"
          >
            <BookPlus className="h-5 w-5 mr-2" />
            Add Book
          </Button>
        </div>
        
        <BookList
          books={books}
          onEditBook={handleEditBook}
          onDeleteBook={confirmDeleteBook}
          isLoading={loading}
        />
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!isSubmitting) {
          setIsDialogOpen(open);
          if (!open) setEditingBook(undefined);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-book-primary">
              {editingBook ? "Edit Book" : "Add New Book"}
            </DialogTitle>
          </DialogHeader>
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={() => setIsDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book from your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBook} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
