import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const productServiceMock = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
    searchByName: jasmine.createSpy('searchByName').and.returnValue(of([])),
    delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
  };

  const categoryServiceMock = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
  };

  const toastrServiceMock = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        RouterTestingModule // <--- Aquí está la clave
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Auth, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar productos al iniciar', () => {
    expect(productServiceMock.getAll).toHaveBeenCalled();
  });

  it('debería cargar categorías al iniciar', () => {
    expect(categoryServiceMock.getAll).toHaveBeenCalled();
  });

  it('debería navegar a estadísticas', () => {
    const router = TestBed.inject(RouterTestingModule);
    spyOn(component['router'], 'navigate');
    component.goToStatistics();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/estadisticas']);
  });
});
