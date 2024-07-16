import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestComponent } from './prest.component';

describe('PrestComponent', () => {
  let component: PrestComponent;
  let fixture: ComponentFixture<PrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
