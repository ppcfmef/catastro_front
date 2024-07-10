import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SynchronizedRecordsContainerComponent } from './components/synchronized-records-container/synchronized-records-container.component';
import { ProcessedSynchronizationsContainerComponent } from './components/processed-synchronizations-container/processed-synchronizations-container.component';

@Component({
    selector: 'app-synchronization',
    standalone: true,
    imports: [
        CommonModule,
        SynchronizedRecordsContainerComponent,
        ProcessedSynchronizationsContainerComponent
    ],

    templateUrl: './synchronization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynchronizationComponent { }
