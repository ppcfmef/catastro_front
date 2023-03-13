import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { NewOwnerLandPage } from './new-owner-land.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewOwnerLandPage', () => {
  let component: NewOwnerLandPage;
  let fixture: ComponentFixture<NewOwnerLandPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ NewOwnerLandPage ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call new-owner-container', () => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-new-owner-container')).not.toBe(null);
  });

  it('should call list-land-container', () => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-list-land-container')).not.toBe(null);
  });

  it('should call new-land-container', () => {
    fixture = TestBed.createComponent(NewOwnerLandPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-new-land-container')).not.toBe(null);
  });
});
