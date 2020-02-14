import { Contact } from './../../classes/Contact';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BASE_URL = 'https://localhost:8080/api/search/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http : HttpClient) {


   }


   returnResultsForSearchedContact(
     searchType: string,
     searchParam1: string,
     searchParam2: string,
     searchTarget1: string,
     searchTarget2: string,
     booleanOperation: string,
     fuzzyPhraseParam: number,
    
    ){

      return this.http.get<Contact[]>(BASE_URL +'?searchType=' 
      + searchType + '&searchTarget1=' + searchTarget1 
      +'&searchParam1='+ searchParam1
      +'&searchTarget2=' + searchTarget2 
      +'&searchParam2='+ searchParam2 
      + '&booleanOperation='+ booleanOperation 
      + '&fuzzyPhraseParam=' + fuzzyPhraseParam)

   }
}
