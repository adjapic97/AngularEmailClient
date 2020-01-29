import { Message } from './Message';


export class PageMessage {
    content: Message[];
    totalPages : number;
    totalElements : number;
    last : boolean;
    size : number;
    first : boolean;
    sort : string;
    numberOfElements : number;
}