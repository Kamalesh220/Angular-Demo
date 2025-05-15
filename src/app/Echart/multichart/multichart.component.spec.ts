import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichartComponent } from './multichart.component';

describe('MultichartComponent', () => {
  let component: MultichartComponent;
  let fixture: ComponentFixture<MultichartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultichartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultichartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
