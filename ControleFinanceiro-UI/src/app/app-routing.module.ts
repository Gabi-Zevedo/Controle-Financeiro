import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { ListFuncoesComponent } from './components/Funcao/list-funcoes/list-funcoes.component';
import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import { ListCategoriasComponent } from './components/Categoria/list-categorias/list-categorias.component';
import { AddFuncoesComponent } from './components/Funcao/add-funcoes/add-funcoes.component';
import { UpdateFuncoesComponent } from './components/Funcao/update-funcoes/update-funcoes.component';
import { RegistrarUserComponent } from './components/User/Registro/registrar-user/registrar-user.component';
import { UserLoginComponent } from './components/User/Login/user-login/user-login.component';
import { AddCartaoComponent } from './components/Cartao/add-cartao/add-cartao.component';
import { ListCartaoComponent } from './components/Cartao/list-cartao/list-cartao.component';
import { UpdateCartaoComponent } from './components/Cartao/update-cartao/update-cartao.component';
import { AddDespesasComponent } from './components/Despesa/add-despesas/add-despesas.component';
import { ListDespesasComponent } from './components/Despesa/list-despesas/list-despesas.component';
import { UpdateDespesasComponent } from './components/Despesa/update-despesas/update-despesas.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'categorias/listagem',
        component: ListCategoriasComponent,
      },
      {
        path: 'categorias/adicionar',
        component: AddCategoriaComponent,
      },
      {
        path: 'categorias/atualizar/:id',
        component: UpdateCategoriaComponent,
      },
      {
        path: 'funcoes/listagem',
        component: ListFuncoesComponent,
      },
      {
        path: 'funcoes/adicionar',
        component: AddFuncoesComponent,
      },
      {
        path: 'funcoes/atualizar/:id',
        component: UpdateFuncoesComponent,
      },
      {
        path: 'cartoes/adicionar',
        component: AddCartaoComponent,
      },
      {
        path: 'cartoes/listagem',
        component: ListCartaoComponent,
      },
      {
        path: 'cartoes/atualizar/:id',
        component: UpdateCartaoComponent,
      },
      {
        path: 'despesas/adicionar',
        component: AddDespesasComponent,
      },
      {
        path: 'despesas/listagem',
        component: ListDespesasComponent,
      },
      {
        path: 'despesas/atualizar/:id',
        component: UpdateDespesasComponent,
      },
    ],
  },

  {
    path: 'user/registrar',
    component: RegistrarUserComponent,
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
