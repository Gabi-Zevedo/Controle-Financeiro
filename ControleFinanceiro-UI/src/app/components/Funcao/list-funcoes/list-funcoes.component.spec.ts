import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuncoesComponent } from './list-funcoes.component';

describe('ListFuncoesComponent', () => {
  let component: ListFuncoesComponent;
  let fixture: ComponentFixture<ListFuncoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFuncoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
