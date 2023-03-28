import { Book } from "./book";
import { Format } from "./format";
import { Publisher } from "./publisher";

export interface Edition {
    id : number;
    ISBN : string;   /// number  ???
    price : number;
    cover : File;
    stock : number;
    Publisher? : Publisher;
    Format? : Format;
    Book? : Book;
}

export interface EditionCreateUpdate {
    ISBN : string;  
    price : number;
    cover : File;
    stock : number;
    PublisherId : number;
    FormatId : number;
    BookId : number;
}

export interface EditionResultArray {
    results : Edition[];
    count : number;
    statusCode : number;
}

export interface EditionResult {
    result : Edition;
    statusCode : number;
}