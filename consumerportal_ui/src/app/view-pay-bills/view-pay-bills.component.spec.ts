import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayBillsComponent } from './view-pay-bills.component';

describe('ViewPayBillsComponent', () => {
  let component: ViewPayBillsComponent;
  let fixture: ComponentFixture<ViewPayBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPayBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
