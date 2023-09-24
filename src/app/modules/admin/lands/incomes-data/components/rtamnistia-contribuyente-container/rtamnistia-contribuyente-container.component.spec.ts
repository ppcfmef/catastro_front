import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTAmnistiaContribuyenteContainerComponent } from './rtamnistia-contribuyente-container.component';

describe('RTAmnistiaContribuyenteContainerComponent', () => {
  let component: RTAmnistiaContribuyenteContainerComponent;
  let fixture: ComponentFixture<RTAmnistiaContribuyenteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTAmnistiaContribuyenteContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTAmnistiaContribuyenteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
