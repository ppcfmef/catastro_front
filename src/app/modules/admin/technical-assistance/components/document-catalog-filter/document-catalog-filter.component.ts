import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-document-catalog-filter',
	templateUrl: './document-catalog-filter.component.html',
	styleUrls: ['./document-catalog-filter.component.scss']
})
export class DocumentCatalogFilterComponent implements OnInit, OnDestroy {
	@Output() searchValue: EventEmitter<any> = new EventEmitter<any>();
	searchControl = new FormControl();
	unsubscribe$ = new Subject();

	constructor() {
	}

	ngOnInit(): void {
		this.searchControl.valueChanges
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(value => this.searchValue.emit(value));
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	clearSearchControl(): void{
		this.searchControl.reset();
		this.searchValue.emit('');
	}
}
