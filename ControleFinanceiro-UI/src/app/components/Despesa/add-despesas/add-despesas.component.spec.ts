import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDespesasComponent } from './add-despesas.component';

describe('AddDespesasComponent', () => {
  let component: AddDespesasComponent;
  let fixture: ComponentFixture<AddDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDespesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
