import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from 'src/app/_common/map/map.component';
import { EtapasComponent } from 'src/app/_common/etapas/etapas.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';



@NgModule({
  declarations: [MapComponent, EtapasComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletDrawModule
  ],
  exports: [
    MapComponent,
    EtapasComponent
  ]
})
export class SharedComponentsModule { }
