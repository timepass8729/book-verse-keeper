
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, BookPlus, Library, BookCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <BookPlus className="h-8 w-8 text-book-accent" />,
      title: "Track Your Collection",
      description: "Easily add all your books and keep track of your growing collection."
    },
    {
      icon: <Library className="h-8 w-8 text-book-accent" />,
      title: "Organized Library",
      description: "Manage your books with a clean, intuitive interface designed for book lovers."
    },
    {
      icon: <BookCheck className="h-8 w-8 text-book-accent" />,
      title: "Personal Notes",
      description: "Add descriptions and personal notes to remember why each book matters to you."
    }
  ];

  return (
    <div className="min-h-screen bg-book-secondary">
      <header className="bg-white shadow-sm border-b border-book-accent/20">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-book-primary" />
            <h1 className="text-xl font-serif font-bold text-book-primary">Book Management</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <Button 
                asChild
                className="bg-book-primary hover:bg-book-primary/90 text-white"
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button 
                  asChild
                  variant="ghost" 
                  className="text-book-text hover:text-book-primary hover:bg-book-highlight"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button 
                  asChild
                  className="bg-book-primary hover:bg-book-primary/90 text-white"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <BookOpen className="h-16 w-16 mx-auto text-book-primary mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-book-primary mb-4">Your Personal Book Management System</h1>
            <p className="text-xl text-book-text/80 mb-8">
              Keep track of your books, organize your reading life, and build your literary world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {currentUser ? (
                <Button 
                  asChild
                  size="lg"
                  className="bg-book-primary hover:bg-book-primary/90 text-white text-lg"
                >
                  <Link to="/dashboard">Go to My Books</Link>
                </Button>
              ) : (
                <>
                  <Button 
                    asChild
                    size="lg"
                    className="bg-book-primary hover:bg-book-primary/90 text-white text-lg"
                  >
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-book-primary text-book-primary hover:bg-book-highlight text-lg"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold text-book-primary text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-book-secondary/50 rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-book-accent/10">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-book-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-book-text/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-book-text py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-book-secondary/80 text-sm">
            Book Management System © 2025 | Made with ♥ for Book Lovers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
