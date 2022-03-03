import { DashboardService } from './services/dashboard.service';
import { GanhosService } from './services/ganhos.service';
import { DespesasService } from './services/despesas.service';
import { CartoesService } from './services/cartoes.service';
import { FuncoesService } from './services/funcoes.service';
import { CategoriasService } from './services/categorias.service';
import { TiposService } from './services/tipos.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MonthsService } from './services/months.service';
import { UserService } from './services/user.service';



import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import {
  ListCategoriasComponent,
  DialogDeleteCategoriasComponent,
} from './components/Categoria/list-categorias/list-categorias.component';
import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';
import {
  DialogDeleteFuncoesComponent,
  ListFuncoesComponent,
} from './components/Funcao/list-funcoes/list-funcoes.component';
import { AddFuncoesComponent } from './components/Funcao/add-funcoes/add-funcoes.component';
import { UpdateFuncoesComponent } from './components/Funcao/update-funcoes/update-funcoes.component';
import { RegistrarUserComponent } from './components/User/Registro/registrar-user/registrar-user.component';
import { UserLoginComponent } from './components/User/Login/user-login/user-login.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './components/Dashboard/header/header.component';
import { AddCartaoComponent } from './components/Cartao/add-cartao/add-cartao.component';
import {
  ListCartaoComponent,
  DialogDeleteCartaoComponent,
} from './components/Cartao/list-cartao/list-cartao.component';
import { UpdateCartaoComponent } from './components/Cartao/update-cartao/update-cartao.component';
import {
  ListDespesasComponent,
  DialogDeleteDespesasComponent,
} from './components/Despesa/list-despesas/list-despesas.component';
import { AddDespesasComponent } from './components/Despesa/add-despesas/add-despesas.component';
import { UpdateDespesasComponent } from './components/Despesa/update-despesas/update-despesas.component';
import {
  ListGanhosComponent,
  DialogDeleteGanhosComponent,
} from './components/Ganhos/list-ganhos/list-ganhos.component';
import { AddGanhosComponent } from './components/Ganhos/add-ganhos/add-ganhos.component';
import { UpdateGanhosComponent } from './components/Ganhos/update-ganhos/update-ganhos.component';
import { UpdateUserComponent } from './components/User/update-user/update-user.component';
import { IndexComponent } from './components/Dashboard/index/index.component';

import { ChartsModule } from 'ng2-charts';

export function GetUserToken() {
  return localStorage.getItem('Token');
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
    DashboardComponent,
    HeaderComponent,
    AddCartaoComponent,
    ListCartaoComponent,
    UpdateCartaoComponent,
    DialogDeleteCartaoComponent,
    ListDespesasComponent,
    AddDespesasComponent,
    UpdateDespesasComponent,
    DialogDeleteDespesasComponent,
    ListGanhosComponent,
    AddGanhosComponent,
    UpdateGanhosComponent,
    DialogDeleteGanhosComponent,
    UpdateUserComponent,
    IndexComponent,
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
        disallowedRoutes: [],
      },
    }),
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ChartsModule,
    NgxSpinnerModule,
  ],
  providers: [
    TiposService,
    CategoriasService,
    FuncoesService,
    CartoesService,
    DespesasService,
    AuthGuardService,
    MonthsService,
    UserService,
    GanhosService,
    HttpClientModule,
    DashboardService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // exports:[NgxSpinnerModule],
})
export class AppModule {}
