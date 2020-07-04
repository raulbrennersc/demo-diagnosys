import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxMaskModule, IConfig } from 'ngx-mask'


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    LeafletDrawModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000', 'diagnosys-demo.azurewebsites.net'],
        blacklistedRoutes: ['localhost:5000/api/auth', 'diagnosys-demo.azurewebsites.net/api/auth'],
      },
    }),
    NgbModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
