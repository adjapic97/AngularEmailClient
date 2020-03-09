import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public emitClass: EventEmitter<any> = new EventEmitter();

  constructor() {

    


   }
}
