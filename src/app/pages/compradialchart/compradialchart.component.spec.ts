import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradialchartComponent } from './compradialchart.component';

describe('CompradialchartComponent', () => {
  let component: CompradialchartComponent;
  let fixture: ComponentFixture<CompradialchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompradialchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradialchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
