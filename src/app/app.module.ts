import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import {RouterModule, Routes} from "@angular/router";
import { CreateBookDialogComponent } from './HelperComponents/create-book-dialog/create-book-dialog.component';
import {BookService} from "./Services/book.service";
import {ConfigService} from "./Services/config.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import { DeleteBookDialogComponent } from './HelperComponents/delete-book-dialog/delete-book-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BookListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    CreateBookDialogComponent,
    DeleteBookDialogComponent
  ],
  entryComponents: [
    CreateBookDialogComponent,
    DeleteBookDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    BookService,
    ConfigService,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
