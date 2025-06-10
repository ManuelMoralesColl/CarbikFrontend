import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VehiculoEnVentaComponent } from './vehiculo-en-venta.component';

describe('VehiculoEnVentaComponent', () => {
  let component: VehiculoEnVentaComponent;
  let fixture: ComponentFixture<VehiculoEnVentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VehiculoEnVentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoEnVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
