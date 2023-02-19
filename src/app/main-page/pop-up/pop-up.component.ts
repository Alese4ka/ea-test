import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {
  public isSuccess: boolean;
  public isError: boolean;

  constructor(
    private dialogRef: MatDialogRef<PopUpComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isSuccess = data.isSuccess;
    this.isError = data.isError;
  }
}
