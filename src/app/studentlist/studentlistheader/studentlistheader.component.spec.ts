import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlistheaderComponent } from './studentlistheader.component';

describe('StudentlistheaderComponent', () => {
  let component: StudentlistheaderComponent;
  let fixture: ComponentFixture<StudentlistheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentlistheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentlistheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
