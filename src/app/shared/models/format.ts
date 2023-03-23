
export interface Format {
    id : number;
    name : string;
}

export interface FormatResultArray {
    results : Format[];
    count : number;
    statusCode : number;
}

export interface FormatResult {
    result : Format;
    statusCode : number;
}