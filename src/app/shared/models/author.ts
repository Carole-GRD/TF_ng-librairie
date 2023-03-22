
export interface Author {
    id : number;
    firstname : string;
    lastname : string;
    birthdate : Date;
    biography : Text;
    photo : string;
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