import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticPage } from './analytic.page';

describe('AnalyticPage', () => {
  let component: AnalyticPage;
  let fixture: ComponentFixture<AnalyticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
