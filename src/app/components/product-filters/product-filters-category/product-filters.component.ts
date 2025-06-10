import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.css',
})
export class ProductFiltersComponent {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string = ''; 

  // Emite la categoría seleccionada cuando cambia
  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.categorySelected.emit(value);
  }
}
