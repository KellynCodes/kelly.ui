import { Routes } from "@angular/router";
import { SignupComponent } from "../signup/signup.component";
import { LoginComponent } from "../login/login.component";
import { navigationGuard } from "../../../guard/navigation/navigation.guard";

export const authRoutes: Routes =
  [
    {
      path: "",
      children: [
    { path: "login", component: LoginComponent, title: "Login", canActivate: [navigationGuard] },
    { path: "signup", component: SignupComponent, title: "SignUp", canActivate: [navigationGuard] },
     ]
    }
];
