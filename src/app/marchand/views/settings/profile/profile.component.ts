import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordRequest } from 'src/app/marchand/models/change-password-request';
import { UserService } from 'src/app/marchand/services/user.service';
import { AuthService } from 'src/app/public/auth/auth.service';

import { pageTransition } from 'src/app/shared/utils/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [pageTransition]
})
export class ProfileComponent implements OnInit {
  updatePasswordForm: FormGroup;
  message: string = '';
  userId:any ;

  constructor(private fb: FormBuilder, private userService: UserService, private authService:AuthService) {
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    this.userId = this.authService.getAuthenticatedUserId();
    console.log("userId ",this.userId);
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.updatePasswordForm.invalid) {
      return;
    }

    const changePasswordRequest: ChangePasswordRequest = {
      oldPassword: this.updatePasswordForm.get('oldPassword')?.value,
      newPassword: this.updatePasswordForm.get('newPassword')?.value
    };

    //const userId = 1; // Remplacez par l'ID utilisateur réel


    this.userService.updatePassword(this.userId, changePasswordRequest).subscribe(
      (response: any) => {
        this.message = response.message;
      },
      (error: any) => {
        this.message = 'Erreur lors de la mise à jour du mot de passe';
      }
    );
  }
}
