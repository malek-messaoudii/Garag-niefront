import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmenuComponent } from './gmenu.component';

describe('GmenuComponent', () => {
  let component: GmenuComponent;
  let fixture: ComponentFixture<GmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
