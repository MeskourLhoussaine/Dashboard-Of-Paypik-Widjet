import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarchandGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isMarchand()) {
      return true; // Autoriser l'accès si l'utilisateur est un marchand
    } else {
      this.router.navigate(['/']); // Rediriger vers la page d'accueil si l'utilisateur n'est pas un marchand
      return false;
    }
  }
}
