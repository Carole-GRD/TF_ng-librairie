import { User } from "./user";


export interface AuthResult {
    result : UserWithToken;
    statusCode : number;
}

interface UserWithToken {
    token : string;
    userToConnect : User;
}