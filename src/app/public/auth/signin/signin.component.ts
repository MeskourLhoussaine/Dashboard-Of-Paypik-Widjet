import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatetimeHelper } from 'src/app/_core/helpers/datetime.helper';
import { CommonService } from 'src/app/_core/services/common.service';
import { AdminRoutes } from 'src/app/admin/admin.routes';
import { AppRoutes } from 'src/app/app.routes';
import { pageTransition } from 'src/app/shared/utils/animations';
import { Images } from 'src/assets/data/images';
import { AlertType } from '../../../shared/components/alert/alert.type';
import { PublicRoutes } from '../../public.routes';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';
import { Signin } from './signin.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [pageTransition],
})
export class SigninComponent implements OnInit {
  readonly signinBannerImage: string = Images.bannerLogo;
  merchantId!: number;
  isLoading: boolean = false;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  serverErrors: string[] = [];

  signInForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  constructor(
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.params.subscribe(params => {
      this.merchantId = +params['id'];
    });
  }

  protected readonly AlertType = AlertType;

  onAlertCloseHandler(event: any): void {
    // Réinitialiser les erreurs du serveur lors de la fermeture de l'alerte
    this.serverErrors = [];
  }

  onSubmit(): void {
    console.log(this.signInForm.value);
  
    const username = this.signInForm.value.username;
    const password = this.signInForm.value.password;
  
    if (username && password) {
      const signinData: Signin = { username, password };
  
      this.authService.signin(signinData).subscribe(
        (data) => {
          console.log('Access Token:', data.accessToken);
          console.log('User Roles:', data.roles);
          this.tokenService.saveToken(data.accessToken);
          
          if (data.roles.includes('ROLE_ADMIN')) {
            // Si l'utilisateur est administrateur, rediriger vers les deux pages sans appeler findMerchantIdByMerchantName
            this.redirectBasedOnRole(data.roles);
          } else if (data.roles.includes('ROLE_MARCHAND')) {
            // Si l'utilisateur est marchand, appeler findMerchantIdByMerchantName avant de rediriger
            this.authService.findMerchantIdByMerchantName(username).subscribe(
              (merchantId) => {
                this.merchantId = merchantId;
                console.log('Merchant ID:', merchantId);
                this.router.navigate(['/marchand/dashboard/' + this.merchantId]);
              },
              (error) => {
                console.error('Error fetching merchant ID:', error);
                // Gérer les erreurs ici...
                alert('An error occurred while fetching the merchant ID. Please try again.');
              }
            );
          } else {
            // Pour les autres rôles, rediriger en fonction du rôle
            this.redirectBasedOnRole(data.roles);
          }
        },
        (err) => {
          console.log('Login Error:', err);
          if (err.status === 401) {
            alert('Email or password is incorrect.');
          } else {
            alert('An error occurred during login. Please try again.');
          }
        }
      );
    } else {
      alert('Please enter both username and password.');
      console.log('Username or password is not defined');
    }
  }
  
  // Fonction pour rediriger l'utilisateur en fonction de son rôle
 // Fonction pour rediriger l'utilisateur en fonction de son rôle
private redirectBasedOnRole(roles: string[]): void {
  if (roles.includes('ROLE_ADMIN')) {
    // Si l'utilisateur est administrateur, rediriger vers le tableau de bord admin
    this.router.navigate(['/admin/dashboard']);
    
    if (this.merchantId) {
      // Si l'ID du marchand est disponible, utiliser cet ID pour la redirection vers le tableau de bord du marchand
      this.router.navigate(['/marchand/dashboard/' + this.merchantId]);
    } else {
      // Si l'ID du marchand n'est pas disponible, gérer cela comme nécessaire
      console.error('Merchant ID is not available');
      // Vous pouvez rediriger vers une page par défaut ou afficher un message d'erreur
    }
  } else if (roles.includes('ROLE_COMERCIAL') ) {
    // Si l'utilisateur a les rôles "ROLE_COMERCIAL" ou "ROLE_MARCHAND", rediriger vers la page commerciale
    this.router.navigate(['/commercial']);
    
    if (this.merchantId) {
      // Si l'ID du marchand est disponible, utiliser cet ID pour la redirection vers le tableau de bord du marchand
      this.router.navigate(['/marchand/dashboard/' + this.merchantId]);
    } else {
      // Si l'ID du marchand n'est pas disponible, gérer cela comme nécessaire
      console.error('Merchant ID is not available');
      // Vous pouvez rediriger vers une page par défaut ou afficher un message d'erreur
    }
  } else {
    // Si aucun des rôles ci-dessus n'est présent, rediriger vers une page par défaut
    this.router.navigate(['/default']);
  }
}

  
}
