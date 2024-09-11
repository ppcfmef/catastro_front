import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'check-ticket',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './check-ticket.component.html',
    styleUrls: ['./check-ticket.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckTicketComponent { }
