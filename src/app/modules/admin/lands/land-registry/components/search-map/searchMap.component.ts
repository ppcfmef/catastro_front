import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { CFLoteService } from '../../services/cflote.service';
import { CFPredioService } from '../../services/cfpredio.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';
import { UserService } from 'app/core/user/user.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { FuseValidators } from '@fuse/validators';

@Component({
    selector: 'search-map',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: './search-map.component.html',
    styleUrls: ['./search-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent implements OnInit, OnDestroy {
    @Output() eventOnGo: EventEmitter<any>= new EventEmitter();
    @ViewChild('searchOrigin') private _searchOrigin: ElementRef;
    @ViewChild('searchPanel') private _messagesPanel: TemplateRef<any>;
    ubigeo: string;
    masterDomain: MasterDomain;
    searchForm: any;
    options = [];
    selectedOption: string | null = null;
    results: any[]= null;
    //pr:any;
    limit=10;
    init=true;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private landRegistryService: LandRegistryService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _cfLoteService: CFLoteService,
        private _cfPredioService: CFPredioService,
        private _userService: UserService,

    ) {
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {

           /*console.log('this.user>>', this.user);*/
           console.log(user);
            this.ubigeo =user?.ubigeo;

        });

    }
    ngOnInit(): void {


        this.landRegistryService
            .getMasterDomain()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) =>
                {
                    this.masterDomain = result;
                console.log('this.masterDomain>>',this.masterDomain);
            });

        this.searchForm = {
            pr: null,
            mz: null,
            lt: null,
            tipovia: null,
            door: null,
            habUrb: null,
            tipouu:null,
            address: null,
            via: null,
        };
        /*this.searchForm = new FormGroup({
            pr: new FormControl(null,Validators.required),
            mz: new FormControl(),
            lt: new FormControl(),
            cod: new FormControl(),
            door: new FormControl(),
            habUrb: new FormControl(),
            address: new FormControl(),
            via: new FormControl(),
        });*/

        this.options = [
            {
                cod: '1',
                option: 'Partida Registral',
            },
            {
                cod: '2',
                option: 'Dirección',
            },
            {
                cod: '3',
                option: 'Unidad urbana',
            },
        ];
    }

    openPanel(): void {
        // Return if the messages panel or its origin is not defined
        if (!this._messagesPanel || !this._searchOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(
            new TemplatePortal(this._messagesPanel, this._viewContainerRef)
        );
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onSearch(): void {
        //this.searchForm.value

        let where = '';


        /*if ( FuseValidators.isEmptyInputValue( this.ubigeo)){
            where = `UBIGEO ='${this.ubigeo}'`;
        }*/


        if (this.selectedOption === '1') {
            //let where = '';
            const params ={'UBIGEO':this.ubigeo, 'PARTIDA':this.searchForm?.pr};
            where=CommonUtils.generateWhereArgis(params);
            this._cfPredioService
                .getList(where,this.limit)
                .then((response) => {
                    if (response) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .then((responseJson) => {

                    if (responseJson['features'] && responseJson['features']) {
                        this.results = responseJson['features'].map(
                            (f: any) => f['attributes']
                        ).slice(0,10);
                    }
                    this.init=false;
                })
                .catch((error) => {

                    console.log(error);
                    this.init=false;
                });
        }
        else if(this.selectedOption === '2'){

            const params ={'UBIGEO':this.ubigeo, 'TIP_VIA':this.searchForm?.cod, 'NOM_VIA':this.searchForm?.via,'NUM_MUN':this.searchForm?.door };
            where=CommonUtils.generateWhereArgis(params);
            this._cfLoteService
            .getList(where,this.limit)
            .then((response) => {
                if (response) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {

                if (responseJson['features'] && responseJson['features']) {
                    this.results = responseJson['features'].map(
                        (f: any) => ({...f['attributes'],'NOM_TIPO_VIA': this.masterDomain.uuType.find(s=> s.id ===f['attributes']['TIP_VIA']).shortName })).slice(0,5);
                    ).slice(0,5);

                }
                this.init=false;
            })
            .catch((error) => {

                console.log(error);
                this.init=false;
            });
        }

        else if(this.selectedOption === '3'){

            const params ={'UBIGEO':this.ubigeo, 'TIPO_UU': this.searchForm?.tipouu,'NOM_UU':this.searchForm?.habUrb,'MZN_URB':this.searchForm?.mz,'LOT_URB':this.searchForm?.lt};
            where=CommonUtils.generateWhereArgis(params);
            this._cfLoteService
            .getList(where,this.limit)
            .then((response) => {
                if (response) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                /*this.searchForm.nomtipouu = this.masterDomain.uuType.find(s=> s.id ===this.searchForm?.tipouu).shortName;*/
                if (responseJson['features'] && responseJson['features']) {
                    this.results = responseJson['features'].map(
                        (f: any) => ({...f['attributes'],'NOM_TIPO_UU': this.masterDomain.uuType.find(s=> s.id ===f['attributes']['TIPO_UU']).shortName })).slice(0,5);
                }
                this.init=false;
            })
            .catch((error) => {
                console.log(error);
                this.init=false;
            });
        }

        /*console.log('buscando');*/
    }

    onChangePr(value: any): void {
        this.searchForm.pr = value;
    }
    onSelectionChangeVia(value, data): void {
        console.log('data>>',data);
        this.searchForm.tipovia = value;
        this.searchForm.nomtipovia= this.masterDomain.codStreet.find(s=> s.id ===value).shortName;
    }

    onChangeVia(value): void {
        this.searchForm.via = value;
    }

    onSelectionChangeUU(value): void {
        this.searchForm.tipouu = value;
        /*this.searchForm.tipovia = value;*/
        this.searchForm.nomtipouu = this.masterDomain.uuType.find(s=> s.id ===value).shortName;
        //this.searchForm.nomtipovia= this.masterDomain.codStreet.find(s=> s.id ===value).shortName;
    }

    onChangeDoor(value): void {
        this.searchForm.door = value;
    }

    onChangehabUrb(value): void {
        this.searchForm.habUrb = value;
    }


    onChangeMz(value): void {
        this.searchForm.mz = value;
    }
    onChangeLt(value): void {
        this.searchForm.lt = value;
    }

    onGo(value: any): void{
        this.eventOnGo.emit(value);
    }


    onSelectionChange(value): void {
        console.log(value, 'value');
        this.selectedOption = value;
        this.init=true;
        this.results =[];
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._searchOrigin.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }
}
