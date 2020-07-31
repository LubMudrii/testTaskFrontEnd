import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookDialogComponent } from './create-book-dialog.component';

describe('CreateBookDialogComponent', () => {
  let component: CreateBookDialogComponent;
  let fixture: ComponentFixture<CreateBookDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
