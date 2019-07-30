import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen5Page } from './screen5.page';

describe('Screen5Page', () => {
  let component: Screen5Page;
  let fixture: ComponentFixture<Screen5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
