
export interface Author {
    id : number;
    firstname : string;
    lastname : string;
    // birthdate : string;
    birthdate : Date;
    biography : string;
    photo : File;
}

export interface AuthorResultArray {
    results : Author[];
    count : number;
    statusCode : number;
}

export interface AuthorResult {
    result : Author;
    statusCode : number;
}