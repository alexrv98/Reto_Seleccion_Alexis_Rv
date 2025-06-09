import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from '../../pages/product-form/product-form.component';

@Component({
  selector: 'app-product-form-modal',
  imports: [ProductFormComponent],
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.css'
})
export class ProductFormModalComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  
  get title(): string {
    return this.product ? 'Editar Producto' : 'Nuevo Producto';
  }
}
