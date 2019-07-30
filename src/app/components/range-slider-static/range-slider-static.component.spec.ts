import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderStaticPage } from './range-slider-static.page';

describe('RangeSliderStaticPage', () => {
  let component: RangeSliderStaticPage;
  let fixture: ComponentFixture<RangeSliderStaticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSliderStaticPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderStaticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
