import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, from, map, startWith, takeUntil } from 'rxjs';
import { CFLoteService } from '../../services/cflote.service';
import { CFPredioService } from '../../services/cfpredio.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';
import { UserService } from 'app/core/user/user.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { FuseValidators } from '@fuse/validators';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FuseSplashScreenModule, FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MapUtils } from 'app/shared/utils/map.utils';
import { NgZone } from '@angular/core';

@Component({
    selector: 'search-map',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatTooltipModule,
        FormsModule,
        MatDividerModule,
        MatTooltipModule,
        FuseScrollbarModule,
        MatAutocompleteModule,
        FuseSplashScreenModule,
    ],
    templateUrl: './search-map.component.html',
    styleUrls: ['./search-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent implements OnInit, OnDestroy {
    @Input()layersInfo: any =[];
    @Output() eventOnGo: EventEmitter<any>= new EventEmitter();
    @ViewChild('searchOrigin') private _searchOrigin: ElementRef;
    @ViewChild('searchPanel') private _messagesPanel: TemplateRef<any>;
    ubigeo: string;
    masterDomain: MasterDomain;
    results: any[]= null;
    //pr:any;
    limit=10;
    init=true;
    //implementar 
    addressControl = new FormControl('');
    optionsDirection = [];
    optionsUU = [];
    optionsMz = [];
    optionsLt =[];
    filteredOptions: Observable<any[]>;
 
    searchForm: any;
    selectedOption: string | null = null;
    showSelected: null | string =null; 
    changeStyle: string | null = null;
    //options 
    options: any[] | null;
    //panel 
    opened: boolean = false;
    vias : any[] | null;
    selectedOptionFeature: any;
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
        private _fuseSplashScreenService: FuseSplashScreenService,
        private zone: NgZone
    ) {
        this.searchForm = {
            pr: null,
            mz: null,
            lt: null,
            ltT: null,
            tipovia: null,
            door: null,
            habUrb: null,
            tipouu:null,
            address: null,
            via: null,
        };
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {

           /*console.log('this.user>>', this.user);*/
           console.log(user);
            this.ubigeo =user?.ubigeo;


        });

        //options Type
        this.options = [
            {
                cod: '2',
                option: 'Dirección',
                icon:"mat_solid:my_location"
            },
            
            {
                cod: '3',
                option: 'Unidad urbana',
                icon:"mat_solid:other_houses"
            },
            {
                cod: '1',
                option: 'Partida Registral',
                icon:"heroicons_solid:document-magnifying-glass"
            },
        ];

        //Options directions
        this.optionsDirection = [];

        this.optionsUU=[];

        this.optionsMz =[];
        this.optionsLt =[];
    }
    ngOnInit(): void {
        this.selectedOption = null;
        this.landRegistryService
            .getMasterDomain()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) =>
                {
                    this.masterDomain = result;
                console.log('this.masterDomain>>',this.masterDomain);
            });
        this.resetForm();
       
        this.filteredOptions = this.addressControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
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
        this.initSelect();
    }

  
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    initSelect(): void {

       let params ={};
       let where ='';
       if(this.ubigeo){
            params ={'UBIGEO':this.ubigeo};
            where=CommonUtils.generateWhereArgis(params);
            const featureLayer = this.layersInfo.find((l)=>l.id ===2  )?.featureLayer;

            MapUtils.queryFeaturelayer(featureLayer,where).then((features)=>{
                    this.optionsDirection = features.map(
                        (f: any) => {
                            const attributes =f.attributes;
                            const tipoVia =this.masterDomain.codStreet.find(s=> s.id ===attributes['TIP_VIA']);
                            const shortName= tipoVia?.shortName;
                            return { id: attributes['COD_VIA'], name: `${shortName}. ${attributes['NOM_VIA'] }`, geometry: f.geometry};
                        }

                        );
                        //console.log('  this.filteredOptions>>',  this.optionsDirection);
                    });

            const featureLayer2 = this.layersInfo.find((l)=>l.id ===4  )?.featureLayer;
            MapUtils.queryFeaturelayer(featureLayer2,where).then((features)=>{
                this.optionsUU=  features.map(
                    (f: any) => {
                        const attributes =f.attributes;
                        const tipoUU =this.masterDomain.uuType.find(s=> s.id ===attributes['TIPO_UU']);
                        const shortName= tipoUU?.shortName;
                        return { id: attributes['COD_UU'], name: `${shortName} ${attributes['NOM_UU'] }`, geometry: f.geometry};
                    }

                    );
                    //console.log('  this.filteredOptions>>',  this.optionsDirection);
                });

        }


    }

    onSearch(): void {
        console.log(this.selectedOption , 'options');
        //this.searchForm.value

        let where = '';
        let params={};
        if (this.selectedOption === '1') {
            //let where = '';
            if(FuseValidators.isEmptyInputValue(this.searchForm?.pr)){
                return;
            };

            this._fuseSplashScreenService.show();
            params ={'UBIGEO':this.ubigeo, 'PARTIDA':this.searchForm?.pr};
            where=CommonUtils.generateWhereArgis(params);

            const featureLayer = this.layersInfo.find((l)=>l.id === -1 )?.featureLayer;
            MapUtils.queryFeaturelayer(featureLayer,where).then((features)=>{
                this._fuseSplashScreenService.hide();
                this.results = features.map(
                    (f: any) => {
                        const attributes =f.attributes;
                        const tipoVia =this.masterDomain.codStreet.find(s=> s.id ===attributes['TIP_VIA']);
                        const shortName= tipoVia?.shortName;
                        return { id: attributes['COD_VIA'], name: attributes['DIR_URB']? attributes['DIR_URB']:
                        `${shortName} ${attributes['NOM_UU']}  ${attributes['MZN_URB'] } ${attributes['LOT_URB']} `,
                        partida:attributes['PARTIDA'], geometry: f.geometry};
                    }
                    );
                });
        }
        else if(this.selectedOption === '2'){

            if(this.searchForm?.door){
                this._fuseSplashScreenService.show();
                params ={'UBIGEO':this.ubigeo,  'COD_VIA':this.searchForm?.via,'NUM_MUN':this.searchForm?.door };
                where=CommonUtils.generateWhereArgis(params);
                const featureLayer = this.layersInfo.find((l)=>l.id === 0 )?.featureLayer;
                 console.log(' featureLayer>>',  featureLayer);
                MapUtils.queryFeaturelayer(featureLayer,where).then((features)=>{
                    this._fuseSplashScreenService.hide();
                    this.results = features.map(
                        (f: any) => {
                            const attributes =f.attributes;
                            const tipoVia =this.masterDomain.codStreet.find(s=> s.id ===attributes['TIP_VIA']);
                            const shortName= tipoVia?.shortName;
                            return { id: attributes['PARTIDA'], name: `${shortName} ${attributes['NOM_VIA']  }  ${attributes['NUM_MUN']  }  `, geometry: f.geometry};
                        });
                        console.log('  this.results 2>>',  this.results);
                    });

            /*this._cfLoteService
                .getList(where,this.limit)
                .then((response) => {
                    if (response) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .then((responseJson) => {
                    this._fuseSplashScreenService.hide();
                    console.log(this.masterDomain, 'domina');
                    if (responseJson['features'] && responseJson['features']) {
                        this.results = responseJson['features'].map(
                            (f: any) => ({...f['attributes']}));

                    }
                    this.init=false;
                })
                .catch((error) => {
                    console.log(error);
                    this.init=false;
                });*/

            }

            else {
                console.log('selectedOptionFeature>>',this.selectedOptionFeature);
                this.onGo(this.selectedOptionFeature);
            }

        }

        else if(this.selectedOption === '3'){


            if(this.searchForm?.lt?.id){
            }


            else if(this.searchForm?.mz){

                /*params ={'UBIGEO':this.ubigeo, 'COD_UU': this.searchForm?.habUrb,'MZN_URB':this.searchForm?.mz};
                where=CommonUtils.generateWhereArgis(params);*/

                

                this.onGo(this.selectedOptionFeature);
                //this._fuseSplashScreenService.hide();
            }

            else{
                this.onGo(this.selectedOptionFeature);
                //this._fuseSplashScreenService.hide();
            }


            /*this._cfLoteService
            .getList(where,this.limit)
            .then((response) => {
                if (response) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                this._fuseSplashScreenService.hide();
                if (responseJson['features'] && responseJson['features']) {
                    this.results = responseJson['features'].map(
                        (f: any) => ({...f['attributes'],'NOM_TIPO_UU': this.masterDomain.uuType.find(s=> s.id ===f['attributes']['TIPO_UU']).shortName }));
                }
                this.init=false;
            })
            .catch((error) => {
                console.log(error);
                this.init=false;
            });*/


        }
        else if(!this.selectedOption){
            console.log('not option')
            return;
        }

        /*console.log('buscando');*/
    }

    onChangePr(value: any): void {
        this.searchForm.pr = value;
    }
    
    onSelectionChangeVia(value): void {
        console.log('value>>',value);
        this.searchForm.tipovia = value.id;
        this.selectedOptionFeature = value;
    }

    onChangeVia(value): void {
        console.log('value2',value);
        this.searchForm.via = value.id;
        this.selectedOptionFeature = value;
    }

    onSelectionChangeUU(value): void {
       /* this.searchForm.tipouu = value;

        this.searchForm.tipovia = value;
        this.searchForm.nomtipouu = this.masterDomain.uuType.find(s=> s.id ===value).shortName;
        this.searchForm.nomtipovia= this.masterDomain.codStreet.find(s=> s.id ===value).shortName;*/
    }

    onChangeDoor(value): void {
        this.searchForm.door = value;
    }

    onChangehabUrb(value): void {
        this.searchForm.habUrb = value;
        this.selectedOptionFeature = value;


        const params ={'UBIGEO':this.ubigeo,'COD_UU':this.searchForm?.habUrb.id,};
        const where=CommonUtils.generateWhereArgis(params);


        const featureLayer = this.layersInfo.find((l)=>l.id ===3 )?.featureLayer;
                MapUtils.queryFeaturelayer(featureLayer,where).then((features)=>{
                    this.optionsMz=  features.map(
                        (f: any) => {
                            const attributes =f.attributes;
                            return { id: attributes['MZN_URB'], name: `${attributes['MZN_URB'] }`, geometry: f.geometry};
                        }
                        );
                        //console.log('  this.filteredOptions>>',  this.optionsDirection);
                    });
    }


    onChangeMz(value): void {
        this.searchForm.mz = value;
        this.selectedOptionFeature = value; 

        const params ={'UBIGEO':this.ubigeo,'COD_UU':this.searchForm?.habUrb.id,'MZN_URB':this.searchForm?.mz?.id};
        const where=CommonUtils.generateWhereArgis(params,true);



        const featureLayer = this.layersInfo.find((l)=>l.id ===1  )?.featureLayer;

        MapUtils.queryFeaturelayer(featureLayer,where).then((features)=>{

            this.optionsLt =  features.map(
                (f: any) => {
                    const attributes =f.attributes;
                    return { id: attributes['LOT_URB '], name: `${attributes['LOT_URB']  }  `, geometry: f.geometry};
                });
        });
    }
    onChangeLt(value): void {
        this.searchForm.lt = value;
        this.selectedOptionFeature = value;
    }

    onGo(value: any): void{
        if (value){
            this.eventOnGo.emit(value);
            this.parsearData(value, this.selectedOption);
            console.log(value,'valueeGo');
        }

    };

    onSelectionChange(value): void {
        this.selectedOption = value;
        this.init=true;
        this.results =[];
    }

    parsearData(val, typeSearch): void{
        switch(typeSearch) {
            case '1':
              this.showSelected = val.name;
              this.changeStyle = val?.partida;
              break;
            case '2':
                this.showSelected = val.name;
                this.changeStyle = val?.id;
              break;
            case '3':
                console.log('val 3>>',val);
                this.showSelected = this.searchForm?.habUrb?.name + ' ' + 'Mz'+ this.searchForm?.mz?.name + ' ' +'Lt'+ this.searchForm?.lt?.name;
                this.changeStyle = val?.id;
              break;
            default:
              console.log("Opción no válida");
          }
    }
 
    onClean(): void{
        this.resetForm();
        this.results = null;
    }
    resetForm(): void {
        this.searchForm = {
            pr: null,
            mz: null,
            ltT: null,
            lt: null,
            tipovia: null,
            door: null,
            habUrb: null,
            tipouu:null,
            address: null,
            via: null,
        };
    }

      onOpenOption(data):void{
        this.results = null;
        this.resetForm();
        this.selectedOption = data.cod;
        //this.onSearch();
      }

      ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    private _filter(value: string): string[] {
        const filterValue = value.toUpperCase();
        console.log(value,'value insert' )
        console.log(filterValue,'filterValue' )
        return this.optionsDirection.filter(option => option.name.includes(filterValue));
      }

      private _displayFn(e: any): any{
        return e.name;
      }
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._searchOrigin)
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
            this.resetForm(); 
            this.results = null;
            this._changeDetectorRef.markForCheck();
        });
    }
}

