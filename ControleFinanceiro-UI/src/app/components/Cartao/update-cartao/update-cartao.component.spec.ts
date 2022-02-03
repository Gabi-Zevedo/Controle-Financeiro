import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCartaoComponent } from './update-cartao.component';

describe('UpdateCartaoComponent', () => {
  let component: UpdateCartaoComponent;
  let fixture: ComponentFixture<UpdateCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
