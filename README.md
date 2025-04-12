

# 📚 **BookVerse**

A modern web application to manage your personal book collection with a clean and intuitive interface. Powered by **React**, **Firebase**, and **TypeScript**.

---

## 🚀 **Features**

### 🔐 User Authentication
- Secure login/signup using **Firebase Auth**
- Session persistence (auto-login on refresh)
- Protected routes to ensure data privacy

### 📖 Book Management
- Full **CRUD** support (Create, Read, Update, Delete)
- Book entries include **Title**, **Author**, and optional **Description**
- Data stored in **Firestore** (per-user collections)

### 💡 UI/UX Enhancements
- 📱 **Responsive Design** (Mobile + Desktop)
- 📚 Book-themed layout with clean typography
- 🔔 Toast notifications for real-time feedback
- ✅ Form validation and loading indicators for smooth UX

---

## 🛠️ **Tech Stack**

### 🌐 Frontend
- **React** (with Hooks)
- **TypeScript** (type safety FTW)
- **React Router v6** (route protection & navigation)
- **Tailwind CSS** + **shadcn/ui** (modern component library)
- **Lucide React** (icon set)

### 🔥 Backend (Firebase)
- **Firebase Authentication**
- **Cloud Firestore**
- **Firebase Security Rules** (for user data isolation)

---

## 📁 **Project Structure**

```
src/
├── components/           # Reusable UI elements
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   ├── BookList.tsx
│   ├── Header.tsx
│   ├── PrivateRoute.tsx
│   └── ui/               # Shared UI utilities
│
├── contexts/
│   └── AuthContext.tsx   # Auth context provider
│
├── lib/
│   ├── firebase.ts       # Firebase setup
│   └── utils.ts          # Utility functions
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   └── Signup.tsx
│
├── services/
│   └── bookService.ts    # Firestore CRUD logic
│
├── types/
│   └── book.ts           # TypeScript interfaces
│
└── App.tsx               # Main entry with routing
```

---

## 🔐 **Firebase Configuration**

`src/lib/firebase.ts`  
```ts
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

---

## 🧪 **Getting Started**

### 📦 Prerequisites
- [Node.js](https://nodejs.org/) and npm
- Firebase project (Free tier)

### 🛠️ Installation

```bash
# 1. Clone the repo
git clone <repository-url>
cd book-management-system

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 🔍 **Key Functionality**

### 🔐 Authentication Flow
- Landing page → Sign In/Sign Up
- Authenticated users are redirected to Dashboard
- Non-authenticated users are blocked from protected routes
- Logout from any screen

### 📚 Book Dashboard
- See your entire book collection
- Add Book ➕ (Modal with input validation)
- Edit Book ✏️ (Pre-filled form)
- Delete Book 🗑️ (Confirmation required)

---

## 🧠 **Highlighted Code**

### 🔐 Firebase Auth Context

```ts
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // signup, login, logout methods...
};
```

### 🔥 Firestore: Get Books by User

```ts
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

---

## 🤝 **Contributing**

Contributions are welcome!  
Please open an issue or submit a PR with improvements, bug fixes, or feature suggestions.

---

## 📄 **License**

This project is licensed under the **MIT License** – see the `LICENSE` file for full details.

---

## 🙌 **Acknowledgements**

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

> *Built with ❤️ using React, Firebase, and TypeScript*

---

Would you like me to turn this new version into a downloadable `README.docx` or `README.md` file as well?
