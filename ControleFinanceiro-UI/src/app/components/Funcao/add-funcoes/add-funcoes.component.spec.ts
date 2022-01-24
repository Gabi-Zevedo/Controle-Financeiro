import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuncoesComponent } from './add-funcoes.component';

describe('AddFuncoesComponent', () => {
  let component: AddFuncoesComponent;
  let fixture: ComponentFixture<AddFuncoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFuncoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
