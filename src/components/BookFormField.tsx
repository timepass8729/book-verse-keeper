
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BookFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}

const BookFormField: React.FC<BookFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  rows = 4
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-book-text">
        {label} {required ? <span className="text-red-500">*</span> : <span className="text-gray-500">(optional)</span>}
      </label>
      {isTextarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="bg-white border-book-text/20 focus-visible:ring-book-accent"
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          required={required}
          className="bg-white border-book-text/20 focus-visible:ring-book-accent"
        />
      )}
    </div>
  );
};

export default BookFormField;
