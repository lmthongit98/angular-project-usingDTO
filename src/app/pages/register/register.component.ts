import { Component, Input, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IPage } from '../Ipage';
import { NgControl } from '@angular/forms';
import { ValidationService } from 'src/app/service/validation.service';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userLoginForm:any;

  confirmPass = {
    password: '',
  }


  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) {
    this.userLoginForm = this.formBuilder.group({
      email: ['',[Validators.required, ValidationService.emailValidator]],
      username: ['',Validators.required,],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      passConfirm: ['', [Validators.required,  ValidationService.passwordsMatch(this.confirmPass)]],
    });

  }

  ngOnInit(): void {

  }

  saveUser() {
    if (this.userLoginForm.dirty && this.userLoginForm.valid) {
      this.service.register(this.userLoginForm.value as UserModel).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/login'])

        },
        error => console.log(error)
      )
    }
  }



}
