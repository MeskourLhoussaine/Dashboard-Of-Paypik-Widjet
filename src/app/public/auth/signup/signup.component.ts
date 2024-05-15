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
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['',Validators.required],
      juridique: ['',Validators.required],
      c_capital: ['',Validators.required],
      c_address: ['',Validators.required],
      c_dg: ['',Validators.required],
      c_field: ['',Validators.required],
      c_web: ['',Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@gmail\\.com')]],
      phone: ['',Validators.required],
      c_fieldyears: ['',Validators.required],
      c_products: ['',Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('\\+?\\d[\\d\\+\\s()-]*')]]
    });
  }
  handleChange(event: any) {
    this.selectedOption = event.target.value;
  }
  submitMarchandForm(): void {
    if (this.form.valid) {
      const demandeData: Demandedto = {
        demandeId: 0, 
        demandeMarchandName: this.form.get('username')?.value,
        demandeMarchandDescription: this.form.get('c_products')?.value,
        demandeMarchandPhone: this.form.get('phone')?.value,
        demandeMarchandHost: this.form.get('c_web')?.value,
        demandeMarchandEmail: this.form.get('email')?.value,
        demandeMarchandLogoUrl: '',
        demandeMarchandStatus: Status.JustCreated,
        demandeMarchandTypeActivite: this.form.get('c_field')?.value,
        demandeMarchandRcIf: this.form.get('c_capital')?.value,
        demandeMarchandSiegeAddresse: this.form.get('c_address')?.value,
        demandeMarchandDgName: this.form.get('c_dg')?.value,
        demandeMarchandFormejuridique: this.form.get('juridique')?.value,
        demandeMarchandAnneeActivite: this.form.get('c_fieldyears')?.value,
        demandeIsAccepted: false,
        demandeIsVerified: false
      };
      this.isLoading = true;
      this.demandeService.saveDemande(demandeData).subscribe(
        (saveDemande: any) => {
          console.log('Demande enregistrée avec succès:', saveDemande);
          this.isLoading = false;
          this.form.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de la demande:', error);
          this.isLoading = false;
        }
      );
    } else {
      alert('Veuillez remplir correctement tous les champs.');
      this.form.markAllAsTouched();
    }
  }

  clearForm(): void {
    this.form.reset();
  }
}
