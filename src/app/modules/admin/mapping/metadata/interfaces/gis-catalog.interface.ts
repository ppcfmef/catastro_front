import { GisService } from './gis-service.interface';


export interface GisCatalog {
  id: number;
  title: string;
  category: number;
  thumbnail: string;
  description?: string;
  services?: GisService[];
}
