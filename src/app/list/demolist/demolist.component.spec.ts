import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemolistComponent } from './demolist.component';

describe('DemolistComponent', () => {
  let component: DemolistComponent;
  let fixture: ComponentFixture<DemolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
