import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Component({
  selector: 'app-card-gap-menu-item',
  templateUrl: './card-gap-menu-item.component.html',
  styleUrls: ['./card-gap-menu-item.component.scss']
})
export class CardGapMenuItemComponent implements OnInit {
    @Input() item: FuseNavigationItem;
    @Input() bgColor = 'white';

    @Output() eventPageRedirect: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
