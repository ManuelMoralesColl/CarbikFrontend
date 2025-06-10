import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarVehiculoComponent } from './editar-vehiculo.component';

describe('EditarVehiculoComponent', () => {
  let component: EditarVehiculoComponent;
  let fixture: ComponentFixture<EditarVehiculoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditarVehiculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
