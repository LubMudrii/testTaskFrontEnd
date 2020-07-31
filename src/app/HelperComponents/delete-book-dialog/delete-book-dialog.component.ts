import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-book-dialog',
  templateUrl: './delete-book-dialog.component.html',
  styleUrls: ['./delete-book-dialog.component.css']
})
export class DeleteBookDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
