

export interface User {
    id : number;
    firstname : string;
    lastname : string;
    pseudo : string;
    email : string;
    password : string;
    role : string;
    avatar : string;
}

export interface UserResultArray {
    results : User[];
    count : number;
    statusCode : number;
}

export interface UserResult {
    result : User;
    statusCode : number;
}