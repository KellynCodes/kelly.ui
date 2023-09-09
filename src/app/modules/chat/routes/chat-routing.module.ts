import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { chatRoutes } from './chat.routing';


@NgModule({
  imports: [RouterModule.forChild(chatRoutes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
