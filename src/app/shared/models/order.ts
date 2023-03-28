import { User } from "./user";

export interface Order {
    id : number;
    status : string;
    delivery_street : string;
    delivery_number : number;
    delivery_city : string;
    delivery_postalCode : number;
    delivery_country : string;
    payment_method : string;
    payment_status : string;
    User? : User
    // TODO : changer le type de Editions
    Editions : any[];
    // Editions : Edition[];
    quantity : number;
    delivery_status : string;
}

export interface OrderResultArray {
    results : Order[];
    count : number;
    statusCode : number;
}

export interface OrderResult {
    result : Order;
    statusCode : number;
}