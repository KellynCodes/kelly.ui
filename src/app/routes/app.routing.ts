import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { NotfoundComponent } from "../components/notfound/notfound.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from "../pages/home/home.component";
import { ChatComponent } from "../components/chat/chat.component";
import { ChatWindowComponent } from "../pages/chat-window/chat-window.component";
import { AboutComponent } from "../pages/about/about.component";
import { PortfolioComponent } from "../pages/portfolio/portfolio.component";
import { ResumeComponent } from "../pages/resume/resume.component";
import { ContactComponent } from "../pages/contact/contact.component";
import { ServicesComponent } from "../pages/services/services.component";
import { PortfolioDetailComponent } from "../components/portfolio-detail/portfolio-detail.component";
import { navigationGuard } from "../guard/navigation/navigation.guard";
import { authGuard } from "../guard/auth/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "messages", component: ChatWindowComponent, title: "Messages" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "about", component: AboutComponent, title: "About" },
  { path: "resume", component: ResumeComponent, title: "Resume" },
  { path: "portfolio", component: PortfolioComponent, title: "Portfolio" },
  { path: "contact", component: ContactComponent, title: "Contact" },
  { path: "services", component: ServicesComponent, title: "Services" },
  { path: "portfolio-detail", component: PortfolioDetailComponent, title: "Portfolio-detail" },
  { path: "login", component: LoginComponent, title: "Login", canActivate: [navigationGuard]},
  { path: "signup", component: SignupComponent, title: "SignUp", canActivate: [navigationGuard] },
  { path: "chat", component: ChatComponent, title: "Chat", canActivate: [authGuard]},
  { path: "not-found", component: NotfoundComponent, title: "Page Not Found" },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
]
