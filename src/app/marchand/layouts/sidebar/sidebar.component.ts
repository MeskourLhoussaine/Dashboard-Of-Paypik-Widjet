import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/_core/services/common.service';
import { AppRoutes } from 'src/app/app.routes';
import { MarchandRoutes, SettingRoutes, SupportRoutes } from '../../marchand.routes';
import { TokenService } from 'src/app/public/auth/token.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarIsCollapsed: boolean = true;
  readonly appRoutes = AppRoutes;
  readonly marchandRoutes = MarchandRoutes;
  readonly settingRoutes = SettingRoutes;
  readonly supportRoutes = SupportRoutes;
  private routerSubscription: Subscription = new Subscription();

  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  constructor(
    public readonly commonServices: CommonService,
    private readonly elementRef: ElementRef,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.subMenuToggleHandlerOnRouteChange();
    setTimeout(() => { this.subMenuToggleHandlerOnPageReload(); }, 1);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  subMenuToggleHandler = (event: MouseEvent): void => {
    const elem = event.target as HTMLElement;
    const subMenu = elem.closest("a.sub-menu") as HTMLElement | null;

    if (subMenu) {
      const isExpanded = subMenu.getAttribute('aria-expanded') === 'true';
      subMenu.setAttribute('aria-expanded', (!isExpanded).toString());
    }
  }

  subMenuToggleHandlerOnPageReload = (): void => {
    const currentElem = this.elementRef.nativeElement.querySelector('[aria-current="page"]');
    const subMenuItem = currentElem?.closest('ul.sub-menu-item') as HTMLElement | null;
    const subMenu = subMenuItem?.previousElementSibling as HTMLElement | null;

    if (subMenu) {
      subMenu.setAttribute('aria-expanded', 'true');
    }
  }

  subMenuToggleHandlerOnRouteChange = (): void => {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const subMenus = this.elementRef.nativeElement.querySelectorAll(".sub-menu");
        const activeElem = this.elementRef.nativeElement.querySelector(`[href='${event.url}']`) as HTMLElement | null;

        if (!activeElem || activeElem.closest('ul.sub-menu-item')) return;

        subMenus.forEach((subMenu: HTMLElement) => {
          if (subMenu.getAttribute('aria-expanded') === 'true') {
            subMenu.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  // Method to handle logout
  onLogout(): void {
    this.tokenService.logOut();
  }
}
