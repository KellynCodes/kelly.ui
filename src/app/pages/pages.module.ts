import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { ResumeComponent } from './resume/resume.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { BlogsComponent } from './blog/blogs/blogs.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ResumeComponent,
    ContactComponent,
    ServicesComponent,
    BlogsComponent,
    BlogDetailComponent,
    NewBlogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    MdbCarouselModule,
  ],
  exports:[HomeComponent]
})
export class PagesModule { }
