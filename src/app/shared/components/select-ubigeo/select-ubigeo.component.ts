import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Department, Province, District } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'select-ubigeo',
  templateUrl: './select-ubigeo.component.html',
  styleUrls: ['./select-ubigeo.component.scss']
})
export class SelectUbigeoComponent implements OnInit, OnDestroy {
  @Output() ubigeoSelected: EventEmitter<string> = new EventEmitter<string>();
  departments$: Observable<Department[]>;
  provinces$: Observable<Province[]>;
  districts$: Observable<District[]>;
  unsubscribeAll: Subject<any> = new Subject<any>();
  paramsUbigeo: any= {
    dpto: null,
    prov: null,
    ubigeo: null,
  };
  selectionText={
    dep:'',
    prov:'',
    dist:''
  };
  hideUbigeo = true;

  constructor(private commonService: CommonService,) { }

  ngOnInit(): void {
    this.initUbigeoParams();
  }

  initUbigeoParams(): void {
    this.departments$ = this.commonService.getDepartments()
    .pipe(
      takeUntil(this.unsubscribeAll)
    );
  }

  selectDep(event: any): void {
    this.paramsUbigeo.dpto = event.value.code;
    this.selectionText={
      dep:event.value.name,
      prov:'',
      dist:''
    };
    this.provinces$ = this.commonService.getProvinces({
        department: this.paramsUbigeo.dpto,
    }).pipe(
      takeUntil(this.unsubscribeAll)
    );
    this.districts$ =  null;
  }

  selectProv(event: any): void {
    this.paramsUbigeo.prov = event.value.code;
    this.selectionText.prov = event.value.name;
    this.selectionText.dist= '';
    this.districts$ = this.commonService.getDistricts({
        province: `${this.paramsUbigeo.prov}`,
    }).pipe(
      takeUntil(this.unsubscribeAll)
    );;
  }

  selectDist(event: any): void {
    this.paramsUbigeo.ubigeo = event.value.code;
    this.selectionText.dist = event.value.name;
    this.hideUbigeo = true;
    this.ubigeoSelected.emit(this.paramsUbigeo.ubigeo);
  }

  openCloseUbigeo(close: string = ''): void{
    if(close === 'close'){
      this.hideUbigeo = true;
      return;
    }
    this.hideUbigeo = !this.hideUbigeo;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

}
