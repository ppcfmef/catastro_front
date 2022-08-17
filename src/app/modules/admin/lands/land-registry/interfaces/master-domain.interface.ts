export interface MasterDomainItem {
  id: string;
  name: string;
  description: string;
  shortName: string;
}

export interface MasterDomain {
  uuType: MasterDomainItem[];
  codStreet: MasterDomainItem[];
  propertyType: MasterDomainItem[];
  codSide: MasterDomainItem[];
}
