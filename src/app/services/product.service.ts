import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy, where, startAt, endAt } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);
  private productsRef = collection(this.firestore, 'products');


  // Obtiene todos los productos ordenados por fecha de creación descendente
  getAll(): Observable<Product[]> {
    const q = query(this.productsRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  // Obtiene un producto por su ID, retorna undefined si no existe
  getById(id: string): Promise<Product | undefined> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return getDoc(productDoc).then(snapshot => {
      if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() } as Product;
      return undefined;
    });
  }

  // Creación de producto
  create(product: Product): Promise<void> {
    const newProduct = {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    return addDoc(this.productsRef, newProduct).then(() => { });
  }

  // Actualiza producto
  update(id: string, product: Partial<Product>): Promise<void> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return updateDoc(productDoc, {
      ...product,
      updatedAt: serverTimestamp()
    });
  }

  // Elimina un producto
  delete(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }

  //Buscar productos por nombre
  searchByName(term: string): Observable<Product[]> {
    const trimmed = term.toLowerCase();
    const q = query(
      this.productsRef,
      orderBy('name_lowercase'),
      startAt(trimmed),
      endAt(trimmed + '\uf8ff')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }
}
