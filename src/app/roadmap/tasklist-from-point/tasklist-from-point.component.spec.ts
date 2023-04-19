import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistFromPointComponent } from './tasklist-from-point.component';

describe('TasklistFromPointComponent', () => {
  let component: TasklistFromPointComponent;
  let fixture: ComponentFixture<TasklistFromPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasklistFromPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasklistFromPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
