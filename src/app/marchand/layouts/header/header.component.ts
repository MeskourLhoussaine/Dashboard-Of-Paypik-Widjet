import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Images } from 'src/assets/data/images';
import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  implements OnInit{
  public userOne: string = Images.users.userOne;
  isOpen: boolean = false;
  /*transaction*/
  merchantId!: number;
  merchants: Merchant[] = [];


  constructor( private route: ActivatedRoute,private merchantService: MerchantService, private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchantId = +params['id'];
      this. retrieveMerchantById();
    
    });
  }


  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };


  retrieveMerchantById(): void {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (data: Merchant) => {
        console.log('Merchant data:', data);
        this.merchants.push(data);
      },
      error: (error) => console.error(error),
    });
  }
  
}
