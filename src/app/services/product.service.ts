import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy, where, startAt, endAt } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { DocumentReference, serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);
  private productsRef = collection(this.firestore, 'products');
  private productDocRef(id: string): DocumentReference {
    return doc(this.firestore, `products/${id}`);
  }

  // Obtiene todos los productos ordenados por fecha de creación descendente
  getAll(): Observable<Product[]> {
    const q = query(this.productsRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  // Obtiene un producto por su ID, retorna undefined si no existe
  getById(id: string): Promise<Product | undefined> {
    return getDoc(this.productDocRef(id)).then(snapshot =>
      snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Product : undefined
    );
  }

  // Creación de producto
  async create(product: Product): Promise<string> {
    const newProduct = {
      ...product,
      name_lowercase: product.name.toLowerCase(), 
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(this.productsRef, newProduct);
    return docRef.id;
  }



  // Actualiza producto
  update(id: string, product: Partial<Product>): Promise<void> {
    return updateDoc(this.productDocRef(id), {
      ...product,
      ...(product.name && { name_lowercase: product.name.toLowerCase() }),
      updatedAt: serverTimestamp()
    });
  }

  // Elimina un producto
  delete(id: string): Promise<void> {
    return deleteDoc(this.productDocRef(id));
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
