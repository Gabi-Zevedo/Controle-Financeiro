import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGanhosComponent } from './add-ganhos.component';

describe('AddGanhosComponent', () => {
  let component: AddGanhosComponent;
  let fixture: ComponentFixture<AddGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGanhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
