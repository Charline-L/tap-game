/* 
Imports & definition 
*/
  // Imports
  import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { IdentityModel } from '../../models/identity.model';

  // Definition
  @Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
  })
//


/* Export */
  export class FormLoginComponent implements OnInit {

    /* 
    Config.
    */
      // Input/Output
      @Input() errorEmailMessage: String
      @Input() errorPasswordMessage: String
      @Output() sendFormData = new EventEmitter();

      // Declaration
      public form: FormGroup;
      public formData: IdentityModel;

      // Instanciation
      constructor(
        private FormBuilder: FormBuilder
      ) { };
    //


    /* 
    Methods
    */
      // Reset form
      private resetForm = () => {
        // Set validator
        this.form = this.FormBuilder.group({
          email: [undefined, Validators.required],
          password: [undefined, Validators.required]
        });

        // Set form data obbject
        this.formData = {
          email: undefined,
          password: undefined
        };
      };

      // Submit form
      public submitForm = () => {
        // Set form data
        this.formData = {
          email: this.form.value.email,
          password: this.form.value.password,
        }

        // Use event emmiter
        this.sendFormData.emit(this.formData);
      };
    //

    /* 
    Hooks
    */
      ngOnInit() {
        this.resetForm();
      };
    //
  };
//
