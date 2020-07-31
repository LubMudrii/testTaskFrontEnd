import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IdentityError} from "../../Models/IdentityError";
import {BookType} from "../../Models/BookType";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Book} from "../../Models/Book";

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-book-dialog.component.html',
  styleUrls: ['./create-book-dialog.component.css']
})
export class CreateBookDialogComponent implements OnInit {
  FilteredTypes: Array<BookType> = [];
  Errors: IdentityError = new IdentityError();
  BookInfo: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private formBuilder: FormBuilder) {
  }

  uniqueISBNValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log('here');
    if (control.value !== undefined && this.data.isbns.find(x => x == control.value)) {
      this.Errors = new IdentityError();
      this.Errors.set('Book isbn error', 'isbn must be unique');
      return { 'uniqueISNB': true };
    }
    return null;
  }

  ngOnInit(): void {
    this.BookInfo = this.formBuilder.group({
      ISBN: ['', Validators.required],
      Title: ['', Validators.required],
      Author: ['', Validators.required],
      Language: ['', Validators.required],
      CountOfPages: ['', Validators.compose([Validators.min(1), Validators.max(99999), Validators.required])],
      PublicationDate: ['', Validators.required],
      BookTypeID: ['', Validators.required]
    });
  }


  FilterTypes(value: string) {
    this.FilteredTypes = this.data.types.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }

  displayFn(type: BookType): string | undefined {
    return type.name;
  }

  submit() {
    const typeID = this.getTypeID();
    if (this.BookInfo.valid) {
      if (!this.data.isbns.find(x => x == this.BookInfo.get('ISBN').value)) {
        if (typeID) {
          const data: Book = {
            author: this.BookInfo.get('Author').value,
            bookTypeID: typeID,
            countOfPages: this.BookInfo.get('CountOfPages').value,
            isbn: this.BookInfo.get('ISBN').value,
            language: this.BookInfo.get('Language').value,
            publicationDate: this.BookInfo.get('PublicationDate').value,
            title: this.BookInfo.get('Title').value
          };
          this.dialogRef.close(data);
        } else {
          this.Errors = new IdentityError();
          this.Errors.set('Book type error', 'you need to select category type from dropdown.');
        }
      } else {
        this.Errors = new IdentityError();
        this.Errors.set('Book isbn error', 'isbn must be unique');
      }
    } else {
      this.Errors = new IdentityError();
      this.Errors.set('Data error', 'input correct data');
    }
  }

  getTypeID() {
    let typeID: number;
    if ((typeof this.BookInfo.get('BookTypeID').value) == "string") {
      const s = this.data.types.filter(x => x.name === this.BookInfo.get('BookTypeID').value);
      typeID = s.typeID;
    } else {
      typeID = this.BookInfo.get('BookTypeID').value['typeID'];
    }
    return typeID;
  }
}
