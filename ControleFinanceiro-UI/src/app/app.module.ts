import { FuncoesService } from './services/funcoes.service';
import { CategoriasService } from './services/categorias.service';
import { TiposService } from './services/tipos.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule} from "ngx-mask";
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import {
  ListCategoriasComponent,
  DialogDeleteCategoriasComponent,
} from './components/Categoria/list-categorias/list-categorias.component';
import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';
import { DialogDeleteFuncoesComponent, ListFuncoesComponent } from './components/Funcao/list-funcoes/list-funcoes.component';
import { AddFuncoesComponent } from './components/Funcao/add-funcoes/add-funcoes.component';
import { UpdateFuncoesComponent } from './components/Funcao/update-funcoes/update-funcoes.component';
import { RegistrarUserComponent } from './components/User/Registro/registrar-user/registrar-user.component';
import { UserLoginComponent } from './components/User/Login/user-login/user-login.component';

export function GetUserToken(){
  return localStorage.getItem("Token");
}


@NgModule({
  declarations: [
    AppComponent,
    ListCategoriasComponent,
    AddCategoriaComponent,
    UpdateCategoriaComponent,
    DialogDeleteCategoriasComponent,
    ListFuncoesComponent,
    AddFuncoesComponent,
    DialogDeleteFuncoesComponent,
    UpdateFuncoesComponent,
    RegistrarUserComponent,
    UserLoginComponent,
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
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: GetUserToken,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    TiposService,
    CategoriasService,
    FuncoesService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
