import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBillComponent } from './products-bill.component';

describe('ProductsBillComponent', () => {
  let component: ProductsBillComponent;
  let fixture: ComponentFixture<ProductsBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsBillComponent],
    });
    fixture = TestBed.createComponent(ProductsBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
