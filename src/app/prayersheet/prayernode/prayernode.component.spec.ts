import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayernodeComponent } from './prayernode.component';

describe('PrayernodeComponent', () => {
  let component: PrayernodeComponent;
  let fixture: ComponentFixture<PrayernodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayernodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayernodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
