import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GintervComponent } from './ginterv.component';

describe('GintervComponent', () => {
  let component: GintervComponent;
  let fixture: ComponentFixture<GintervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GintervComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GintervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
