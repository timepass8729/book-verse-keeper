
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseImageUploadProps {
  initialImageUrl?: string;
  onImageChange: (file: File | null) => void;
}

export const useImageUpload = ({ initialImageUrl, onImageChange }: UseImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl || "");
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
      
      // Pass the file to parent component
      onImageChange(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onImageChange(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    imagePreview,
    fileInputRef,
    handleImageChange,
    clearImage
  };
};
