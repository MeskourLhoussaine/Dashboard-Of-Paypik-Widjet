import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Merchant } from '../../../../model/merchant.model';
import { Role } from '../../../../model/role.model';
import { MarchandService } from '../../../../services/marchand.service';
import { UserService } from 'src/app/admin/services/user.service';
import { User } from 'src/app/admin/model/user.model';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  @ViewChild('statusInput') statusInputRef!: ElementRef;

  marchands: Merchant[] = [];
  users: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  rejectOpen: boolean = false;
  marchandId!: number;
  selectedOption1: string = '';
  editModalOpen: boolean = false;
  editFormData: User = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email:'',
    profilLogoUrl:'',
    roles: [],
    status: ''
  };
  roles: Role[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];

  constructor(private marchandService: MarchandService, private userService: UserService) { }

  ngOnInit() {
    this.fetchMarchands();
    this.fetchUsers();
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
    let filteredData = this.users.filter(user => {
      const searchTerm = this.searchTerm ? this.searchTerm.toLowerCase() : '';
      const username = user.username ? user.username.toLowerCase() : '';
      return username.includes(searchTerm);
    });

    if (this.selectedOption1 !== '') {
      filteredData = filteredData.filter(user =>
        user.status === this.selectedOption1
      );
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return filteredData.slice(startIndex, endIndex);
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
    const selectedValue = selectElement.value;
    if (selectedValue === null || selectedValue === '') {
      return this.itemsPerPage;
    } else {
      return parseInt(selectedValue);
    }
  }

  toggleReject(marchandId: number) {
    this.rejectOpen = !this.rejectOpen;
    this.marchandId = marchandId;
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
    (this.statusInputRef.nativeElement as HTMLSelectElement).value = '';
  }

  toggleEdit() {
    this.editModalOpen = !this.editModalOpen;
    if (this.editModalOpen) {
      // Initialiser les données du formulaire avec les données actuelles de l'utilisateur
      // Par exemple :
      // this.editFormData = { ...this.selectedUser }; // Assurez-vous que selectedUser est correctement défini
    }
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (updatedUser: User) => {
        // Logique à exécuter après la mise à jour de l'utilisateur
        console.log('Utilisateur mis à jour avec succès:', updatedUser);
        // Par exemple, vous pouvez actualiser la liste des utilisateurs
        this.fetchUsers();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', this.editFormData);
      // Utilisez la méthode updateUser pour mettre à jour l'utilisateur
      this.updateUser(this.editFormData);
      // Fermez le modal d'édition
      this.toggleEdit();
    }
  }
}
