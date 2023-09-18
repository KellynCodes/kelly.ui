import { Routes } from "@angular/router";
import { NotfoundComponent } from "../components/notfound/notfound.component";
import { HomeComponent } from "../pages/home/home.component";
import { AboutComponent } from "../pages/about/about.component";
import { PortfolioComponent } from "../pages/portfolio/portfolio.component";
import { ResumeComponent } from "../pages/resume/resume.component";
import { ContactComponent } from "../pages/contact/contact.component";
import { ServicesComponent } from "../pages/services/services.component";
import { PortfolioDetailComponent } from "../components/portfolio-detail/portfolio-detail.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "about", component: AboutComponent, title: "About" },
  { path: "resume", component: ResumeComponent, title: "Resume" },
  { path: "portfolio", component: PortfolioComponent, title: "Portfolio" },
  { path: "contact", component: ContactComponent, title: "Contact" },
  { path: "services", component: ServicesComponent, title: "Services" },
  { path: "portfolio-detail", component: PortfolioDetailComponent, title: "Portfolio-detail" },
  {
    path: "auth",
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "chat",
    loadChildren: () => import('../modules/chat/chat.module').then(m => m.ChatModule)
  },
  { path: "not-found", component: NotfoundComponent, title: "Page Not Found" },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
]
