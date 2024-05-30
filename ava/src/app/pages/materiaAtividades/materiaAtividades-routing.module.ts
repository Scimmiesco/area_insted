import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MateriaAtividadesComponent } from './pages/materiaAtividades/materiaAtividades.component';

const routes: Routes = [
  {
    path: '',
    component: materiaAtividadesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaAtividadesRoutingModule {}