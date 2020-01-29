import { User } from '../service/authentication.service';

export class Account{
    user: User[];
    smtpAddress: string;
    inServerType: number;
    smtpPort: number;
    inServerAddress: string;
    inServerPort: number;
    username: string;
    password: string;
    displayName: string;
}