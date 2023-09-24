import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';
import { selectMobile } from '../../../state/shared/shared.selector';
import { setIsMobile } from '../../../state/shared/shared.action';
import { JwtService } from '../../../services/utils/jwt.service';

@Component({
  selector: 'kelly-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  IsToggled: boolean = false;
  IsMobile$ = this.store.select(selectMobile);

  constructor(
    private store: Store<AppState>,
    private jwtService: JwtService
  ) { }
  get toggleNav(): boolean {
    return this.IsToggled = !this.IsToggled;
  }

  ngOnInit(): void {
    this.jwtService.CheckUser;
    this.handleWindowResize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.handleWindowResize();
  }

  handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.store.dispatch(setIsMobile({ IsMobile: true }));
    } else {
      this.store.dispatch(setIsMobile({ IsMobile: false }));
    }
  }
}
