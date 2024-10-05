import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpnavComponent } from './empnav.component';

describe('EmpnavComponent', () => {
  let component: EmpnavComponent;
  let fixture: ComponentFixture<EmpnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
