import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvvenirComponent } from './rdvvenir.component';

describe('RdvvenirComponent', () => {
  let component: RdvvenirComponent;
  let fixture: ComponentFixture<RdvvenirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvvenirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
