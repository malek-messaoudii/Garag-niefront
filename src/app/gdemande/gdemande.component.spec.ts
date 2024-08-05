import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdemandeComponent } from './gdemande.component';

describe('GdemandeComponent', () => {
  let component: GdemandeComponent;
  let fixture: ComponentFixture<GdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
