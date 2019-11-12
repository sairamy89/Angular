import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtReadingDetailsComponent } from './ht-reading-details.component';

describe('HtReadingDetailsComponent', () => {
  let component: HtReadingDetailsComponent;
  let fixture: ComponentFixture<HtReadingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtReadingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtReadingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
