import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Products } from 'src/app/core/interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: Firestore) {}

  addMood(mood: Products) {
    const moodRef = collection(this.firestore, 'moods');
    return addDoc(moodRef, mood);
  }

  getMoods(): Observable<Products[]> {
    const moodRef = collection(this.firestore, 'moods');
    return collectionData(moodRef, { idField: 'id' }) as Observable<Products[]>;
  }
}
