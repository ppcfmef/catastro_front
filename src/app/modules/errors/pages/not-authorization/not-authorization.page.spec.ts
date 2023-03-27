import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizationPage } from './not-authorization.page';

describe('NotAuthorizationPage', () => {
  let component: NotAuthorizationPage;
  let fixture: ComponentFixture<NotAuthorizationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthorizationPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
