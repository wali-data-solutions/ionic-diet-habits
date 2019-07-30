import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedometerGuiltChartPage } from './speedometer-guilt-chart.page';

describe('SpeedometerGuiltChartPage', () => {
  let component: SpeedometerGuiltChartPage;
  let fixture: ComponentFixture<SpeedometerGuiltChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedometerGuiltChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerGuiltChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
