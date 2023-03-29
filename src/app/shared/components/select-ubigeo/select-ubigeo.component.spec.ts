import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUbigeoComponent } from './select-ubigeo.component';

describe('SelectUbigeoComponent', () => {
  let component: SelectUbigeoComponent;
  let fixture: ComponentFixture<SelectUbigeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUbigeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
