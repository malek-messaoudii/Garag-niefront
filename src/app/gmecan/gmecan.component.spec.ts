import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmecanComponent } from './gmecan.component';

describe('GmecanComponent', () => {
  let component: GmecanComponent;
  let fixture: ComponentFixture<GmecanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmecanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmecanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
