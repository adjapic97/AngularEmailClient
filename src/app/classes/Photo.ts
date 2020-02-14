import { Employee } from './../service/httpclient.service';
export class Photo{

    id: number;
    photo_path: string;
    name: string;
    pic: Blob;
    type: string;
    user: Employee;


}

