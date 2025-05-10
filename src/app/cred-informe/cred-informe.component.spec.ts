import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredInformeComponent } from './cred-informe.component';

describe('CredInformeComponent', () => {
  let component: CredInformeComponent;
  let fixture: ComponentFixture<CredInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredInformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
