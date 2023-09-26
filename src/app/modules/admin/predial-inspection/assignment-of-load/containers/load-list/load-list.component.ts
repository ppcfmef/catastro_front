import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewLoadService } from '../../services/new-load.service';
import { Subject } from 'rxjs';
import { TableService } from '../../services/table.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, takeUntil, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormUtils } from 'app/shared/utils/form.utils';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { OperatorService } from '../../services/operator.service';




@Component({
    selector: 'app-load-list',
    templateUrl: './load-list.component.html',
    styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit, AfterViewInit, OnDestroy {

    formFilters: FormGroup;
    filters;
    states: string[] = [
        'Codigo',
        'Unidad urbana'
    ];
    options = [
        { id: 'code', description: 'Codigo' },
        { id: 'urban', description: 'Unidad urbana' },
    ];
    listUnit = [];
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUserUbigeo: string;
    optionSelect: string;
    private _unsuscribe = new Subject();
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _newLoadService: NewLoadService,
        private _tableService: TableService,
        private _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        private _operatorService: OperatorService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this._operatorService.getUbigeo().subscribe((data) => {
            this._currentUserUbigeo = data;
            this.getListUrbanUnit();
        });
    }

    ngAfterViewInit(): void {
        this.emitFilter();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    redirecto(): void {
        this._router.navigate(['assign-load'], { relativeTo: this._route });
        this._newLoadService.showIcon.next(true);
    }

    createFormFilters(): void {
        this.formFilters = new FormGroup({
            option: new FormControl(),
            search: new FormControl({ value: null, disabled: true }),
            cod: new FormControl(),
        });
    }

    getListUrbanUnit(): void {
        setTimeout(() => {
            this._tableService.getListUrbantUnit(this._currentUserUbigeo).then((data) => {
                if (typeof (data) === 'string') {
                    this.listUnit = [];
                } else {
                    this.listUnit = [...data];
                }
            });
        }, 1000);
    }

    optionSelected(e): void {
        this.optionSelect = e.value;
        console.log(this.optionSelect, 'here option');

        if (this.formFilters.controls['search'].value) {
            this.formFilters.controls['search'].reset();
        }

        if (this.formFilters.controls['cod'].value) {
            this.formFilters.controls['cod'].reset();
        }

        if (this.optionSelect) {
            this.formFilters.controls['search'].enable();
        } else {
            this.formFilters.controls['search'].disable();
        }
    }

    emitFilter(): void {
        this.formFilters.valueChanges
            .pipe(
                debounceTime(600),
                map(() => {
                    this._ngxSpinner.show();
                    const rawValue = this.formFilters.getRawValue();
                    const filters = FormUtils.deleteKeysNullInObject(rawValue);
                    if (filters['search']) {
                        filters['type'] = this.optionSelect;
                        console.log(filters, 'filt');
                    }
                    if (filters['cod']) {
                        filters['type'] = this.optionSelect;
                    }
                    if (filters['option']) {
                        delete filters.option;
                    }
                    const newFilters = { ...filters } as any;
                    return newFilters;
                })
            ).subscribe((data) => {
                this._tableService.searchBy.next(data);
                this._ngxSpinner.hide();
            });
    }



}
