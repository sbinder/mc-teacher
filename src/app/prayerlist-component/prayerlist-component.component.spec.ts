import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerlistComponentComponent } from './prayerlist-component.component';

describe('PrayerlistComponentComponent', () => {
  let component: PrayerlistComponentComponent;
  let fixture: ComponentFixture<PrayerlistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerlistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
