import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-processed-synchronizations-container',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './processed-synchronizations-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessedSynchronizationsContainerComponent { }
