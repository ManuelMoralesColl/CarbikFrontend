import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VehiculoFiltradosComponent } from './vehiculo-filtrados.component';

describe('VehiculoFiltradosComponent', () => {
  let component: VehiculoFiltradosComponent;
  let fixture: ComponentFixture<VehiculoFiltradosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VehiculoFiltradosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoFiltradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
