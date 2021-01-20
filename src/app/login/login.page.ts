import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import  { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';  


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginReturn: Boolean;

  constructor(private  authService:  AuthService, private  router:  Router, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }


  login(form){
    this.authService.sendPostRequest(form.value);
//     this.loadingCtrl.create({  
//           message: 'Loading.....'   
//           }).then((loading) => {  
//            loading.present();{
//           } 
//          
//       if(this.loginReturn == true)
// {
//     loading.dismiss();  
// }
// else {
//   loading.dismiss();  
// }
//            
//           
//           });  
  }
}
