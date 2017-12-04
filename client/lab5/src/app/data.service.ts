/**
 * This is a service used to fetch the data returned through the server from mongodb.
 * 
 **/
 
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  

  private nasaUrl = 'https://images-api.nasa.gov/asset/';
  result:any;
  constructor(private _http: Http) { }

  getUsers() {
      return this._http.get("/api/collections")
      .map(result => this.result = result.json().data);
  }
  
   getUser() {
      return this._http.get("/api/userauthentification/:user_id")
      .map(result => this.result = result.json().data);
  }
  
// -------------------- NASA stuff  --------------------
  getImages(){
    return this._http.get(this.nasaUrl);
    .map(result => this.result = result.json());
  }

}