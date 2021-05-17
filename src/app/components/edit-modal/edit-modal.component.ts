import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { ValidationService } from 'src/app/service/validation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {



  editForm:any;

  confirmPass = {
    password: '',
  }


  constructor(  public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel, private formBuilder: FormBuilder, private service: UserService, private router: Router) {
    this.editForm = this.formBuilder.group({

      email: ['',[Validators.required, ValidationService.emailValidator]],
      username: ['',Validators.required,],
      password: ['', [, ValidationService.passwordValidator]],
      passConfirm: ['', [  ValidationService.passwordsMatch(this.confirmPass)]],
    });

  }

  ngOnInit(): void {

  }

}
