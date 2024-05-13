import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Signin} from "./signin/signin.model";
import {Observable} from "rxjs";
import {AuthResponse} from "./auth.response";
import { AppRoutes } from 'src/app/app.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoints: any = {
    signin: "api/auth/signin"
};


  constructor(private httpClient: HttpClient) { }

  protected onFormSubmitHandler(event: Event) {
    event.preventDefault();
    if (this.signInForm.valid) {
        this.isLoading = true;
        const signInData: Signin = this.signInForm.value;
        this.authService.signIn(signInData).subscribe(
            (response) => {
                // Gérer la réponse réussie (par exemple, stocker le jeton dans le stockage local)
                this.isLoading = false;
                this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
            },
            (error) => {
                // Gérer les erreurs (par exemple, afficher les messages d'erreur)
                this.isLoading = false;
                console.error(error);
                this.serverErrors.push(error.message || "An error occurred during sign-in.");
            }
        );
    } else {
        // Marquer les champs du formulaire comme touchés pour afficher les messages d'erreur
        this.signInForm.markAllAsTouched();
    }
}

}
