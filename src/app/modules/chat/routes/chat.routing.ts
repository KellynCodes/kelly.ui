import { Routes } from "@angular/router";
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChatComponent } from "../chat/chat.component";
import { authGuard } from "../../../guard/auth/auth.guard";

export const chatRoutes: Routes =
[
    {
     path: "",
    children: [
    { path: "", component: ChatComponent, title: "Chat", canActivate: [authGuard]},
    { path: "messages", component: ChatWindowComponent, title: "Messages" , canActivate: [authGuard]},
      ]
    }
];
