import { Employee } from './../service/httpclient.service';
import { User } from '../service/authentication.service';

export class Account{
    user: Employee;
    smtpAddress: string;
    inServerType: number;
    smtpPort: number;
    inServerAddress: string;
    inServerPort: number;
    username: string;
    password: string;
    displayName: string;
}