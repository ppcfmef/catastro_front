export interface TypePermission {
    code: string;
    description: string;
}

export interface NavigationView {
    id: string;
    fullTitle: string;
    title: string;
    subtitle: string;
    type: string;
    icon: string;
    link: string;
    order: number;
    parent: string;
}

export interface Permission {
    id: number;
    description: string;
}
