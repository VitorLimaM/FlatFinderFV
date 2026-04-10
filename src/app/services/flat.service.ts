import { db } from '../firebase/firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

export class FlatService {

  private flatsCollection = collection(db, 'flats');

  async getFlats() {
    const snapshot = await getDocs(this.flatsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async getFlatById(id: string) {
    const docRef = doc(db, 'flats', id);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }

  async addFlat(flat: any) {
    return await addDoc(this.flatsCollection, flat);
  }

  async updateFlat(id: string, flat: any) {
    const docRef = doc(db, 'flats', id);
    return await updateDoc(docRef, flat);
  }

  async deleteFlat(id: string) {
    const docRef = doc(db, 'flats', id);
    return await deleteDoc(docRef);
  }
}