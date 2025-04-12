
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../lib/firebase";
import { Book } from "../types/book";

const BOOKS_COLLECTION = "books";

export const addBook = async (book: Omit<Book, "id" | "createdAt">, imageFile?: File | null) => {
  try {
    let imageUrl;
    
    // Handle image upload if provided
    if (imageFile) {
      const storageRef = ref(storage, `books/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    const booksRef = collection(db, BOOKS_COLLECTION);
    const newBook = {
      ...book,
      imageUrl: imageUrl || book.imageUrl,
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

export const updateBook = async (id: string, bookData: Partial<Book>, imageFile?: File | null) => {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, id);
    
    // Remove the id field from the update data
    const { id: _, ...updateData } = bookData;
    
    // Handle image upload if provided
    if (imageFile) {
      // First, delete the old image if it exists
      if (bookData.imageUrl && bookData.imageUrl.startsWith('https://firebasestorage.googleapis.com')) {
        try {
          // Extract the path from the URL
          const oldImagePath = decodeURIComponent(bookData.imageUrl.split('/o/')[1].split('?')[0]);
          const oldImageRef = ref(storage, oldImagePath);
          await deleteObject(oldImageRef);
        } catch (err) {
          console.error("Error deleting old image:", err);
          // Continue even if deletion fails
        }
      }
      
      // Upload the new image
      const storageRef = ref(storage, `books/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    await updateDoc(bookRef, updateData);
    return { id, ...bookData, ...updateData };
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id: string, imageUrl?: string) => {
  try {
    // Delete the image from storage if it exists
    if (imageUrl && imageUrl.startsWith('https://firebasestorage.googleapis.com')) {
      try {
        // Extract the path from the URL
        const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      } catch (err) {
        console.error("Error deleting image from storage:", err);
        // Continue even if deletion fails
      }
    }
    
    const bookRef = doc(db, BOOKS_COLLECTION, id);
    await deleteDoc(bookRef);
    return id;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
