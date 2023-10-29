import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Products } from 'src/app/core/interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: Firestore) {}

  addProduct(product: Products) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  async getProducts(): Promise<any> {
    try {
      const productRef = collection(this.firestore, 'products');
      const allProducts = await getDocs(productRef);

      const productsData = allProducts.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          code: data['code'],
          name: data['name'],
          amount: data['amount'],
          price: data['price'],
        } as Products;
      });

      return productsData;
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(id: string, newAmount: number): Promise<boolean> {
    try {
      const productDocRef = doc(this.firestore, 'products', id);
      await updateDoc(productDocRef, { amount: newAmount });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
