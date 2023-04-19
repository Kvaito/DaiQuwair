import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadpointComponent } from './add-roadpoint.component';

describe('AddRoadpointComponent', () => {
  let component: AddRoadpointComponent;
  let fixture: ComponentFixture<AddRoadpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoadpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoadpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
