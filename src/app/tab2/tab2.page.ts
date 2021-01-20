import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Models/userProfileModel';
import { UserDataServiceService } from '../services/user-data-service.service';
import { LoadingController } from '@ionic/angular';  
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  userData: UserModel;


  constructor(private userService: UserDataServiceService, public loadingCtrl: LoadingController, private storage: Storage, private router: Router) {}


  ngOnInit() {


    this.loadUserProfile()
    
  //   this.userData = this.userService.getUserPofile();

  //   if (this.userData.email != null){

  //     loading.dismiss();  
  //   }
  //   else {
  //     loading.dismiss();  
  //   }

  //    } 
 
   
   
  }

  loadUserProfile(){


        this.loadingCtrl.create({  
          message: 'Loading.....'   
          }).then((loading) => {  
           loading.present();{
          } 
         
    
 

  this.storage.get('userData').then((val) => {
    console.log('Your Yuser data is', val);

    if (val != null){
     this.userData = val;
     console.log(this.userData.name);
    
     loading.dismiss();  
    }

    
   


});
           
          
          });  

  }


  btnUpdateProfile(){
    this.router.navigateByUrl("/update-profile" );
  }

  btnChangePassword(){
    this.router.navigateByUrl("/change-password"  );
  }

}
