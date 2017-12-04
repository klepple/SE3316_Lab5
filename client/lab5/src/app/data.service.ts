/**
 * This is a service used to fetch the data returned through the server from mongodb.
 * 
 **/
 
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  
  authToken: any;
  user: any;
  
  constructor(private _http: Http) { }
  
  
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("api/register", user, {headers: headers})
    .map(res => res.json());
  }
  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("api/authenticate", user, {headers: headers})
    .map(res => res.json());
  }
  
  storeUserData(token, user){
    localStorage.setItem('id:token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  private query = 'star';
  result:any;
  
  
  getImages(){
    return this._http.get('https://images-api.nasa.gov/search?q=star&media_type=image');
    .map(result => this.result = result.json().collection.items);
  }

}