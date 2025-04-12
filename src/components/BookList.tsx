
import React from "react";
import { Book } from "@/types/book";
import BookCard from "./BookCard";
import { BookOpen } from "lucide-react";

interface BookListProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  isLoading: boolean;
}

const BookList: React.FC<BookListProps> = ({ 
  books, 
  onEditBook, 
  onDeleteBook, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse text-book-text/50 flex flex-col items-center">
          <BookOpen className="h-10 w-10 mb-2" />
          <span>Loading books...</span>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-book-secondary/50 rounded-lg p-6 border border-dashed border-book-text/20">
        <BookOpen className="h-12 w-12 text-book-text/40 mb-2" />
        <h3 className="font-serif text-xl text-book-text/70">No books available</h3>
        <p className="text-book-text/50 text-sm mt-1">
          Add your first book using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onEdit={onEditBook} 
          onDelete={onDeleteBook} 
        />
      ))}
    </div>
  );
};

export default BookList;
