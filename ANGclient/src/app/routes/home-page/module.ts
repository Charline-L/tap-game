/* 
Imports 
*/
    // Angular
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';

    // Inner
    import { Routing } from './router';
    import { HomePageComponent } from './home-page.component';
    import { FormRegisterModule } from "../../components/form-register/module";
    import { FormLoginModule } from "../../components/form-login/module";
//


/* 
Definition 
*/
    @NgModule({
        declarations: [ HomePageComponent ],
        imports: [ 
            CommonModule, 
            Routing,
            FormRegisterModule,
            FormLoginModule
        ]
    })
//


/* 
Export 
*/
    export class Module {};
//
