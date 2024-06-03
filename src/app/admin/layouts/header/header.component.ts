
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Images } from 'src/assets/data/images';

import { MarchandService } from '../../services/marchand.service';
import { Merchant } from '../../model/merchant.model';
import { User } from '../../model/user.model';
import { AuthService } from 'src/app/public/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public userOne: string = Images.users.userOne;
  
  isOpen: boolean = false;
  Id!: number; // ID de l'utilisateur
  user: User | null = null; // Utilisateur authentifié

  justCreatedMarchands: Merchant[] = [];
  justCreatedMarchand: number = 0;

  constructor(
    private marchandService: MarchandService,
    private element: ElementRef, 
    private authService: AuthService, 
    private renderer: Renderer2) {}

  ngOnInit(): void {
     // Récupérer l'ID de l'utilisateur authentifié lors de l'initialisation du composant
     this.Id = this.authService.getAuthenticatedUserId();
     console.log("ID de l'utilisateur authentifié:", this.Id);
     if (this.Id !== 0) { // Vérifier si l'ID de l'utilisateur est valide
       this.retrieveUserById(); // Appel à la méthode pour récupérer les données de l'utilisateur
     } else {
       console.error('ID d\'utilisateur invalide:', this.Id);
     }
    this.getJustCreatedMarchands();
  }

  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };

  retrieveUserById(): void {
    // Appel au service pour récupérer les données de l'utilisateur en utilisant son ID
    this.authService.getUserById(this.Id).subscribe({
      next: (data: User) => {
        console.log('Données de l\'utilisateur:', data);
        this.user = data;
      },
      error: (error) => console.error('Erreur lors de la récupération de l\'utilisateur:', error),
    });
  }


  getJustCreatedMarchands() {
    this.marchandService.getMarchands().subscribe(
      (data) => {
        this.justCreatedMarchands = data.filter(marchand => marchand.marchandStatus === 'JustCreated');
        this.justCreatedMarchand = this.justCreatedMarchands.length;
      },
      (error) => {
        console.error('Error fetching unverified demandes:', error);
      }
    );
  }
}