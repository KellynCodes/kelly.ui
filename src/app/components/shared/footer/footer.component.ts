import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app/app.state';

@Component({
  selector: 'kelly-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private store: Store<AppState>) { }

}
