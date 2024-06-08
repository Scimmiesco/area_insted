import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MateriaAtividadesComponent } from './pages/materiaAtividades/MateriaAtividades.component';

const routes: Routes = [
  {
    path: '',
    component: MateriaAtividadesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaAtividadesRoutingModule {}
