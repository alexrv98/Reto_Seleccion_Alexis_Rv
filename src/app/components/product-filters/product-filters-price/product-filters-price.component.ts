import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-filters-price',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters-price.component.html',
})
export class ProductFiltersPriceComponent {
  min: number | null = null;
  max: number | null = null;

  @Output() priceRangeSelected = new EventEmitter<{ min: number, max: number }>();

  onPriceChange() {
    this.priceRangeSelected.emit({
      min: this.min ?? 0,
      max: this.max ?? 0
    });
  }
}

