import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointlistComponent } from './pointlist.component';

describe('PointlistComponent', () => {
  let component: PointlistComponent;
  let fixture: ComponentFixture<PointlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
