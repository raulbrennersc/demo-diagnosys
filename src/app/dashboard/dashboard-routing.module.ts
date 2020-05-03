import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ModulosComponent } from './modulos/modulos.component';

const routes: Routes = [{ path: '', component: DashboardComponent,
  children: [{ path: '', component: ModulosComponent}

  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
