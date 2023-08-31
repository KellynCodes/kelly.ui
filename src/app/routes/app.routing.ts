import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { NotfoundComponent } from "../components/notfound/notfound.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from "../pages/home/home.component";
import { ChatComponent } from "../components/chat/chat.component";
import { ChatWindowComponent } from "../pages/chat-window/chat-window.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "messages", component: ChatWindowComponent, title: "Messages" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "signup", component: SignupComponent, title: "SignUp" },
  { path: "chat", component: ChatComponent, title: "Chat" },
  { path: "not-found", component: NotfoundComponent, title: "Page Not Found" },
  { path: "**", redirectTo: "not-found", pathMatch: "full" }
]
