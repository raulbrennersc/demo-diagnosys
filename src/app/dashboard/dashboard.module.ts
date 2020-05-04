import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModulosComponent } from './modulos/modulos.component';


@NgModule({
  declarations: [DashboardComponent, ModulosComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LeafletModule,
    LeafletDrawModule,
  ]
})
export class DashboardModule { }
