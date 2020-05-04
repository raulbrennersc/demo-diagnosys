import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModulosComponent } from './modulos/modulos.component';


@NgModule({
  declarations: [DashboardComponent, ModulosComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LeafletModule,
  ]
})
export class DashboardModule { }
