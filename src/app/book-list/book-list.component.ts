import { Component, OnInit } from '@angular/core';
import {BookService} from "../Services/book.service";
import {IdentityError} from "../Models/IdentityError";
import {PageEvent} from "@angular/material/paginator";
import {Book} from "../Models/Book";
import {BookType} from "../Models/BookType";
import {BookDetails} from "../ViewModels/BookDetails";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {DeleteBookDialogComponent} from "../HelperComponents/delete-book-dialog/delete-book-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateBookDialogComponent} from "../HelperComponents/create-book-dialog/create-book-dialog.component";
import {ConfigService} from "../Services/config.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  Errors: IdentityError = new IdentityError();
  ShowSpinner: boolean = true;
  startIndex: number = 0;
  endIndex: number = 10;
  Books: Array<Book> = [];
  BookTypes: Array<BookType> = [];
  PageBooks: Array<Book> = [];
  Selected: Array<Book> = [];

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private config: ConfigService) {
  }

  ngOnInit(): void {
    this.bookService.getBookDetails().toPromise()
      .then((res: BookDetails) => {
        this.Books = res.books;
        this.BookTypes = res.types;
        this.PageBooks = this.Books.slice(this.startIndex, this.endIndex);
        this.ShowSpinner = false;
      })
      .catch(err => {
        this.Errors.dictionary = err;
        this.ShowSpinner = false;
      });

     setInterval(() => {
        this.bookService.updateBooks(this.Books).toPromise().then();
      }, this.config.getUpdateTime());

  }

  CreateNew() {
    const dialogRef = this.dialog.open(CreateBookDialogComponent, {
      width: '60%',
      data: {
        types: this.BookTypes,
        isbns: this.Books.map(x => x.isbn)
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        this.Books.push(res);
        this.startIndex = 0;
        this.endIndex = 10;
        this.PageBooks = this.Books.slice(this.startIndex, this.endIndex);
      }
    });
  }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.Books.length - this.startIndex < event.pageSize) {
      this.endIndex = this.Books.length;
    }
    this.PageBooks = this.Books.slice(this.startIndex, this.endIndex);
  }

  getTypeNameByID(bookTypeID: number) {
    return this.BookTypes.find(x => x.typeID == bookTypeID).name;
  }

  SelectDeselectAll(books: MatSelectionList) {
    if (books.selectedOptions.selected.length === this.PageBooks.length) {
      books.deselectAll();
    } else {
      books.selectAll();
    }
  }

  SelectedChanges(selected: MatListOption[]) {
    console.log(selected);
    this.Selected = [];
    selected.map(book => this.Selected.push(book.value));
  }

  Delete() {
    if (this.Selected.length > 0) {
      this.Errors = new IdentityError();
      const dialogRef = this.dialog.open(DeleteBookDialogComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log(this.Selected);
          this.Books = this.Books.filter(x => this.Selected.indexOf(x) < 0);
          this.startIndex = 0;
          this.endIndex = 10;
          this.PageBooks = this.Books.slice(this.startIndex, this.endIndex);
        }
      });
    } else {
      this.Errors.set('Delete error', 'You must to select at least one book');
    }
  }
}
