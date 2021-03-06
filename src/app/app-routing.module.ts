import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './_guards/autenticacao.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule) },
  { 
    path: 'painel',
    runGuardsAndResolvers: 'always',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
