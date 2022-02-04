import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FuseNavigationItem} from '../../../../@fuse/components/navigation';

@Component({
    selector: 'app-card-menu-item',
    templateUrl: './card-menu-item.component.html',
    styleUrls: ['./card-menu-item.component.scss']
})
export class CardMenuItemComponent implements OnInit {

    @Input() item: FuseNavigationItem;
    @Input() bgColor = 'white';

    @Output() eventPageRedirect: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
