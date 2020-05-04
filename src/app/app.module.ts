import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

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
    JwtModule.forRoot({
      config: {
         tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth'],
      }
   }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
