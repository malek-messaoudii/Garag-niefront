import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeldevisComponent } from './teldevis.component';

describe('TeldevisComponent', () => {
  let component: TeldevisComponent;
  let fixture: ComponentFixture<TeldevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeldevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeldevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
