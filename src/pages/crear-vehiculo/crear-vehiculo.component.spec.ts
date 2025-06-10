import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearVehiculoComponent } from './crear-vehiculo.component';

describe('CrearVehiculoComponent', () => {
  let component: CrearVehiculoComponent;
  let fixture: ComponentFixture<CrearVehiculoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CrearVehiculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
