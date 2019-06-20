/*
Imports & definition
*/
  // Imports
  import {Component, OnInit} from '@angular/core';
  import {Router} from '@angular/router';

  // Inner
  import { LinkModel } from '../../models/link.model';
  import { AuthService } from "../../services/auth/auth-service.service";
import {ApiResponseModel} from "../../models/api.reponse.model";

  // Definition
  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    providers: [ AuthService ]
  })
//


/*
Export
*/
export class HeaderComponent implements OnInit {

  /*
  Config.
  */
    public hasNav: boolean = false
    public firstLink: LinkModel = {
      name: "",
      route: ""
    }
    public titlePage: string
    public baseline: string

    constructor(
      private Router: Router,
      private AuthService: AuthService
    ) {

      // watch le changement de routes
      this.Router.events.subscribe(() => {
        this.updateHeader()
      });
    }
  //

  /*
  Methods
  */
    private setupNav() {

      // adapte le menu en fonction de la page
      if (this.Router.url === '/') this.hasNav = false
      else if (this.Router.url === '/me') {

        // affiche la nav
        this.hasNav = true

        // change la route
        this.firstLink.name = 'scores'
        this.firstLink.route = '/tap'
      }
      else if (this.Router.url === '/tap') {

        // affiche la nav
        this.hasNav = true

        // change la route
        this.firstLink.name = 'play'
        this.firstLink.route = '/me'
      }
    }

    private setUpTitle() {

      if (this.Router.url === '/') this.titlePage = 'Welcome on tapboard'
      else if (this.Router.url === '/me') this.titlePage = 'Hello ' + localStorage.getItem('firstName')
      else if (this.Router.url === '/tap') this.titlePage = 'Score Table'
    }

    private setupBaseline() {

      if (this.Router.url === '/') this.baseline = 'Login or register to start typing'
      else if (this.Router.url === '/me') this.baseline = 'You have ten seconds to tap. Ready? Steady? tap!'
      else if (this.Router.url === '/tap') this.baseline = 'Here is the list of the scores'
    }

    public updateHeader() {

      this.setupNav()
      this.setUpTitle()
      this.setupBaseline()
    }

    public logout() {

      // déconnecte l'utilisateur
      this.AuthService.logout()
        .then( (apiResponse: ApiResponseModel) => {

          // efface le nom
          localStorage.setItem('firstName', '')

          // renvoit vers la home
          this.Router.navigate(['/']);
        })
    }
  //

  /*
  Hooks
  */
    ngOnInit(){
      this.updateHeader()
    }
  //
}
