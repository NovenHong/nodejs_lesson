import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ErrorComponent>) { }

  ngOnInit() {
    if(this.data.timeout != undefined){
      setTimeout(() => {
        this.dialogRef.close();
      },this.data.timeout);
    }
  }

}
