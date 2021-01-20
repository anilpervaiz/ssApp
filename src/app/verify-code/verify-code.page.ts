import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

  verifyCode(form) {
    this.authService.veridyUser(form.value);
  }
}
