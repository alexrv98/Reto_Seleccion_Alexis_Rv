import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters-category/product-filters.component';
import { ProductFiltersPriceComponent } from '../../components/product-filters/product-filters-price/product-filters-price.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-statistics',
  standalone: true,
  imports: [
    BaseChartDirective,
    ProductFiltersComponent,
    ProductFiltersPriceComponent,
    CommonModule],

  templateUrl: './product-statistics.component.html',
})
export class ProductStatisticsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showFilters = false;
  originalProducts: Product[] = [];

  selectedCategory: string | null = null;
  priceRange: { min: number, max: number } | null = null;

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6610f2']
      }
    ]
  };
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  
  ngOnInit() {
    this.categoryService.getAll().subscribe(cats => {
      this.categories = cats;

      this.productService.getAll().subscribe(products => {
        this.products = products;
        this.originalProducts = products;
        this.generateChart();
      });
    });
  }
  

  // Paleta de colores moderna para el gráfico
private chartColors = [
  'rgba(255, 107, 107, 0.8)',   // Rojo coral
  'rgba(254, 202, 87, 0.8)',    // Amarillo dorado
  'rgba(72, 219, 251, 0.8)',    // Azul cielo
  'rgba(255, 159, 243, 0.8)',   // Rosa vibrante
  'rgba(129, 236, 236, 0.8)',   // Cian claro
  'rgba(255, 195, 113, 0.8)',   // Naranja suave
  'rgba(165, 105, 255, 0.8)',   // Púrpura
  'rgba(95, 241, 175, 0.8)',    // Verde menta
  'rgba(255, 142, 142, 0.8)',   // Rosa salmón
  'rgba(115, 195, 255, 0.8)'    // Azul claro
];

private chartBorderColors = [
  'rgba(255, 107, 107, 1)',
  'rgba(254, 202, 87, 1)',
  'rgba(72, 219, 251, 1)',
  'rgba(255, 159, 243, 1)',
  'rgba(129, 236, 236, 1)',
  'rgba(255, 195, 113, 1)',
  'rgba(165, 105, 255, 1)',
  'rgba(95, 241, 175, 1)',
  'rgba(255, 142, 142, 1)',
  'rgba(115, 195, 255, 1)'
];

// Opciones mejoradas del chart
chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Ocultamos la leyenda por defecto
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        size: 13
      },
      callbacks: {
        label: (context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((context.parsed * 100) / total).toFixed(1);
          return `${context.label}: ${context.parsed} productos (${percentage}%)`;
        }
      }
    }
  },
  cutout: '60%',
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 2000,
    easing: 'easeInOutQuart'
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  elements: {
    arc: {
      borderWidth: 3,
      hoverBorderWidth: 4,
      hoverOffset: 10
    }
  }
};

// Genera los datos para el gráfico de productos por categoría
generateChart(): void {
  if (!this.products.length) {
    this.doughnutChartData = {
      labels: ['Sin datos'],
      datasets: [{
        data: [1],
        backgroundColor: ['rgba(224, 224, 224, 0.8)'],
        borderColor: ['rgba(224, 224, 224, 1)'],
        borderWidth: 2
      }]
    };
    return;
  }

  const counts: Record<string, number> = {};

  for (const p of this.products) {
    const catName = this.getCategoryName(p.category);
    counts[catName] = (counts[catName] || 0) + 1;
  }

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  // Asegurar que tenemos suficientes colores
  const backgroundColors = labels.map((_, index) => 
    this.chartColors[index % this.chartColors.length]
  );
  
  const borderColors = labels.map((_, index) => 
    this.chartBorderColors[index % this.chartBorderColors.length]
  );

  this.doughnutChartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 3,
      hoverBorderWidth: 4,
      hoverOffset: 10
    }]
  };
}

  // Calcula el promedio de precios de los productos
  get averagePrice(): number {
    if (!this.products.length) return 0;
    const total = this.products.reduce((sum, product) => sum + product.price, 0);
    return total / this.products.length;
  }

  // Devuelve el nombre de la categoría según su id
  getCategoryName(categoryId: string): string {
    const found = this.categories.find(c => c.id === categoryId);
    return found?.name ?? 'Sin categoría';
  }

  // Maneja la selección de categoría y aplica filtros
  onCategorySelected(category: string | null) {
    this.selectedCategory = category;
    this.applyAllFilters();
  }

  // Maneja la selección de rango de precios y aplica filtros
  onPriceRangeSelected(range: { min: number; max: number } | null) {
    this.priceRange = range;
    this.applyAllFilters();
  }

  // Aplica todos los filtros seleccionados a la lista de productos
  applyAllFilters(): void {
    // Partimos de todos los productos originales
    let filtered = [...this.originalProducts];

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.priceRange) {
      const { min, max } = this.priceRange;
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Actualizamos la lista de productos con el filtrado
    this.products = filtered;

    if (this.products.length === 0) {
      this.products = [...this.originalProducts];
    }
    this.generateChart();
  }
}
