import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  description: string;
  constructor(
      private dialogRef: MatDialogRef<MatDialog>,
      @Inject(MAT_DIALOG_DATA) data:any) {
        this.description = data.description;
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
