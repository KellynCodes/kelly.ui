import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDto } from '../../data/Dto/contact/contactDto';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { TimeOut } from '../../services/utils/timeout.util';
import * as contactActions from './state/contact.action';
import * as contactSelectors from './state/contact.selector';
import * as sharedSelector from "../../state/shared/shared.selector";
import * as sharedAction from "../../state/shared/shared.action";

@Component({
  selector: 'kelly-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup
  errorMessage!: string | null;
  IsLoading$ = this.store.select(sharedSelector.getLoading);
  errorMessage$ = this.store.select(sharedSelector.getErrorMessage);
  successMessage$ = this.store.select(contactSelectors.selectContactResponseMessage);

  constructor(
    private store: Store<AppState>,
    private timeoutUtil: TimeOut
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      message: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]),
    })
  }


  contactMe(): void {
    if (!this.contactForm.valid) {
      this.errorMessage = "Fill all the field.";
      this.timeoutUtil.setTimeOut(3000, this.errorMessage);
      return;
    }
    const model: ContactDto = this.contactForm.value;
    this.store.dispatch(sharedAction.setLoadingSpinner({ IsLoading: true }));
    this.store.dispatch(contactActions.ContactRequest(model));
  }

}
