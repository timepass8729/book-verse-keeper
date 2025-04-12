
import React from "react";
import { Book } from "@/types/book";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <Card className="h-full transition-all border-book-accent/20 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif text-book-primary line-clamp-2">
          {book.title}
        </CardTitle>
        <CardDescription className="font-medium text-book-text/70">
          by {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {book.description ? (
          <p className="text-book-text/80 text-sm line-clamp-3">{book.description}</p>
        ) : (
          <p className="text-book-text/60 text-sm italic">No description provided</p>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-end space-x-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(book)}
          className="text-book-text hover:text-book-primary hover:bg-book-highlight"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => book.id && onDelete(book.id)}
          className="text-book-text hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
