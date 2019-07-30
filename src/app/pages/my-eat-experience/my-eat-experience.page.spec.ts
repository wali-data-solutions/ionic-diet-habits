import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEatExperiencePage } from './my-eat-experience.page';

describe('MyEatExperiencePage', () => {
  let component: MyEatExperiencePage;
  let fixture: ComponentFixture<MyEatExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEatExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEatExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
