import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: [
      '',
      [
        Validators.pattern(/^https:\/\/.+\.(jpg|jpeg|png|gif|webp|img)(\?.*)?$/i),
      ],
    ],
  });

  isEditMode = false;
  starsArray = Array.from({ length: 5 });
  categories: Category[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  // Inicializa el formulario con los datos del producto si existe
  private initForm(): void {
    if (this.product) {
      this.isEditMode = true;
      this.form.patchValue(this.product);
    }
  }

  // Carga la lista de categorías desde el servicio
  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error al cargar categorías:', err),
    });
  }

  // Envía el formulario para crear o actualizar un producto
  async onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value as Product;

    try {
      if (this.isEditMode && this.product?.id) {
        await this.productService.update(this.product.id, data);
        console.log('Producto actualizado');
      } else {
        await this.productService.create(data);
        console.log('Producto creado');
      }
      this.saved.emit();
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  }

  // Asigna una calificación al producto en el formulario
  setRating(value: number) {
    this.form.patchValue({ rating: value });
    this.f['rating'].markAsTouched();
  }

  // Cancela el formulario y emite el evento de cierre
  onCancel() {
    this.close.emit();
  }

  // Devuelve los controles del formulario
  get f() {
    return this.form.controls;
  }

  // Devuelve el control de calificación del formulario
  get ratingCtrl() {
    return this.form.get('rating');
  }
}
