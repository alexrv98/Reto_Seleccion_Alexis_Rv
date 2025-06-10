import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-filters-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters-search.component.html',
})
export class ProductFiltersSearchComponent {
  searchTerm = '';

  @Output() search = new EventEmitter<string>();

  // Emite el término de búsqueda en minúsculas y sin espacios al componente padre cuando el usuario escribe.
  onInputChange() {
    this.search.emit(this.searchTerm.trim().toLowerCase());
  }
}
