import { CategoriasService } from './services/categorias.service';
import { TiposService } from './services/tipos.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import {
  ListCategoriasComponent,
  DialogDeleteCategoriasComponent,
} from './components/Categoria/list-categorias/list-categorias.component';
import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCategoriasComponent,
    AddCategoriaComponent,
    UpdateCategoriaComponent,
    DialogDeleteCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [TiposService, CategoriasService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
