import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private firestore = inject(Firestore);
  private categoryRef = collection(this.firestore, 'categories');

  // Obtiene todas las categorías
  getAll(): Observable<Category[]> {
    return collectionData(this.categoryRef, { idField: 'id' }) as Observable<Category[]>;
  }

  
}
