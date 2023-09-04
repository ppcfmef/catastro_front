import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewLoadService } from '../../services/new-load.service';
import { Subject, merge } from 'rxjs';
import { TableService } from '../../services/table.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormUtils } from 'app/shared/utils/form.utils';




@Component({
  selector: 'app-load-list',
  templateUrl:'./load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit,AfterViewInit {

    formFilters: FormGroup;
    filters;
    states: string[] = [
        'Codigo',
        'Unidad urbana'
    ];
    options = [
        {id: 'code', description: 'Codigo'},
        {id: 'urban', description: 'Unidad urbana'},
    ];
    listUnit = [];

    optionSelect: string;
    private _unsuscribe = new Subject();
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _newLoadService: NewLoadService,
        private _tableService: TableService,
        private _ngxSpinner: NgxSpinnerService,
        ) {
            this.createFormFilters();
         }

    ngOnInit(): void {
        this.getListUrbanUnit();
    }

    ngAfterViewInit(): void {
        this.emitFilter();
      }

    redirecto(): void {
        this._router.navigate(['assign-load'], { relativeTo: this._route });
        this._newLoadService.showIcon.next(true);
    }

    createFormFilters(): void {
        this.formFilters = new FormGroup({
            option: new FormControl(),
            search: new FormControl({value: null, disabled: true}),
            cod: new FormControl(),
        });
    }

    getListUrbanUnit(): void {
        this._tableService.getListUrbantUnit().then((data) => {
            this.listUnit = [...data];
        });
    }

    optionSelected(e): void {
        this.optionSelect = e.value;
        console.log(this.optionSelect, 'here option');

        if(this.formFilters.controls['search'].value){
            this.formFilters.controls['search'].reset();
        }

        if(this.formFilters.controls['cod'].value){
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
                if(filters['cod']){
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
            console.log(data , 'dattt');
        });
    }



}
