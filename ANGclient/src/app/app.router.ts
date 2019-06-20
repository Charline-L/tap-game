/* 
Imports
https://gist.github.com/DWS-paris/886a33b6d5b0afecefc13595a807036d
*/
    // Angular
    import { Routes } from '@angular/router';

    // Import AuthGuuard to define route accessibility
    import { AuthGuard } from "./auth.guard";
//

/* 
Export
*/
    export const MainRouter: Routes = [
        {
            path: '',
            loadChildren: './routes/home-page/module#Module'
        },
        {
            path: 'me',
            loadChildren: './routes/user-page/module#Module',
            canActivate: [ AuthGuard ] // Accessible for connected user
        },
        {
          path: 'tap',
          loadChildren: './routes/scores-page/module#Module',
          canActivate: [ AuthGuard ] // Accessible for connected user
        }
    ];
//
