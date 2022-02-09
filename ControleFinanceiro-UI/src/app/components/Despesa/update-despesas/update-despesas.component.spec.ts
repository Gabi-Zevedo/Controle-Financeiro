import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDespesasComponent } from './update-despesas.component';

describe('UpdateDespesasComponent', () => {
  let component: UpdateDespesasComponent;
  let fixture: ComponentFixture<UpdateDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDespesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
