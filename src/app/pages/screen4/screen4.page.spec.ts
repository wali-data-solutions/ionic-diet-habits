import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen4Page } from './screen4.page';

describe('Screen4Page', () => {
  let component: Screen4Page;
  let fixture: ComponentFixture<Screen4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
