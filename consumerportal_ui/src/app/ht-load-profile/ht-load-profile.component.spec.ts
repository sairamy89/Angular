import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtLoadProfileComponent } from './ht-load-profile.component';

describe('HtLoadProfileComponent', () => {
  let component: HtLoadProfileComponent;
  let fixture: ComponentFixture<HtLoadProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtLoadProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtLoadProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
