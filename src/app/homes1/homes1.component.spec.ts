import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homes1Component } from './homes1.component';

describe('Homes1Component', () => {
  let component: Homes1Component;
  let fixture: ComponentFixture<Homes1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Homes1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homes1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
