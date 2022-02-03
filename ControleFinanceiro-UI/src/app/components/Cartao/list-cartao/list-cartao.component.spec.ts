import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartaoComponent } from './list-cartao.component';

describe('ListCartaoComponent', () => {
  let component: ListCartaoComponent;
  let fixture: ComponentFixture<ListCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
