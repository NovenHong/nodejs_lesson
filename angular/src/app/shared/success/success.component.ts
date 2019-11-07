import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<SuccessComponent>) { }

  ngOnInit() {
    if(this.data.timeout != undefined){
      setTimeout(() => {
        this.dialogRef.close();
      },this.data.timeout);
    }
  }

}
