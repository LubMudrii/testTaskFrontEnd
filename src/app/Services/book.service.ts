import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {throwError} from "rxjs";
import {catchError, timeout} from "rxjs/operators";
import {Book} from "../Models/Book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  private static handleError(err: any) {
    if (err.status === 400) {
      return throwError(err.error);
    }
    if (err.name === 'TimeoutError' || err.status === 0) {
      return throwError({'Connection error': 'no connection to the server'});
    }
  }
  getBookDetails() {
    return this.http.get(this.configService.getApiUrl() + '/GetBooksDetails').pipe(
      timeout(10000),
      catchError(BookService.handleError)
    );
  }

  updateBooks(books: Array<Book>) {
    return this.http.post(this.configService.getApiUrl() + '/UpdateBooks', books).pipe(
      timeout(10000),
      catchError(BookService.handleError)
    );
  }
}
