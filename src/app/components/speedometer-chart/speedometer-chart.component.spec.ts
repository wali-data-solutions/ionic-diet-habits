import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedometerChartPage } from './speedometer-chart.page';

describe('SpeedometerChartPage', () => {
  let component: SpeedometerChartPage;
  let fixture: ComponentFixture<SpeedometerChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedometerChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
