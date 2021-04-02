import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ValidationService } from 'src/app/service/validation.service';
import { IPage } from '../Ipage';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, IPage {

  matcher = new MyErrorStateMatcher();

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  userLoginForm = new FormGroup({})
  errorLogin = undefined;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.userLoginForm.controls; }



  onSubmit() {
    const { username, password } = this.userLoginForm.value;
    this.service.login(username, password).pipe(first()).subscribe(
      data => {
        this.errorLogin = undefined;
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.errorLogin = error;
        this.loading = false;
      })
  }

}
