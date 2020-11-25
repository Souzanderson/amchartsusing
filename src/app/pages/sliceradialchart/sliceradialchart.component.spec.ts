import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceradialchartComponent } from './sliceradialchart.component';

describe('SliceradialchartComponent', () => {
  let component: SliceradialchartComponent;
  let fixture: ComponentFixture<SliceradialchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliceradialchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceradialchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
