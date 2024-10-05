import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsnavComponent } from './adminsnav.component';

describe('AdminsnavComponent', () => {
  let component: AdminsnavComponent;
  let fixture: ComponentFixture<AdminsnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminsnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminsnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
