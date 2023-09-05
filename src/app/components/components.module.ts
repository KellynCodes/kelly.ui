import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    PortfolioDetailComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [NavbarComponent, FooterComponent, LoaderComponent]
})
export class ComponentsModule { }
