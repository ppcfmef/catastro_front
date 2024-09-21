import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SynchronizedRecordsContainerComponent } from './components/synchronized-records-container/synchronized-records-container.component';

@Component({
    selector: 'app-synchronization',
    standalone: true,
    imports: [
        CommonModule,
        SynchronizedRecordsContainerComponent,
    ],

    templateUrl: './synchronization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynchronizationComponent implements OnInit {

    ngOnInit(): void {
    }
 }
