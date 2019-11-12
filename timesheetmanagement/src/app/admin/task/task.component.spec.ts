import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [ FormsModule, Ng2SearchPipeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
