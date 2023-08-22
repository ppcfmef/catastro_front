import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOperadorComponent } from './detail-operador.component';

describe('DetailOperadorComponent', () => {
  let component: DetailOperadorComponent;
  let fixture: ComponentFixture<DetailOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOperadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
