
export interface Book {
  id?: string;
  title: string;
  author: string;
  description?: string;
  userId: string;
  createdAt?: Date | any; // Updated to accept Firebase's FieldValue type
}
