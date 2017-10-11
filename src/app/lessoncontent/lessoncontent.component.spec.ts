import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessoncontentComponent } from './lessoncontent.component';

describe('LessoncontentComponent', () => {
  let component: LessoncontentComponent;
  let fixture: ComponentFixture<LessoncontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessoncontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessoncontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
