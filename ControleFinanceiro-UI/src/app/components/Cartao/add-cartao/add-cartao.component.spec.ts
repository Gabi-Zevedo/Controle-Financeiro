import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartaoComponent } from './add-cartao.component';

describe('AddCartaoComponent', () => {
  let component: AddCartaoComponent;
  let fixture: ComponentFixture<AddCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
