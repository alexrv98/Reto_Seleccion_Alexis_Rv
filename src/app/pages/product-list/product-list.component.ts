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

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterModule,
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


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

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
    this.filteredProducts = category
      ? this.products.filter(p => p.category === category)
      : this.products;
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
    this.loadProducts();
  }

  // Manejo de errores
  private handleError(context: string, error: any, alertUser: boolean = false) {
    console.error(`Error al ${context}:`, error);
    if (alertUser) alert(`Error al ${context}`);
  }
  
  // Método para filtrar productos por rango de precios
  onPriceRangeSelected(range: { min: number, max: number }) {
  this.filteredProducts = this.products.filter(p => {
    const price = p.price ?? 0;
    return (!range.min || price >= range.min) &&
           (!range.max || price <= range.max);
  });
  }

  // Método para filtrar productos por búsqueda contra Baas
  onSearch(term: string) {
  if (!term) {
    this.loadProducts();
  } else {
    this.productService.searchByName(term).subscribe({
      next: (data) => (this.filteredProducts = data),
      error: (err) => console.error('Error en búsqueda por nombre:', err),
    });
  }
  }


}
