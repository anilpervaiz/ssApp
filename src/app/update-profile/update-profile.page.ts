import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Models/userProfileModel';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  userData: UserModel;

  constructor() { }

  ngOnInit() {
  }

  updateProfile(form) {
    
  }

}
