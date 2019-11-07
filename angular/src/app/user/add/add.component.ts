import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {usernameValidator} from "../../directive/usernamevalidator.directive";
import {existValidator} from "../../directive/existvalidator.directive";
import {UserService} from "../../services/user.service";
import {confirmValidator} from "../../directive/confirmvalidator.directive";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addUserFormGroup:FormGroup;

  constructor(private userService:UserService) {
    this.addUserFormGroup = new FormGroup({
      username : new FormControl('',[
        Validators.required,
        usernameValidator(/^[a-zA-Z0-9_-]{4,16}$/i)
      ],[
        existValidator(this.userService)
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      confirm_password : new FormControl('',[
      ])
    },[
      confirmValidator()
    ]);
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
