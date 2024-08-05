import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrdvComponent } from './grdv.component';

describe('GrdvComponent', () => {
  let component: GrdvComponent;
  let fixture: ComponentFixture<GrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
