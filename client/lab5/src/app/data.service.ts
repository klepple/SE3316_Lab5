/**
 * This is a service used to fetch the data returned through the server from mongodb.
 * 
 **/
 
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DataService {
  
  authToken: any;
  user: any;
  collection: any;
  
  constructor(private _http: Http) { }
  
//----------- User functionality  --------------

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
  
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get("api/profile", {headers: headers})
    .map(res => res.json());
  }
  
  storeUserData(token, user){
    localStorage.setItem('id:token', token);
    localStorage.setItem('user_id', JSON.stringify(user.id));
    this.authToken = token;
    this.user = user;
  }
  
  loadToken(){
    const token = localStorage.getItem('id:token');
    this.authToken = token;
  }
  
  loggedIn(){
    return tokenNotExpired("id:token");
  }
  
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
// ------ Collection functionality ------------

  createCollection(collection){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post("api/collections", collection, {headers: headers})
      .map(res => res.json());
    }
    
  getPublicCollections(publicColl){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.get("api/collections/:" + name, {headers: headers})
      .map(res => res.json());
    }
    
  getCollectionsForUser(user_id){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.get("api/collections/:" + user_id, {headers: headers})
      .map(res => res.json());
    }
    
  addImageToCollection(photoUrl){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.put("api/collections/:" + collection.name, collection, {headers: headers})
      .map(res => res.json());
    }
      
  
//------------ Nasa image functionality --------------------
  
  getImages(query){
    return this._http.get('https://images-api.nasa.gov/search?q=' + query + '&media_type=image')
    .map((data:any) => data.json());
  }

}