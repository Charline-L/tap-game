/* 
Imports & definition 
*/
  // Imports
  import { Component } from '@angular/core';
  import { Router } from "@angular/router";

  // Inner
  import { AuthService } from "../../services/auth/auth-service.service";
  import { GameService } from "../../services/game/game-service.service";
  import { ApiResponseModel } from "../../models/api.reponse.model";

  // Definition
  @Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.sass'],
    providers: [ AuthService, GameService ]
  })
//


/* 
Export
*/
  export class UserPageComponent {

    public isTaping: boolean = false
    public isFinished: boolean = false
    public hasStarted: boolean = false
    public numberClick: number = 0
    public hasError: boolean = false
    public isMousedown: boolean = false

    /* 
    Config.
    */
      // Module injection
      constructor(
        private GameService: GameService,
        private Router: Router
      ) {};
    //


    /*
    Methods
    */
      // lorsque utilisateur clic sur l'image
      public clickImage() {

        // affiche le clic
        this.isMousedown = true

        // met à jour nos variables
        if (this.isFinished) return null
        else if (this.hasStarted) this.numberClick++
        else this.startGame()

        // dé-affiche le clic avec un petit délai
        setTimeout(() => {
          this.isMousedown = false
        }, 50)
      }

      // commence le jeu
      private startGame() {

        // lance le jeu
        this.hasStarted = true

        // lance timer arreter le jeu
        setTimeout(() => {
          this.endGame()
        }, 10000)
      }

      // fin du jeu
      private endGame() {

        // arrete le jeu
        this.isFinished = true

        // enregistre le score
        this.addScore()
      }

      // ajoute le score
      private addScore() {

        return new Promise((resolve, reject) => {

          this.GameService.addScore(this.numberClick)
            .then( (apiResponse: ApiResponseModel) => {

              // redirige vers la page de cores
              this.Router.navigate(['/tap']);
            })
            .catch( (apiResponse: ApiResponseModel) => {

              // affiche le message d'erreur
              this.hasError = true

              // reset la partie
              this.resetGame()

              // erreur
              console.log("ERROR apiResponse", apiResponse)
            })
        })
      }

      private resetGame() {

        this.hasStarted = false
        this.isTaping = false
        this.isFinished = false
      }
    //
  }
//
