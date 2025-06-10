import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarPublicacionComponent } from './editar-publicacion.component';

describe('EditarPublicacionComponent', () => {
  let component: EditarPublicacionComponent;
  let fixture: ComponentFixture<EditarPublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditarPublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
