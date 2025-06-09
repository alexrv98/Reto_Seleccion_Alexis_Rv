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
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Product>();


  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
