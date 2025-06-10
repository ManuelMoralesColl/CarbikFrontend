import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfilVisitadoComponent } from './perfil-visitado.component';

describe('PerfilVisitadoComponent', () => {
  let component: PerfilVisitadoComponent;
  let fixture: ComponentFixture<PerfilVisitadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PerfilVisitadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilVisitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
