import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Merchant } from '../../../../model/merchant.model';
import { Role } from '../../../../model/role.model';
import { MarchandService } from '../../../../services/marchand.service';
import { UserService } from 'src/app/admin/services/user.service';
import { User } from 'src/app/admin/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
})
export class UsertableComponent implements OnInit {
  @ViewChild('statusInput') statusInputRef!: ElementRef;
  id!: number;
  thisUser!: User;
  userId: number | null = null;

  marchands: Merchant[] = [];
  users: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  rejectOpen: boolean = false;
  marchandId!: number;
  selectedOption1: string = '';
  editModalOpen: boolean = false;
  editFormData: User = this.initializeUser();
  roles: Role[] = [
    { id: 1, name: 'ROLE_COMERCIAL'},
    { id: 2, name: 'ROLE_ADMIN'},
    { id: 3, name: 'ROLE_MARCHAND'},
  ];
  addModalOpen: boolean = false;
  addFormData: User = this.initializeUser();

  constructor(
    private route: ActivatedRoute,
    private marchandService: MarchandService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchMarchands();
    this.fetchUsers();
  }

  initializeUser(): User {
    return {
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      profilLogoUrl: '',
      password: '',
      status: 'Inactive',
      roles: [],
    };
  }

  fetchMarchands() {
    this.marchandService.getMarchands().subscribe(
      (data: Merchant[]) => {
        this.marchands = data;
      },
      (error) => {
        console.error('Error fetching marchands:', error);
      }
    );
  }

  fetchUsers() {
    this.userService.getUseres().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  get filteredUsers() {
    let filteredData = this.users.filter((user) => {
      const searchTerm = this.searchTerm.toLowerCase();
      const username = user.username.toLowerCase();
      return username.includes(searchTerm);
    });

    if (this.selectedOption1 !== '') {
      filteredData = filteredData.filter((user) => user.status === this.selectedOption1);
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.itemsPerPage = this.selectedItemsPerPage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.itemsPerPage = this.selectedItemsPerPage();
    }
  }

  onItemsPerPageChange(selectedValue: number) {
    this.itemsPerPage = selectedValue;
    this.currentPage = 1;
  }

  selectedItemsPerPage() {
    const selectElement = document.getElementById('states') as HTMLSelectElement;
    const selectedValue = selectElement ? selectElement.value : '';
    return selectedValue ? parseInt(selectedValue, 10) : this.itemsPerPage;
  }

  handleChange1(event: any) {
    this.selectedOption1 = event.target.value;
  }

  deleteMarchand(marchandId: number) {
    // Logique de suppression du marchand
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedOption1 = '';
    if (this.statusInputRef) {
      (this.statusInputRef.nativeElement as HTMLSelectElement).value = '';
    }
  }

  get user() {
    return this.thisUser || {};
  }

  toggleEdit(user: User) {
    this.editModalOpen = !this.editModalOpen;
    if (this.editModalOpen) {
      this.editFormData = { ...user, roles: user.roles ? [...user.roles] : [] };
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.updateUser(this.editFormData).subscribe(() => {
        this.fetchUsers();
        this.editModalOpen = false;
      });
    }
  }

  isRoleChecked(role: Role): boolean {
    return this.editFormData.roles?.some((r) => r.id === role.id) || false;
  }

  onRoleChange(event: any, role: Role) {
    if (!this.editFormData.roles) {
      this.editFormData.roles = [];
    }
    if (event.target.checked) {
      this.editFormData.roles.push(role);
    } else {
      this.editFormData.roles = this.editFormData.roles.filter((r) => r.id !== role.id);
    }
  }

  swipeMarchand(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.status = user.status === 'Active' ? 'Inactive' : 'Active';
      this.userService.updateUser(user).subscribe(
        () => {
          console.log('User status updated successfully.');
        },
        (error) => {
          console.error('Error updating user status:', error);
        }
      );
    }
  }

  openModal(id: number): void {
    this.userId = id;
    this.rejectOpen = true;
  }

  toggleReject(): void {
    this.rejectOpen = !this.rejectOpen;
    if (!this.rejectOpen) {
      this.userId = null;
    }
  }

  confirmDelete(): void {
    if (this.userId !== null) {
      this.userService.deleteUser(this.userId)
        .pipe(catchError((error) => {
          console.error('Delete failed', error);
          return of(null);
        }))
        .subscribe((response) => {
          console.log('User deleted successfully');
          this.toggleReject();
          this.fetchUsers();
        });
    }
  }

  

  hasAllRoles(userId: number): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (!user || !user.roles) return false;

    const roleNames = user.roles.map((role) => role.name);
    return roleNames.includes('ROLE_ADMIN') &&
           roleNames.includes('ROLE_MARCHAND') &&
           roleNames.includes('ROLE_COMERCIAL');
  }

  getSelectedRoles(): string[] {
    console.log("les roles",this.roles);
    return this.roles.filter(role => role.checked).map(role => role.name);
  }
  
  
  toggleAddModal() {
    this.addModalOpen = !this.addModalOpen;
    if (!this.addModalOpen)
      {
        this.addFormData = this.initializeUser(); // Réinitialiser le formulaire d'ajout lorsque le modal est fermé
        }
        }
        
        // Fonction pour soumettre le formulaire d'ajout
        onAddSubmit(form: NgForm) {
          if (form.valid) {
            const generatedPassword = this.generatePassword(8);

            // Ajouter le mot de passe généré aux données avant de les soumettre
            this.addFormData.password = generatedPassword;
            console.log(" avant this.addFormData",this.addFormData);
            // Supprimer tous les rôles existants de addFormData.roles
            this.addFormData.roles = [];
            
            // Ajouter les rôles sélectionnés à addFormData.roles
            this.addFormData.roles.push(...this.getSelectedRoles());
        console.log("this.addFormData",this.addFormData);
            // Ajouter l'utilisateur avec les rôles sélectionnés
            this.userService.addUser(this.addFormData).subscribe(() => {
              this.fetchUsers(); // Rafraîchir la liste des utilisateurs après l'ajout
              this.toggleAddModal(); // Fermer le modal d'ajout après l'ajout réussi
            });
          }
        }


        generatePassword(length: number): string {
          const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Caractères possibles pour le mot de passe
          let password = "";
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
          }
          return password;
        }
        
        }



