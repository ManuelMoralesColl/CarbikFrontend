import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeSiguiendoComponent } from './home-siguiendo.component';

describe('HomeSiguiendoComponent', () => {
  let component: HomeSiguiendoComponent;
  let fixture: ComponentFixture<HomeSiguiendoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeSiguiendoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSiguiendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
