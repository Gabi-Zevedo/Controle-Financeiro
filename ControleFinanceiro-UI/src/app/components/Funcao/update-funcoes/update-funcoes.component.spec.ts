import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFuncoesComponent } from './update-funcoes.component';

describe('UpdateFuncoesComponent', () => {
  let component: UpdateFuncoesComponent;
  let fixture: ComponentFixture<UpdateFuncoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFuncoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
