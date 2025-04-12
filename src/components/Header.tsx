
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen } from "lucide-react";

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-book-accent/20">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-book-primary" />
          <h1 className="text-xl font-serif font-bold text-book-primary">Book Management</h1>
        </div>
        
        <div className="flex items-center">
          {currentUser && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-book-text/70 hidden sm:inline">
                {currentUser.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-book-text hover:text-book-primary hover:bg-book-highlight"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
