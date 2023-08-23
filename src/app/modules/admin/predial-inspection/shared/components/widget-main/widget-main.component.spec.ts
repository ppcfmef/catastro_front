import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMainComponent } from './widget-main.component';

describe('WidgetMainComponent', () => {
  let component: WidgetMainComponent;
  let fixture: ComponentFixture<WidgetMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
