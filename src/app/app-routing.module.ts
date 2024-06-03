import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { MarchandComponent } from './marchand/marchand.component';
import { CommercialComponent } from './commercial/commercial.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AppRoutes } from './app.routes';
import { AdminGuard } from './public/auth/guards/admin.guard';
import { CommercialGuard } from './public/auth/guards/commercial.guard';
import { MarchandGuard } from './public/auth/guards/marchand.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: AppRoutes.Admin,
    component: AdminComponent,
    canActivate: [AdminGuard],
     // Utilisation du AdminGuard pour protéger l'accès à la route d'administration
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: AppRoutes.Commercial,
    component: CommercialComponent,
    canActivate: [CommercialGuard], // Utilisation du CommercialGuard pour protéger l'accès à la route commerciale
    loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule),
  },
  {
    path: AppRoutes.Marchand,
    component: MarchandComponent,
    canActivate: [MarchandGuard], // Utilisation du MarchandGuard pour protéger l'accès à la route du marchand
    loadChildren: () => import('./marchand/marchand.module').then(m => m.MarchandModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
