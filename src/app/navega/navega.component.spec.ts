import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegaComponent } from './navega.component';

describe('NavegaComponent', () => {
  let component: NavegaComponent;
  let fixture: ComponentFixture<NavegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavegaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
