import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarchandService } from '../../services/marchand.service';
import { Merchant } from '../../model/merchant.model';

@Component({
  selector: 'app-editmarchandform',
  templateUrl: './editmarchandform.component.html',
  styleUrl: './editmarchandform.component.css'
})
export class EditmarchandformComponent implements OnInit{

  merchantId!: string;

  constructor(
    private route: ActivatedRoute,
    private marchandService: MarchandService

  ) { }

  ngOnInit(): void {
    this.fetchMarchands();
    this.route.params.subscribe(params => {
      this.merchantId = params['marchanId'];
      // Now you have the marchanId value, you can use it as needed
    });

  }
  get getmarchandId() {
    return this.merchantId;
  }

  marchands: Merchant[] = [];
  marchand: Merchant | undefined;

  fetchMarchands() {
    this.marchandService.getMarchands().subscribe(
      (data: Merchant[]) => {
        this.marchands = data;
        const Id = this.merchantId; 

        this.marchand = this.marchands.find(marchand => marchand.merchantId === Number(Id));
        if (!this.marchand) {
          console.error('Marchand not found with id:', Id);
        }
      },
      (error) => {
        console.error('Error fetching marchands:', error);
      }
    );
  }

}