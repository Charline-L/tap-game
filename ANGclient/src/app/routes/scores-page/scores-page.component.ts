/*
Imports & definition
*/
  // Imports
  import { Component, OnInit } from '@angular/core';

  // Inner
  import { ScoreModel } from '../../models/score.model';
  import { ApiResponseModel } from "../../models/api.reponse.model";
  import { GameService } from "../../services/game/game-service.service";

  @Component({
    selector: 'app-scores-page',
    templateUrl: './scores-page.component.html',
    styleUrls: ['./scores-page.component.sass'],
    providers: [ GameService ]
  })
//
export class ScoresPageComponent implements OnInit {

  /*
  Config.
  */
    public scores: Array<ScoreModel> = []
    public hasError: Boolean = false

    constructor(
      private GameService: GameService,
    ) { }
  //

  /*
  Methods.
  */
    // Récupère les scores
    public getScores = () => {

      this.GameService.getScores()
        .then( (apiResponse: ApiResponseModel) => {

          // enregistre les scores
          this.scores = this.cleanDate(apiResponse.data)
        })
        .catch( (apiResponse: ApiResponseModel) => {

          // affiche le message d'erreur
          this.hasError = true

          // erreur
          console.log("ERROR apiResponse", apiResponse)
        })
    };

    // Transforme les scores
    public cleanDate(scores: Array<ScoreModel>): Array<ScoreModel> {

      for (let i=0; i< scores.length; i++){

        const date = new Date(scores[i].date)
        scores[i].dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + 'h' + date.getMinutes()
      }

      return scores
    }
  //


  /*
  Hooks
  */
    ngOnInit() {

      this.getScores()
    }
  //
}
