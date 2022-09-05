export interface Document {
    title: string;
    description: string;
    type?: number;
    url: string;
    thumbnail: string | File;
    category: any;
}
