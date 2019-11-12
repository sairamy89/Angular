import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetComponent ],
      imports: [ FormsModule, Ng2SearchPipeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
