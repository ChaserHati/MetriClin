import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerevaluacionComponent } from './verevaluacion.component';

describe('VerevaluacionComponent', () => {
  let component: VerevaluacionComponent;
  let fixture: ComponentFixture<VerevaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerevaluacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
