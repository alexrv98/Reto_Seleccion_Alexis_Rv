import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters-category/product-filters.component';
import { ProductCardsComponent } from '../../components/product-cards/product-cards.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductFormModalComponent } from '../../components/product-form-modal/product-form-modal.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductFiltersPriceComponent } from '../../components/product-filters/product-filters-price/product-filters-price.component';
import { ProductFiltersSearchComponent } from '../../components/product-filters/product-filters-search/product-filters-search.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductFiltersComponent,
    ProductTableComponent,
    ProductCardsComponent,
    ProductFormComponent,
    ProductFormModalComponent,
    ProductFiltersPriceComponent,
    ProductFiltersSearchComponent
  ],



  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  vistaCards = true;
  selectedProduct: Product | null = null;
  showFormModal = false;
  showFilters = false;
  sortField: 'name' | 'price' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 8;
  selectedCategory: string | null = null;
  priceRange: { min: number, max: number } | null = null;
  searchTerm: string = '';



  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  //Carga de productos
  loadProducts() {
    this.productService.getAll().subscribe({
      next: data => this.setProducts(data),
      error: error => this.handleError('productos', error)
    });
  }

  private setProducts(data: Product[]) {
    this.products = data;
    this.filteredProducts = data;
  }

  //Carga de categorías
  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: data => (this.categories = data),
      error: err => this.handleError('categorías', err)
    });
  }

  //Selección de categoría
  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.applyAllFilters();
  }


  //Eliminación de producto
  async deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await this.productService.delete(id);
      this.loadProducts();
    } catch (error) {
      this.handleError('eliminar producto', error, true);
    }
  }

  //Agregar y editar producto
  onAddProduct() {
    this.selectedProduct = null;
    this.showFormModal = true;
  }
  onEditProduct(product: Product) {
    this.selectedProduct = product;
    this.showFormModal = true;
  }

  //Cerrar formulario
  onFormClosed() {
    this.showFormModal = false;
  }

  //Guardar
  onFormSaved() {
    this.showFormModal = false;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.applyAllFilters(); // <--- esta es la clave
      },
      error: (error) => this.handleError('productos', error)
    });
  }

  // Manejo de errores
  private handleError(context: string, error: any, alertUser: boolean = false) {
    console.error(`Error al ${context}:`, error);
    if (alertUser) alert(`Error al ${context}`);
  }

  // Método para filtrar productos por rango de precios
  onPriceRangeSelected(range: { min: number, max: number }) {
    this.priceRange = range;
    this.applyAllFilters();
  }

  // Método para filtrar productos por búsqueda contra Baas
  onSearch(term: string) {
    this.searchTerm = term;
    this.applyAllFilters();
  }

  // Método para sacar el promedio de precios de los productos
  get averagePrice(): number {
    if (!this.filteredProducts.length) return 0;
    const total = this.filteredProducts.reduce((sum, product) => sum + product.price, 0);
    return total / this.filteredProducts.length;
  }


  applyAllFilters() {
    if (this.searchTerm) {
      // Búsqueda contra el backend
      this.productService.searchByName(this.searchTerm).subscribe({
        next: (data) => {
          let filtered = [...data];

          // Filtro por categoría
          if (this.selectedCategory) {
            filtered = filtered.filter(p => p.category === this.selectedCategory);
          }

          // Filtro por precio
          if (this.priceRange) {
            const { min, max } = this.priceRange;
            filtered = filtered.filter(p => {
              const price = p.price ?? 0;
              return (!min || price >= min) && (!max || price <= max);
            });
          }

          this.filteredProducts = filtered;
          this.currentPage = 1;
        },
        error: (err) => {
          console.error('Error en búsqueda por nombre:', err);
          this.filteredProducts = [];
        }
      });
    } else {
      // Búsqueda local si no hay término
      let filtered = [...this.products];

      if (this.selectedCategory) {
        filtered = filtered.filter(p => p.category === this.selectedCategory);
      }

      if (this.priceRange) {
        const { min, max } = this.priceRange;
        filtered = filtered.filter(p => {
          const price = p.price ?? 0;
          return (!min || price >= min) && (!max || price <= max);
        });
      }

      this.filteredProducts = filtered;
      this.currentPage = 1;
    }
  }




  get paginatedAndSortedProducts(): Product[] {
    const sorted = [...this.filteredProducts].sort((a, b) => {
      const fieldA = a[this.sortField];
      const fieldB = b[this.sortField];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return this.sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return this.sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return sorted.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pagesToShow = 4;
    const total = this.totalPages;

    let start = Math.max(this.currentPage - Math.floor(pagesToShow / 2), 1);
    let end = start + pagesToShow - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - pagesToShow + 1, 1);
    }

    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return numbers;
  }




}
