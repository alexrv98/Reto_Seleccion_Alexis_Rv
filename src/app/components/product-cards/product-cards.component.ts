import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-cards',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-cards.component.html',
})
export class ProductCardsComponent {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Product>();

  // Devuelve un array para mostrar estrellas llenas según el rating
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Devuelve un array para mostrar estrellas vacías según el rating
  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  // Devuelve el nombre de la categoría según su id
  getCategoryName(id: string): string {
    return this.categories.find(c => c.id === id)?.name || 'Sin categoría';
  }

  // Emite el evento para eliminar un producto
  onDelete(id: string) {
    this.delete.emit(id);
  }


  
}
