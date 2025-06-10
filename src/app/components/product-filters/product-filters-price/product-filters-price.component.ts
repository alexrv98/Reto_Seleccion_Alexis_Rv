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
  min = 0;
  max = 0;

  @Output() priceRangeSelected = new EventEmitter<{ min: number, max: number }>();

  // Emite el rango de precios seleccionado
  onPriceChange() {
    this.priceRangeSelected.emit({ min: this.min, max: this.max });
  }
}
