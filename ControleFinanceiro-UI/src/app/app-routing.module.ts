import { UpdateCategoriaComponent } from './components/Categoria/update-categoria/update-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriaComponent } from './components/Categoria/add-categoria/add-categoria.component';
import { ListCategoriasComponent } from './components/Categoria/list-categorias/list-categorias.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
