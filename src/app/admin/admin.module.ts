import { MoreComponent } from './views/more/more.component';
import { TransactionComponent } from './views/transaction/transaction.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AdminComponent } from './admin.component';
import { AdminPageNotFoundComponent } from './views/admin-page-not-found/admin-page-not-found.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TableComponent } from './views/table/table.component';
import { EventsComponent } from './views/events/events.component';
import { SettingsModule } from './views/settings/settings.module';
import { ElementsModule } from './views/elements/elements.module';
import { ScrollToTopComponent } from './views/scroll-to-top/scroll-to-top.component';
import { ModalModule } from '../shared/components/modal/modal.module';
import { AddmarchandformComponent } from './views/addmarchandform/addmarchandform.component';
import { SingletransactionComponent } from './views/singletransaction/singletransaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditmarchandformComponent } from './views/editmarchandform/editmarchandform.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IncreaseDirective } from './directives/increase.directive';
import { IncreaseNumberDirective } from './directives/increase-number.directive';
import { ChartComponent } from './views/chart/chart.component';






@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminPageNotFoundComponent,
    EventsComponent,
    MoreComponent,
    TableComponent,
    AddmarchandformComponent,
    SingletransactionComponent,
    EditmarchandformComponent,
    ChartComponent,
    IncreaseDirective,
    IncreaseNumberDirective
    
  

  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    SettingsModule,
    ElementsModule,
    TransactionComponent,
    ScrollToTopComponent,
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
   
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AdminModule { }
