/* 
Imports 
*/
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  // import 'rxjs/add/operator/toPromise';
  import { environment } from "../../../environments/environment";
  import { IdentityModel } from '../../models/identity.model';
//


/* 
Definition 
*/
  @Injectable()
  export class AuthService {

    // Inject module(s) in the service
    constructor( private HttpClient: HttpClient ){};
    
    // Function to register a user
    public register(userData: IdentityModel): Promise<any>{

      // Set header
      let myHeader = new HttpHeaders();

      // POST '/auth/register'
      return this.HttpClient.post(`${environment.apiUrl}/auth/register`, userData, { headers: myHeader })
      .toPromise().then(this.getData).catch(this.handleError);
    };

    // Function to connect a user
    public login(userData: IdentityModel): Promise<any>{

      // Set header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // POST '/auth/login'
      return this.HttpClient.post(`${environment.apiUrl}/auth/login`, userData, { headers: myHeader, withCredentials: true })
      .toPromise().then(this.getData).catch(this.handleError);
    };

    // Function to get user identity from server
    public getUserId(): Promise<any>{

      // Ajoute les header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // GET '/auth/login'
      return this.HttpClient.get(`${environment.apiUrl}/auth`,{ headers: myHeader, withCredentials: true })
      .toPromise().then(this.getData).catch(this.handleError);
    };

    public logout(): Promise<any>{

      // Ajoute les header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // GET '/auth/logout'
      return this.HttpClient.get(`${environment.apiUrl}/auth/logout`,{ headers: myHeader, withCredentials: true })
        .toPromise().then(this.getData).catch(this.handleError);
    };

    // Get the API response
    private getData(res: any){
      return res || {};
    };

    // Get the API error
    private handleError(err: any){
      return Promise.reject(err.error);
    };
  };
//
