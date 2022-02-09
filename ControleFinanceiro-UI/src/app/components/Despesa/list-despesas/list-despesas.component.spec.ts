import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesasComponent } from './list-despesas.component';

describe('ListDespesasComponent', () => {
  let component: ListDespesasComponent;
  let fixture: ComponentFixture<ListDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDespesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
