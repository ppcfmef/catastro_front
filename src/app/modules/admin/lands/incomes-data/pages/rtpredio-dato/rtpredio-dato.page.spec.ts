import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTPredioDatoPage } from './rtpredio-dato.page';

describe('RTPredioDatoPage', () => {
  let component: RTPredioDatoPage;
  let fixture: ComponentFixture<RTPredioDatoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTPredioDatoPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTPredioDatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
