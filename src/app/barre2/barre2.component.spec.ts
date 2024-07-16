import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barre2Component } from './barre2.component';

describe('Barre2Component', () => {
  let component: Barre2Component;
  let fixture: ComponentFixture<Barre2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Barre2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Barre2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
