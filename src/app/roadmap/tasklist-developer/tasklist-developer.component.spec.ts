import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistDeveloperComponent } from './tasklist-developer.component';

describe('TasklistDeveloperComponent', () => {
  let component: TasklistDeveloperComponent;
  let fixture: ComponentFixture<TasklistDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasklistDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasklistDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
