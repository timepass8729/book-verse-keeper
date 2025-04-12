
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  updateDoc, 
  where, 
  Timestamp, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Book } from "../types/book";

const BOOKS_COLLECTION = "books";

export const addBook = async (book: Omit<Book, "id" | "createdAt">) => {
  try {
    const booksRef = collection(db, BOOKS_COLLECTION);
    const newBook = {
      ...book,
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(booksRef, newBook);
    return { id: docRef.id, ...newBook };
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const getBooksByUser = async (userId: string) => {
  try {
    const booksRef = collection(db, BOOKS_COLLECTION);
    const q = query(booksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? new Date((data.createdAt as Timestamp).toDate()) : new Date(),
      } as Book;
    });
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
};

export const updateBook = async (id: string, bookData: Partial<Book>) => {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, id);
    
    // Remove the id field from the update data
    const { id: _, ...updateData } = bookData;
    
    await updateDoc(bookRef, updateData);
    return { id, ...bookData };
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, id);
    await deleteDoc(bookRef);
    return id;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
