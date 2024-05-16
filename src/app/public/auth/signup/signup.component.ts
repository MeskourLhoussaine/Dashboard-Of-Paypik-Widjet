import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatetimeHelper } from 'src/app/_core/helpers/datetime.helper';
import { CommonService } from 'src/app/_core/services/common.service';
import { pageTransition } from 'src/app/shared/utils/animations';
import { PublicRoutes } from '../../public.routes';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { AdminRoutes } from 'src/app/admin/admin.routes';
import { Images } from 'src/assets/data/images';
import { DemandeService } from 'src/app/public/services/demande.service';
import { Demandedto, Status } from '../../model/demandedto.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [pageTransition]
})
export class SignupComponent implements OnInit {
  
  readonly signupbannerImage: string = Images.auth.signup;
  isLoading: boolean = false;
  readonly currentYear: number = DatetimeHelper.currentYear;
  readonly publicRoutes = PublicRoutes;
  form!: FormGroup;

  selectedOption: string = '';

  constructor(
    public commonService: CommonService,
    private router: Router,
    private fb: FormBuilder,
    private demandeService: DemandeService
  ) {console.log('Constructor - myForm:', this.form);  }

  ngOnInit(): void {
    this.initializeForm();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit - myForm:', this.form);
  }

  handleChange(event: any) {
    this.selectedOption = event.target.value;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: [''],
      juridique: [''],
      c_capital: [''],
      c_address: [''],
      c_dg: [''],
      c_field: [''],
      c_web: [''],
      email: [''],
      phone: [''],
      c_fieldyears: [''],
      c_products: ['']
    });
  }
  
  submitMarchandForm(): void {
  if (this.form.valid) {
    // Récupérer la valeur du champ username
    const username = this.form.get('username')?.value;
    // Afficher le nom d'utilisateur dans la console
    console.log('Nom d\'utilisateur:', username);

    const demandeData: Demandedto = {
      demandeId: 0, 
      demandeMarchandName: this.form.get('username')?.value,
      demandeMarchandDescription: this.form.get('c_products')?.value,
      demandeMarchandPhone: this.form.get('phone')?.value,
      demandeMarchandHost: this.form.get('c_web')?.value,
      demandeMarchandEmail: this.form.get('email')?.value,
      demandeMarchandLogoUrl: '',
      demandeMarchandStatus: Status.JustCreated, // Utiliser la valeur correcte de l'enum Status
      demandeMarchandTypeActivite: this.form.get('c_field')?.value,
      demandeMarchandRcIf: this.form.get('c_capital')?.value,
      demandeMarchandSiegeAddresse: this.form.get('c_address')?.value,
      demandeMarchandDgName: this.form.get('c_dg')?.value ,
      demandeMarchandFormejuridique: this.form.get('juridique')?.value,
      demandeMarchandAnneeActivite: this.form.get('c_fieldyears')?.value,
      demandeIsAccepted: false,
      demandeIsVerified: false
    };
    this.isLoading = true;
    console.log("data entrer ",demandeData);
  (this.demandeService.saveDemande(demandeData)).subscribe(
  
          (saveDemande: any) => {
            console.log('Demande enregistrée avec succès:', saveDemande);
            // Optionally, perform any additional actions after saving
              this.isLoading = false;
     //   this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
            this.form.reset();
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de la demande:', error);
            // Handle error if needed
          }
        );
        
  
      } else {
        // Handle form validation errors if needed
      }
    }
    /*
    this.isLoading = true;
    console.log('data entrer', demandeData);
    this.demandeService.saveDemande(demandeData).subscribe(
      (response) => {
        console.log('Demande enregistrée avec succès:', response);
        this.isLoading = false;
        this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la demande:', error);
        this.isLoading = false;
      }
    );
  } else {
    console.log('Le formulaire est invalide. Assurez-vous que tous les champs sont remplis correctement.');
    this.form.markAllAsTouched();
  }
}*/
clearForm(): void {
  this.form.reset(); // This will reset all form controls to their initial state
}
}
