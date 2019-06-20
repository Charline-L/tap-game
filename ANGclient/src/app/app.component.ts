/* 
Imports 
*/
  import { Component } from '@angular/core';
//


/* 
Definition
*/
  @Component({
    selector: 'app-root',
    template: `
      <header class="maxWidth">
        <app-header></app-header>
      </header>
      
      <main class="maxWidth">
        <router-outlet></router-outlet>
      </main>
    `,
  })
//

/* 
Export
*/
  export class AppComponent {
    title = 'ANGclient';
  }
//
