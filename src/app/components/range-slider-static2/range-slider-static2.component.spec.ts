import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderStatic2Page } from './range-slider-static2.page';

describe('RangeSliderStatic2Page', () => {
  let component: RangeSliderStatic2Page;
  let fixture: ComponentFixture<RangeSliderStatic2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSliderStatic2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderStatic2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
