
import React from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

interface BookCoverUploadProps {
  imagePreview: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
}

const BookCoverUpload: React.FC<BookCoverUploadProps> = ({
  imagePreview,
  fileInputRef,
  onImageChange,
  onClearImage,
}) => {
  return (
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
              onClick={onClearImage}
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
          onChange={onImageChange}
        />
        <div className="text-xs text-gray-500">
          <p>Recommended size: 400×600px</p>
          <p>Max file size: 5MB</p>
          <p>Formats: JPG, PNG, WebP</p>
        </div>
      </div>
    </div>
  );
};

export default BookCoverUpload;
