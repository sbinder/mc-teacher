import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatinglistComponent } from './ratinglist.component';

describe('RatinglistComponent', () => {
  let component: RatinglistComponent;
  let fixture: ComponentFixture<RatinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
