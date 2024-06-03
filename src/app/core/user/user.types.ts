import {Validators} from '@angular/forms';
import {Department, District, Province} from '../common/interfaces/common.interface';

export interface Role {
    id: number;
    name: string;
}

export interface Institute {
    id: number;
    name: string;
}

export interface PlaceScope {
    id: number;
    name: string;
}

export interface User {
    id?: number;
    username: string;
    dni?: string;
    name?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    isActive: boolean;
    isWebStaff?: boolean;
    isMobileStaff?: boolean;
    dateJoined: string;
    jobTitle?: string;
    observation?: string;
    role: Role;
    institution?: Institute;
    department?: Department;
    province?: Province;
    district?: District;
    placeScope?: PlaceScope;
    isSuperuser?: boolean;
    ubigeo: string;
    permissionsNavigation: any[];
    districtName?: string;
}


export interface UserCreate {
    id: number;
    avatar?: string;
    avatarFile?: File;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    dni: string;
    institution?: number;
    jobTitle?: string;
    department?: string;
    province?: string;
    district?: string;
    observation?: string;
    isActive: boolean;
}

export interface RoleCreate {
    id?: number;
    name?: string;
    description?: string;
    isActive?: boolean;
}
