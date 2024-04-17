import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, debounceTime, filter, from, map, startWith, switchMap, takeLast, takeUntil, tap } from 'rxjs';
import { CFLoteService } from '../../services/cflote.service';
import { CFPredioService } from '../../services/cfpredio.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';
import { UserService } from 'app/core/user/user.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { FuseValidators } from '@fuse/validators';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { FuseSplashScreenModule, FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MapUtils } from 'app/shared/utils/map.utils';
import { NgZone } from '@angular/core';
import { values } from 'lodash';
import { T } from '@angular/cdk/keycodes';

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
        ReactiveFormsModule
    ],
    templateUrl: './search-map.component.html',
    styleUrls: ['./search-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent implements OnInit, OnDestroy {
    @Input() layersInfo: any = [];
    @Output() eventOnGo: EventEmitter<any> = new EventEmitter();
    @ViewChild('searchOrigin') private _searchOrigin: ElementRef;
    @ViewChild('searchPanel') private _messagesPanel: TemplateRef<any>;
    ubigeo: string;
    masterDomain: MasterDomain;
    results: any[] = null;
    //pr:any;
    limit = 10;
    init = true;
    //implementar
    addressControl = new FormControl('');
    filteredOptions: Observable<any[]>;
    optionsDirection = [];

    filteredOptionsUU: Observable<any[]>;
    optionsUU = [];

    filteredOptionsMz: Observable<any[]>;
    optionsMz = [];

    filteredOptionsLt: Observable<any[]>;
    optionsLt = [];

    searchForms: FormGroup;
    selectedOption: string | null = null;
    showSelected: null | string = null;
    changeStyle: string | null = null;
    //options
    options: any[] | null;
    //panel
    opened: boolean = false;
    vias: any[] | null;
    selectedOptionFeature: any;
    loading: boolean = false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _matAutocomplete: MatAutocomplete;


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

        this.searchForms = new FormGroup({
            pr: new FormControl(''),
            mz: new FormControl(''),
            lt: new FormControl(''),
            tipovia: new FormControl(''),
            door: new FormControl(''),
            habUrb: new FormControl(''),
            tipouu: new FormControl(''),
            address: new FormControl(''),
            via: new FormControl(''),
        });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {

                /*console.log('this.user>>', this.user);*/
                console.log(user);
                this.ubigeo = user?.ubigeo;


            });

        //options Type
        this.options = [
            {
                cod: '2',
                option: 'Dirección',
                icon: "mat_solid:my_location"
            },

            {
                cod: '3',
                option: 'Unidad urbana',
                icon: "mat_solid:other_houses"
            },
            {
                cod: '1',
                option: 'Partida Registral',
                icon: "heroicons_solid:document-magnifying-glass"
            },
        ];

        //Options directions
        this.optionsDirection = [];
        this.optionsUU = [];
        this.optionsMz = [];
        this.optionsLt = [];
    }

    ngOnInit(): void {
        this.selectedOption = null;
        this.landRegistryService
            .getMasterDomain()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                this.masterDomain = result;
                console.log('this.masterDomain>>', this.masterDomain);
            });


        //filter by pr
        this.searchForms.get('pr').valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
                map((value: string) => {
                    if (!value || value.length < 1) {
                        this.results = null;
                    }

                    // Continue
                    return value;
                }),
                filter((value: string) => value && value.length > 1),
            )
            .subscribe((value) => {
                let where = '';
                let params = {};
                params = { 'UBIGEO': this.ubigeo, 'PARTIDA': value };
                where = CommonUtils.generateWhereArgis(params);

                const featureLayer = this.layersInfo.find((l) => l.id === -1)?.featureLayer;
                MapUtils.queryFeaturelayer(featureLayer, where).then((features) => {
                    this.results = features.map(
                        (f: any) => {
                            const attributes = f.attributes;
                            const tipoVia = this.masterDomain.codStreet.find(s => s.id === attributes['TIP_VIA']);
                            const shortName = tipoVia?.shortName;
                            return {
                                id: attributes['COD_VIA'], name: attributes['DIR_URB'] ? attributes['DIR_URB'] :
                                    `${shortName} ${attributes['NOM_UU']}  ${attributes['MZN_URB']} ${attributes['LOT_URB']} `,
                                partida: attributes['PARTIDA'], geometry: f.geometry
                            };
                        });
                });
            });

        //select address
        this.filteredOptions = this.searchForms.get('tipouu').valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
                map(value => this._filter(value, this.optionsDirection))
            )

        //select habUrb
        this.filteredOptionsUU = this.searchForms.get('habUrb').valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                takeUntil(this._unsubscribeAll),
                map(value => {
                    //this.selectedOptionFeature = this.searchForms.get('habUrb').value;


                    return this._filter(value, this.optionsUU);
                })
            );

        //select mz
        this.filteredOptionsMz = this.searchForms.get('mz').valueChanges
            .pipe(
                startWith(''),
                //debounceTime(30),
                takeUntil(this._unsubscribeAll),
                map(value => {
                    this.selectedOptionFeature = this.searchForms.get('mz').value;
                    return this._filter(value, this.optionsMz);
                })
            );

        //
        this.filteredOptionsLt = this.searchForms.get('lt').valueChanges
            .pipe(
                startWith(''),
                debounceTime(30),
                takeUntil(this._unsubscribeAll),
                map(value => {
                    this.selectedOptionFeature = this.searchForms.get('lt').value;
                    return this._filter(value, this.optionsLt);
                })
            );
    };

    //init data mat-option
    initSelect(): void {
        let params = {};
        let where = '';
        if (this.ubigeo) {
            params = { 'UBIGEO': this.ubigeo };
            where = CommonUtils.generateWhereArgis(params);
            const featureLayer = this.layersInfo.find((l) => l.id === 2)?.featureLayer;

            MapUtils.queryFeaturelayer(featureLayer, where).then((features) => {
                this.optionsDirection = features.map(
                    (f: any) => {
                        const attributes = f.attributes;
                        const tipoVia = this.masterDomain.codStreet.find(s => s.id === attributes['TIP_VIA']);
                        const shortName = tipoVia?.shortName;
                        return { id: attributes['COD_VIA'], name: `${shortName}. ${attributes['NOM_VIA']}`, geometry: f.geometry };
                    });
            });
            const featureLayer2 = this.layersInfo.find((l) => l.id === 4)?.featureLayer;
            MapUtils.queryFeaturelayer(featureLayer2, where).then((features) => {
                this.optionsUU = features.map(
                    (f: any) => {
                        const attributes = f.attributes;
                        const tipoUU = this.masterDomain.uuType.find(s => s.id === attributes['TIPO_UU']);
                        const shortName = tipoUU?.shortName;
                        return { id: attributes['COD_UU'], name: `${shortName} ${attributes['NOM_UU']}`, geometry: f.geometry };
                    }

                );
                console.log(' optionsUU', this.optionsUU);
            });
        };
    };

    onSearch(): void {
        console.log(this.selectedOption, 'options');
        let where = '';
        let params = {};
        if (this.selectedOption === '1') {
            const r = this.searchForms.get('pr').value;
            this.onGo(this.results[0]);
        }
        if (this.selectedOption === '2') {
            this.selectedOptionFeature = this.searchForms.get('tipouu').value;

            if (this.searchForms.get('door').value) {
                this._fuseSplashScreenService.show();
                const tipouu = this.searchForms.get('tipouu').value;
                params = { 'UBIGEO': this.ubigeo, 'COD_VIA': tipouu.id, 'NUM_MUN': this.searchForms.get('door').value };
                where = CommonUtils.generateWhereArgis(params);
                const featureLayer = this.layersInfo.find((l) => l.id === 0)?.featureLayer;
                MapUtils.queryFeaturelayer(featureLayer, where).then((features) => {
                    this._fuseSplashScreenService.hide();
                    this.results = features.map(
                        (f: any) => {
                            const attributes = f.attributes;
                            const tipoVia = this.masterDomain.codStreet.find(s => s.id === attributes['TIP_VIA']);
                            const shortName = tipoVia?.shortName;
                            return { id: attributes['PARTIDA'], name: `${shortName} ${attributes['NOM_VIA']}  ${attributes['NUM_MUN']}  `, geometry: f.geometry };
                        });
                    console.log('  this.results 2>>', this.results);
                });
            }
            else {
                console.log('selectedOptionFeature>>', this.selectedOptionFeature);
                this.onGo(this.selectedOptionFeature);
            }

        }

        else if (this.selectedOption === '3') {
            console.log('lt>>',this.searchForms.get('lt'));
            if (this.searchForms.get('lt').value.id) {
                console.log(this.searchForms.get('lt'));
                this.selectedOptionFeature = this.searchForms.get('lt').value;
                this.onGo(this.selectedOptionFeature);
            }
            else if (this.searchForms.get('mz').value) {
                this.selectedOptionFeature = this.searchForms.get('mz').value;
                this.onGo(this.selectedOptionFeature);
            }
            else {
                this.selectedOptionFeature = this.searchForms.get('habUrb').value;
                this.onGo(this.selectedOptionFeature);

            }
        }
        else if (!this.selectedOption) {
            console.log('not option')
            return;
        }
    }

    onChangehabUrb(): void {
        this.searchForms.get('mz').setValue('');
        this.searchForms.get('lt').setValue('');
        // this.searchForms.get('mz').reset();
        // this.searchForms.get('lt').reset();


        const uurb = this.searchForms.get('habUrb').value;
        this.selectedOptionFeature = uurb;
        const params = { 'UBIGEO': this.ubigeo, 'COD_UU': uurb.id };
        const where = CommonUtils.generateWhereArgis(params);
        const featureLayer = this.layersInfo.find((l) => l.id === 3)?.featureLayer;
        MapUtils.queryFeaturelayer(featureLayer, where).then((features) => {
            this.optionsMz = features.map(
                (f: any) => {
                    const attributes = f.attributes;
                    return { id: attributes['MZN_URB'], name: `${attributes['MZN_URB']}`, geometry: f.geometry };
                }
            );

            this.filteredOptionsMz = this.searchForms.get('mz').valueChanges
            .pipe(
                startWith(''),
                //debounceTime(30),
                takeUntil(this._unsubscribeAll),
                map(value => {
                    this.selectedOptionFeature = this.searchForms.get('mz').value;
                    return this._filter(value, this.optionsMz);
                })
            );
            // this.optionsLt = [];
        });
    }


    onChangeMz(): void {
        this.searchForms.get('lt').setValue('');
        const uurb = this.searchForms.get('habUrb').value;
        const mz = this.searchForms.get('mz').value;
        this.selectedOptionFeature = mz;

        const params = { 'UBIGEO': this.ubigeo, 'COD_UU': uurb.id, 'MZN_URB': mz.id };
        const where = CommonUtils.generateWhereArgis(params, true);



        const featureLayer = this.layersInfo.find((l) => l.id === 1)?.featureLayer;

        MapUtils.queryFeaturelayer(featureLayer, where).then((features) => {

            this.optionsLt = features.map(
                (f: any) => {
                    const attributes = f.attributes;
                    return { id: attributes['LOT_URB'], name: `${attributes['LOT_URB']}`, geometry: f.geometry };
                });

                this.filteredOptionsLt = this.searchForms.get('lt').valueChanges
                .pipe(
                    startWith(''),
                    debounceTime(30),
                    takeUntil(this._unsubscribeAll),
                    map(value => {
                        this.selectedOptionFeature = this.searchForms.get('lt').value;
                        return this._filter(value, this.optionsLt);
                    })
                );
        });
    }

    onGo(value: any): void {
        if (value) {
            this.eventOnGo.emit(value);
            this.parsearData(value, this.selectedOption);
            console.log(value, 'valueeGo');
        }

    };

    onSelectionChange(value): void {
        this.selectedOption = value;
        this.init = true;
        this.results = [];
    }

    parsearData(val, typeSearch): void {
        switch (typeSearch) {
            case '1':
                this.showSelected = val.partida;
                this.changeStyle = val?.partida;
                break;
            case '2':
                this.showSelected = val.name;
                this.changeStyle = val?.id;
                break;
            case '3':
                console.log('val 3>>', val);
                console.log('mz',this.searchForms.get('mz'));
                console.log('lt',this.searchForms.get('lt'));
                this.showSelected = this.searchForms.get('habUrb').value.name + ' ' + 'Mz' + this.searchForms.get('mz').value.name + ' ' + 'Lt' + this.searchForms.get('lt').value.name;
                this.changeStyle = val?.id;
                break;
            default:
                console.log("Opción no válida");
        }
    }


    onOpenOption(data): void {
        this.results = null;
        this.searchForms.reset();
        this.selectedOption = data.cod;
        console.log(this.selectedOption, 'selectOpt')
    }

    private _filter(value, arrays): string[] {
        console.log(value, 'value normalize')
        const normalizeText = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, '').toLowerCase();

        const val = value && value.name ? normalizeText(value.name) : normalizeText(value);
        // const val = (value && value.name) ? normalizeText(value.name) : (value ? normalizeText(value) : '');

        console.log(val, 'val normalize')
        // if (val === '') {
        //     return arrays;
        // }

        return arrays.filter(item => {
            const itemNameNormalized = normalizeText(item.name);
            return itemNameNormalized.includes(val);
        });
    };

    //overlay
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
            this.searchForms.reset();
            this.results = null;
            this._changeDetectorRef.markForCheck();
        });
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

    displayFn(option: any): string {
        console.log(option, 'opt')
        return option && option.name ? option.name : '';

    }



    onClean(): void {
        this.searchForms.reset();
        this.searchForms.get('habUrb').setValue('');
        this.searchForms.get('mz').setValue('');
        this.searchForms.get('lt').setValue('');
        this.results = null;
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}

