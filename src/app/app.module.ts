// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { httpInterceptorProviders } from './_core/interceptors/interceptors.provider';
import { StrategyProviders } from "./_core/strategies/strategy.providers";
import { UtilsProviders } from "./shared/utils/utils.providers";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommercialModule } from './commercial/commercial.module'; // Assurez-vous que ce module est correctement exporté

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ChartModule,
    CommercialModule// Assurez-vous que ce module est utilisé dans l'application
  ],
  providers: [
    httpInterceptorProviders,
    StrategyProviders,
    UtilsProviders,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
