/*
Imports
*/
  import { Injectable } from '@angular/core';
  import {HttpClient, HttpHeaders} from '@angular/common/http';
  import { environment } from "../../../environments/environment";
//


/*
Definition
*/
  @Injectable()
  export class GameService {

    // Inject module(s) in the service
    constructor( private HttpClient: HttpClient ){};

    // Récupérer tous les scores
    public getScores(){

      // Ajoute les header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // GET '/game/scores'
      return this.HttpClient.get(`${environment.apiUrl}/game/scores`,{ headers: myHeader, withCredentials: true })
        .toPromise().then(this.getData).catch(this.handleError);
    }

    // Ajouter un score
    public addScore(points: number) {

      // Ajoute les header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // GET '/game/scores'
      return this.HttpClient.post(`${environment.apiUrl}/game/score`,{points: points},{ headers: myHeader, withCredentials: true })
        .toPromise().then(this.getData).catch(this.handleError);
    }

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
