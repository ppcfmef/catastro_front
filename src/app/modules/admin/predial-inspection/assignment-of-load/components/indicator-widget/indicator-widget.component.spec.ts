import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorWidgetComponent } from './indicator-widget.component';

describe('IndicatorWidgetComponent', () => {
    let component: IndicatorWidgetComponent;
    let fixture: ComponentFixture<IndicatorWidgetComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ IndicatorWidgetComponent ]
    })
    .compileComponents();
    });

    beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
