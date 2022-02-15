import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGanhosComponent } from './update-ganhos.component';

describe('UpdateGanhosComponent', () => {
  let component: UpdateGanhosComponent;
  let fixture: ComponentFixture<UpdateGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGanhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
