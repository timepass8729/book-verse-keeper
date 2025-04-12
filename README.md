
# 📚 Book Management System

A web application that allows users to manage their personal book collections through a clean, intuitive interface.

## 🚀 Features

### User Authentication
- Secure email/password authentication system powered by Firebase
- User registration and login functionality
- Protected routes for authenticated users only
- Session persistence across browser refreshes

### Book Management
- Create, read, update, and delete (CRUD) operations for books
- Each book has a title, author, and optional description
- Books are stored in Firebase Firestore database
- Each user can only access their own book collection

### UI/UX Features
- Responsive design that works on desktop and mobile devices
- Book-themed styling with clean typography
- Interactive toast notifications for user feedback
- Intuitive form inputs with validation
- Loading states for asynchronous operations

## 🔧 Technical Stack

### Frontend
- **React**: Functional components with Hooks
- **TypeScript**: For type safety and better developer experience
- **React Router**: For navigation and route protection
- **Tailwind CSS**: For styling with shadcn/ui components
- **Lucide React**: For beautiful icons

### Backend (Firebase)
- **Firebase Authentication**: For user management
- **Firestore Database**: For storing and syncing book data
- **Firebase Security Rules**: To enforce user data isolation

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── BookCard.tsx        # Individual book display
│   ├── BookForm.tsx        # Form for creating/editing books
│   ├── BookList.tsx        # List of books with empty state
│   ├── Header.tsx          # Navigation header
│   ├── PrivateRoute.tsx    # Auth protection wrapper
│   └── ui/                 # UI component library
│
├── contexts/
│   └── AuthContext.tsx     # Firebase auth context provider
│
├── lib/
│   ├── firebase.ts         # Firebase initialization
│   └── utils.ts            # Utility functions
│
├── pages/
│   ├── Dashboard.tsx       # Main book management page
│   ├── Landing.tsx         # Homepage for non-authenticated users
│   ├── Login.tsx           # User login page
│   ├── NotFound.tsx        # 404 page
│   └── Signup.tsx          # User registration page
│
├── services/
│   └── bookService.ts      # Firebase book CRUD operations
│
├── types/
│   └── book.ts             # TypeScript interfaces for book data
│
└── App.tsx                 # Main application component with routing
```

## 🔐 Firebase Configuration

The application uses Firebase for authentication and data storage. Firebase configuration is initialized in `src/lib/firebase.ts`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBD3RvrU8dNgboGffodkakFiGf_iJN3m78",
  authDomain: "bookmanagement-99402.firebaseapp.com",
  projectId: "bookmanagement-99402",
  storageBucket: "bookmanagement-99402.firebasestorage.app",
  messagingSenderId: "232407882114",
  appId: "1:232407882114:web:77daa9871e0f5c03a8179b",
  measurementId: "G-W95DH95DYM"
};
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed on your machine
- A Firebase account (free tier is sufficient)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🔍 Key Functionality

### Authentication Flow

1. Users start on the landing page with options to sign in or sign up
2. After successful authentication, users are redirected to their dashboard
3. Protected routes ensure non-authenticated users can't access private content
4. Users can log out from any authenticated page

### Book Management

1. Dashboard displays all books belonging to the current user
2. "Add Book" button opens a modal form for creating new books
3. Each book card has options to edit or delete the book
4. Edit functionality pre-fills the form with existing book data
5. Delete functionality requires confirmation to prevent accidental deletions

## 🧠 Code Highlights

### Firebase Authentication Context

```typescript
// Example of AuthContext implementation
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  // Authentication methods: signup, login, logout...
};
```

### Firestore Data Operations

```typescript
// Example of book service operations
export const getBooksByUser = async (userId: string) => {
  const booksRef = collection(db, BOOKS_COLLECTION);
  const q = query(booksRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

*Built with ❤️ using React, Firebase, and TypeScript*
