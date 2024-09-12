import {Component, inject, Inject, OnInit} from '@angular/core';
import { IFoto } from '../../interfaces/foto.interface';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { ITicket } from '../../interfaces/ticket.interface';
import { CheckTicketService } from '../../services/check-ticket.service';
import { RegistroTitularidadService } from '../../services/registro-titularidad.service';
@Component({selector: 'app-previsualizacion', templateUrl: './previsualizacion.component.html', styleUrls: ['./previsualizacion.component.scss']})
export class PrevisualizacionComponent implements OnInit {

    dataCaracteristicas = [];
    dataEdificaciones: any[] = [];
    dataSourceInstOrigen = [];
    dataSourceInst: any= [];
    fotos: IFoto[]=[];
    registrosTitularidad: any;
    dataCaracteristicasOrigen= [];
    dataEdificacionesOrigen =[];
    ticket: ITicket;

    checkTicketService = inject(CheckTicketService);
    registroTitularidadService= inject(RegistroTitularidadService);
    constructor(
        private _confirmationService: CustomConfirmationService,
        ) {}

    ngOnInit(): void {
        this.checkTicketService.dataTicket$.subscribe((data) => {
            console.log('datasssss', data);
            this.ticket = data.ticket;
            this.registrosTitularidad = data.registrosTitularidad;
            this.fotos = data.fotos ?? [];
            this.dataCaracteristicasOrigen = [
                {
                    title: 'Tipo de predio',
                    total: this.registrosTitularidad?.predioPadron.tipoPredioNombre ?? '-'
                },
                {
                    title: 'Número de Partida',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.parRegistral ?? '-'
                },
                {
                    title: 'Clase de uso',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.claseUsoNombre ?? '-'
                },
                {
                    title: 'SubClase de uso',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.subclaseUsoNombre ?? '-'
                },
                {
                    title: 'Uso del Predio',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.tipUsoPredioNombre ?? '-'
                },
                {
                    title: 'Area del Terreno',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.areaTerreno ?? '-'
                },
                {
                    title: 'Area común terreno',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.areaTotConsComun ?? '-'
                },
                {
                    title: 'Cant. de hab. o aforo',
                    total: this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.cantidadHabitantes ?? '-'
                },
            ];
            this.dataEdificacionesOrigen = this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.nivelesConstruccion ?? [];
            this.dataSourceInstOrigen = this.registrosTitularidad?.predioPadron?.predioContribuyente[0]?.obrasComplementarias ?? [];
            this.dataCaracteristicas = [
                {
                    title: 'Tipo de predio',
                    total: this.registrosTitularidad?.predioInspeccion.tipoPredioNombre ?? '-'
                },
                {
                    title: 'Número de Partida',
                    total: '-'
                },
                {
                    title: 'Clase de uso',
                    total: this.registrosTitularidad?.predioInspeccion?.claseUsoNombre
                },
                {
                    title: 'SubClase de uso',
                    total: this.registrosTitularidad?.predioInspeccion?.subclaseUsoNombre
                },
                {
                    title: 'Uso del Predio',
                    total: this.registrosTitularidad?.predioInspeccion?.tipoUsoNombre
                },
                {
                    title: 'Area del Terreno',
                    total: '-'
                },
                {
                    title: 'Area comun terreno',
                    total: '-'
                },
                {
                    title: 'Cant. de hab. o aforo',
                    total: '-'
                },
            ];

            const c =this.registrosTitularidad.caracteristicas;
            this.dataEdificaciones = [
                {
                    tipnivelNombre: c?.tipnivelNombre ?? '',
                    anioConstruccion: c?.anioConstruccion ?? '',
                    mesConstruccion : c?.mesConstruccion ?? '',
                    numPiso : c?.piso ?? '',
                    tipmaterialNombre : c?.materialPredNombre ?? '',
                    estConservacionNombre : c?.estadoConservaNombre ?? '',
                    categoriaMuroColumna : c?.categoriaMuroColumna ?? '',
                    categoriaTecho : c?.catergoriaTecho ?? '',
                    categoriaPiso :c?.catergoriaPiso ?? '',
                    categoriaPuertaVentana : c?.catergoriaPuertaVentana ?? '',
                    categoriaRevestimiento: c?.categoriaRevestimiento ?? '',
                    categoriaBano : c?.catergoriaBano ?? '',
                    categoriaInstElectricaSanita : c?.categoriaElectrica ?? '',
                    areaConstruida : c?.areaConstruida ?? ''
                }
            ];

            this.dataSourceInst = this.registrosTitularidad.instalaciones.map(i => ({
                    codInst: i.codInst,
                    codTipoIns: i.codTipoInst,
                    anoConst: i.anioConstruccion,
                    estConserva: i.estadoConserva,
                    dim: i.dimension
                }));

        });

    }

    onClickConfirmarPredio(e: any): void {
        const dialogRef = this._confirmationService.info(
            'Confirmar',
            'Esta seguro de confimar el predio?'
        );
        dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this.checkTicketService.resolverTicket$.next('confirmar');
                }
            });
    }

    onClickSubvaluarPredio(e: any): void {
        const dialogRef = this._confirmationService.info(
            'Subvaluar',
            'Esta seguro de subvaluar el predio?'
        );

        dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this.checkTicketService.resolverTicket$.next('subvaluar');
                }
            });

    }
    onClickCerrar(e: any): void {
        this.checkTicketService.checkTicket$.next(false);
    }

}
