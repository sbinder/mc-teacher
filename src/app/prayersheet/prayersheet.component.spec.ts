import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayersheetComponent } from './prayersheet.component';

describe('PrayersheetComponent', () => {
  let component: PrayersheetComponent;
  let fixture: ComponentFixture<PrayersheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayersheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
