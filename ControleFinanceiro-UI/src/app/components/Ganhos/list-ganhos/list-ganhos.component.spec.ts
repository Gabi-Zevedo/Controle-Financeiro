import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGanhosComponent } from './list-ganhos.component';

describe('ListGanhosComponent', () => {
  let component: ListGanhosComponent;
  let fixture: ComponentFixture<ListGanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGanhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
