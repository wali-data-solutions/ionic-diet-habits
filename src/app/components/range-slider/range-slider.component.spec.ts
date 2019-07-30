import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderPage } from './range-slider.page';

describe('RangeSliderPage', () => {
  let component: RangeSliderPage;
  let fixture: ComponentFixture<RangeSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSliderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
