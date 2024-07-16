import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisexpressComponent } from './devisexpress.component';

describe('DevisexpressComponent', () => {
  let component: DevisexpressComponent;
  let fixture: ComponentFixture<DevisexpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisexpressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisexpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
