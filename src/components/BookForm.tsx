
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, Loader2 } from "lucide-react";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(book?.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 5MB.",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
        return;
      }
      
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        imageUrl: imageFile ? 'pending-upload' : book?.imageUrl, // We'll replace this with actual URL after upload
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
        <label htmlFor="bookImage" className="text-sm font-medium text-book-text">
          Book Cover <span className="text-gray-500">(optional)</span>
        </label>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {imagePreview ? (
            <div className="relative h-40 w-32 overflow-hidden rounded-md border border-gray-200">
              <img 
                src={imagePreview} 
                alt="Book cover preview" 
                className="h-full w-full object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 bg-white/80 hover:bg-white text-gray-700"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                &times;
              </Button>
            </div>
          ) : (
            <div 
              className="flex h-40 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <p className="mt-2 text-xs text-gray-500">Upload Cover</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="bookImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="text-xs text-gray-500">
            <p>Recommended size: 400×600px</p>
            <p>Max file size: 5MB</p>
            <p>Formats: JPG, PNG, WebP</p>
          </div>
        </div>
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
