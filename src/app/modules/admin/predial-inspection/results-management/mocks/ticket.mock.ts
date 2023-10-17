import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { ITicket } from '../interfaces/ticket.interface';
import {ubicacionMocks,ubicacionMock} from '../mocks/ubicacion.mock';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
export const ticketMocks: ITicket []=[
    {   id: 101,
        obsTicketUsuario: '',
        codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
        codUsuario: 63,
        fecInicioTrabajo: '12/10/2023',
        fecAsignacion: '12/10/2023',
        fecUltimaActualizacion: '12/10/2023',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001001',
        codTipoTicket: 1,
        tipoTicket: 'Predio sin geo',
        obsTicketGabinete: '',
        ubicacion: [ubicacionMocks[0]],
        estado:0
    },

    {   id: 102,
        obsTicketUsuario: '',
        codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
        codUsuario: 63,
        fecInicioTrabajo: '12/10/2023',
        fecAsignacion: '12/10/2023',
        fecUltimaActualizacion: '12/10/2023',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001002',
        codTipoTicket: 2,
        tipoTicket: 'Lote sin predio',
        obsTicketGabinete: '',
        ubicacion:[ubicacionMocks[1]],
        estado:0
    },


    {   id: 103,
        obsTicketUsuario: '',
        codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
        codUsuario: 63,
        fecInicioTrabajo: '12/10/2023',
        fecAsignacion: '12/10/2023',
        fecUltimaActualizacion: '12/10/2023',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001003',
        codTipoTicket: TypeGap.PUNTO_IMAGEN,
        tipoTicket: 'Punto imagen',
        obsTicketGabinete: '',
        ubicacion:[ubicacionMocks[2]],
        estado:0
    },
];


export const ticketMock: ITicket =
    {    id: 1,
        obsTicketUsuario: '',
        codEstTrabajoTicket: 4,
        codUsuario: 63,
        fecInicioTrabajo: '0709230100',
        fecAsignacion: '0709230100',
        fecUltimaActualizacion: '0709230100',
        codEstEnvioTicket: 0,
        codTicket: 'G04070300001001',
        codTipoTicket: 2,
        tipoTicket: 'Predio sin georreferenciacion',
        obsTicketGabinete: '',
        ubicacion:ubicacionMocks,
           estado:0
    };
