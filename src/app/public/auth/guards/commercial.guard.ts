import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommercialGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isCommercial()) {
      return true;
    } else {
      this.router.navigate(['']); // Rediriger vers la page de connexion si l'utilisateur n'est pas un commercial
      return false;
    }
  }
}
