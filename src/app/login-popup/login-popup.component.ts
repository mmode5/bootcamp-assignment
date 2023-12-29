import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { redberryEmailValidator } from '../models/email.validator';
import { CategoriesService } from '../services/categories.service';
import { FormDataService } from '../services/form-data.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  isTyping: boolean = false;
  @Input() isVisible: boolean = false;
  @Output() closePopup = new EventEmitter<void>();

  close(): void {
    this.closePopup.emit();
  }
  form: FormGroup | undefined;
  constructor(
    private fb: FormBuilder,
    private api: CategoriesService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, redberryEmailValidator]],
    });
  }
  onInput() {
    this.isTyping = true;
  }

  onBlur() {
    this.isTyping = false;
  }

  onSubmit() {
    const formData = new FormData();
    if (this.form?.valid) {
      formData.append('email', this.form?.value['email']);
      this.loginService.logIn(formData).subscribe((X) => console.log(X));
      //getRequest
      // if(!response.errors){
      //    redirect
      // }else {
      // ელ-ფოსტა არ მოიძებნა
      // }
    }
  }
}
