import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveViewComponent } from './executive-view.component';

describe('ExecutiveViewComponent', () => {
  let component: ExecutiveViewComponent;
  let fixture: ComponentFixture<ExecutiveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
