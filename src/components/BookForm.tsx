
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import BookCoverUpload from "@/components/BookCoverUpload";
import BookFormField from "@/components/BookFormField";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Omit<Book, "id" | "userId" | "createdAt">) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  onImageChange: (file: File | null) => void;
}

const BookForm: React.FC<BookFormProps> = ({ 
  book, 
  onSubmit, 
  onCancel, 
  isSubmitting,
  onImageChange
}) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { 
    imagePreview, 
    fileInputRef, 
    handleImageChange, 
    clearImage 
  } = useImageUpload({ 
    initialImageUrl: book?.imageUrl, 
    onImageChange 
  });

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
        imageUrl: book?.imageUrl,
      });
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BookFormField
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
        required
      />
      
      <BookFormField
        id="author"
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        required
      />

      <BookCoverUpload
        imagePreview={imagePreview}
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        onClearImage={clearImage}
      />
      
      <BookFormField
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description of the book"
        isTextarea
      />
      
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
          disabled={isSubmitting || isUploading}
          className="bg-book-primary hover:bg-book-primary/90 text-white"
        >
          {isSubmitting || isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isUploading ? "Uploading..." : "Saving..."}
            </>
          ) : book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
