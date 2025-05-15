import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoformComponent } from './demoform.component';

describe('DemoformComponent', () => {
  let component: DemoformComponent;
  let fixture: ComponentFixture<DemoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
