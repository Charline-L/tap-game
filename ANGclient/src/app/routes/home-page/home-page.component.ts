/* 
Imports & definition 
*/
  // Imports
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { IdentityModel } from '../../models/identity.model';
  import { ApiResponseModel } from "../../models/api.reponse.model";
  import { AuthService } from "../../services/auth/auth-service.service";

  // Definition
  @Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.sass'],
    providers: [ AuthService ]
  })
//


/* 
Export
*/
  export class HomePageComponent implements OnInit {

    /* 
    Config.
    */
      // Register form data
      public resetFormDataRegister: Boolean = false;

      // switch entre login et register
      public isLoginActive: Boolean = true
      public isRegisterActive: Boolean = false

      // message d'erreur
      public errorEmailMessage: String = ""
      public errorPasswordMessage: String = ""
      public errorUserExist: String = ""

      // Module injection
      constructor(
        private AuthService: AuthService,
        private Router: Router
      ) {};
    //


    /*
    Methods
    */
      // Register new user
      public registerUser = (data: IdentityModel) => {
        // Send user data
        this.AuthService.register(data)
        .then( (apiResponse: ApiResponseModel) => {

          // Reset form data
          this.resetFormDataRegister = true;

          // change l'affichage vers le login
          this.isLoginActive = true
          this.isRegisterActive = false
        })
        .catch( (apiResponse: ApiResponseModel) => {

          // affiche le message
          this.errorUserExist = apiResponse.error
        })
      };

      // Connnect new user
      public connectUser = (data: IdentityModel) => {

        // Send user data
        this.AuthService.login(data)
        .then( (apiResponse: ApiResponseModel) => {

          // Enregistre le nom de l'utilisateur en local
          localStorage.setItem('firstName', apiResponse.data.firstName)

          // renvoit vers la page /me
          this.Router.navigate(['/me']);
        })
        .catch( (apiResponse: ApiResponseModel) => {

          // affiche le message d'erreur correspondant
          const error = apiResponse.error === "Password is not valid" ? 'errorPasswordMessage' : 'errorEmailMessage'
          this[error] = apiResponse.error;
        })
      };

      // changer de visibilité entre login et register
      public toggleLogin() {
        this.isLoginActive = !this.isLoginActive
      }

      public toggleRegister() {
        this.isRegisterActive = !this.isRegisterActive
      }
    //


    /* 
    Hooks
    */
      ngOnInit() { };
    //
  };
//
