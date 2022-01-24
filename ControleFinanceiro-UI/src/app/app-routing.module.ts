import { ListFuncoesComponent } from './components/Funcao/list-funcoes/list-funcoes.component';
import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import { ListCategoriasComponent } from './components/Categoria/list-categorias/list-categorias.component';
import { AddFuncoesComponent } from './components/Funcao/add-funcoes/add-funcoes.component';
import { UpdateFuncoesComponent } from './components/Funcao/update-funcoes/update-funcoes.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
