import { Timestamp } from "firebase/firestore";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Timestamp | null;
  password: string;
  role: 'user' | 'admin';
}