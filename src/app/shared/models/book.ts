import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    id : number;
    title : string;
    description : string;
    publication_date: Date;
    Genre? : Genre;
    Authors : Author[];
}
export interface BookUpdate {
    title : string;
    description : string;
    publication_date: Date;
    GenreId : number;
}

export interface BookAuthorUpdate {
  authors : number[];
}

export interface BookResultArray {
    results : Book[];
    count : number;
    statusCode : number;
}

export interface BookResult {
    result : Book;
    statusCode : number;
}


// export class Book {
//     id: number;
//     title: string;
//     description: string;
//     publication_date: Date;
//     Genre?: Genre;
//     Authors: Author[] ;
  
//     constructor(
//       id: number,
//       title: string,
//       description: string,
//       publication_date: Date,
//       Genre: Genre,
//       Authors: Author[]
//     ) {
//       this.id = id;
//       this.title = title;
//       this.description = description;
//       this.publication_date = publication_date;
//       this.Genre = Genre;
//       this.Authors = Authors;
//     }
//   }
  
  
  
  
  
  

