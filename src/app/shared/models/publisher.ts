

export interface Publisher {
    id : number;
    name : string;
    place: string;
    website: string;
}

export interface PublisherResultArray {
    results : Publisher[];
    count : number;
    statusCode : number;
}

export interface PublisherResult {
    result : Publisher;
    statusCode : number;
}