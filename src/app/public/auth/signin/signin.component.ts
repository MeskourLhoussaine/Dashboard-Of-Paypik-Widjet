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
          console.log(data.accessToken);
          this.tokenService.saveToken(data.accessToken);
          // Redirection basée sur le rôle de l'utilisateur
          this.redirectBasedOnRole(data.roles);
        },
        (err) => {
          console.log(err);
          alert('Email or password is not correct');
        }
      );
    } else {
      // Gérer le cas où les valeurs du formulaire ne sont pas définies
      console.log('Username or password is not defined');
    }
  }
  // Fonction pour rediriger l'utilisateur en fonction de son rôle
  private redirectBasedOnRole(roles: string[]): void {
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin/dashboard']);
    } else if (roles.includes('ROLE_COMERCIAL')) {
      this.router.navigate(['/commercial']);
    } else if (roles.includes('ROLE_MARCHAND')) {
      this.router.navigate(['marchand/dashboard/4']);
    } else {
      this.router.navigate(['/default']);
    }
  }
}
