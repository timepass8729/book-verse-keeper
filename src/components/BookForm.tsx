
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Omit<Book, "id" | "userId" | "createdAt">) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ 
  book, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim()) {
      toast({
        variant: "destructive",
        title: "Please fill in all required fields",
        description: "Title and author are required.",
      });
      return;
    }
    
    try {
      await onSubmit({
        title,
        author,
        description: description.trim() ? description : undefined,
      });
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-book-text">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
          className="bg-white border-book-text/20 focus-visible:ring-book-accent"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="author" className="text-sm font-medium text-book-text">
          Author <span className="text-red-500">*</span>
        </label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          required
          className="bg-white border-book-text/20 focus-visible:ring-book-accent"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-book-text">
          Description <span className="text-gray-500">(optional)</span>
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the book"
          rows={4}
          className="bg-white border-book-text/20 focus-visible:ring-book-accent"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-book-text/20 text-book-text hover:bg-book-highlight"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-book-primary hover:bg-book-primary/90 text-white"
        >
          {isSubmitting ? "Saving..." : book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
