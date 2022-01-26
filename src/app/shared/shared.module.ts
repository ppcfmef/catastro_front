import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardMenuItemComponent } from './components/card-menu-item/card-menu-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardMenuItemComponent
    ],
    declarations: [
      CardMenuItemComponent
    ]
})
export class SharedModule
{
}
