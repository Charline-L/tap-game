/* 
Imports & definition 
*/
  // Imports
  import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { IdentityModel } from '../../models/identity.model';

  // Definition
  @Component({
    selector: 'app-form-register',
    templateUrl: './form-register.component.html',
  })
//


/* Export */
  export class FormRegisterComponent implements OnInit {

    /* 
    Config.
    */
      // Input/Output
      @Input() resetFormData: Boolean
      @Input() errorUserExist: String
      @Output() sendFormData = new EventEmitter();

      // Declaration
      public form: FormGroup;
      public formData: IdentityModel;
      public passwordError: Boolean = false;

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
          firstName: [undefined, Validators.required],
          lastName: [undefined, Validators.required],
          email: [undefined, Validators.required],
          password: [undefined, Validators.required],
          securePassword: [undefined, Validators.required],
          gdpr: [undefined, Validators.required]
        });

        // Set form data obbject
        this.formData = {
          email: undefined,
          password: undefined,
          securePassword: undefined,
          firstName: undefined,
          lastName: undefined
        };
      };

      // Submit form
      public submitForm = () => {
        // Check passwords
        if(this.form.value.password !== this.form.value.securePassword){ this.passwordError = true } 
        else{
          // Set login data
          this.formData = {
            email: this.form.value.email,
            password: this.form.value.password,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
          }

          // Use event emmiter
          this.sendFormData.emit(this.formData);
        };
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
