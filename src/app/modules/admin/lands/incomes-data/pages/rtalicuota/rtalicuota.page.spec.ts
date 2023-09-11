import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAlicuotaPage } from './rtalicuota.page';

describe('RTAlicuotaPage', () => {
  let component: RTAlicuotaPage;
  let fixture: ComponentFixture<RTAlicuotaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAlicuotaPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAlicuotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
