import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FaqService } from '../../services/faq.service';
import {MatPaginator} from '@angular/material/paginator';
import {Document} from '../../interfaces/document.interface';
import {merge, Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss']
})
export class FaqContainerComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	documents: Document[] = [];
	count = 0;
	changes = new Subject();
	textSearch = '';
	private unsubscribe$ = new Subject<any>();


	constructor(private catalogService: FaqService) {
	}

	ngOnInit(): void {
		this.getDocuments();
	}

	ngAfterViewInit(): void {
		this.initPagination();
	}

	getDocuments(): void {
		this.catalogService.getAll().subscribe((response: any) => {
			this.setDataResponse(response);
		});
	}

	getTextSearch(data: string): void {
		this.textSearch = data;
		this.changes.next();
	}

	initPagination(): void {
		merge(this.paginator.page, this.changes)
			.pipe(
				takeUntil(this.unsubscribe$),
				debounceTime(300),
				switchMap(() => {
					const queryParamsByPaginator = {
						limit: this.paginator.pageSize,
						offset: this.paginator.pageSize * this.paginator.pageIndex,
						search: this.textSearch
					};

					return this.catalogService.getAll(queryParamsByPaginator);
				})
			).subscribe((response) => {
			this.setDataResponse(response);
		});
	}

	setDataResponse(response: any): void {
		this.count = response.count;
		this.documents = response.results;
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
