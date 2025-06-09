import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { ProductCardsComponent } from '../../components/product-cards/product-cards.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { ProductFormModalComponent } from '../../components/product-form-modal/product-form-modal.component';
import { ProductService } from '../../services/product-service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterModule,
    ProductTableComponent,
    ProductCardsComponent,
    ProductFormComponent,
    ProductFormModalComponent

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  vistaCards = true;
  selectedProduct: Product | null = null;
  showFormModal = false;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.categories = [...new Set(data.map(p => p.category))];
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  onCategorySelected(category: string) {
    this.filteredProducts = category
      ? this.products.filter(p => p.category === category)
      : this.products;
  }

  async deleteProduct(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await this.productService.delete(id);
        this.loadProducts();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  }


  onAddProduct() {
    this.selectedProduct = null;
    this.showFormModal = true;
  }

  onEditProduct(product: Product) {
    this.selectedProduct = product;
    this.showFormModal = true;
  }

  onFormClosed() {
    this.showFormModal = false;
  }

  onFormSaved() {
    this.showFormModal = false;
    this.loadProducts();
  }


}
