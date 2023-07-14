import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllRequestComponent } from './student-all-request.component';

describe('StudentAllRequestComponent', () => {
  let component: StudentAllRequestComponent;
  let fixture: ComponentFixture<StudentAllRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAllRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAllRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
