import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisResponse } from './apisResponse_model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingController } from '@ionic/angular';  
import { AlertController } from '@ionic/angular';
import { UserModel } from './Models/userProfileModel';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://codelogue.org/apis"

userData: UserModel;

  apiResponse:ApisResponse ;
  
  userrEmail: string;

  authState = new BehaviorSubject(false);


  constructor(public httpClient: HttpClient, 
    private router: Router, 
    public loadingCtrl: LoadingController,  
    public alertController: AlertController,
    private storage: Storage) {
  }


  async presentUserExisitAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'User exsist',
      message: 'A user with this email already exsists!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentCodeAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Verification Code',
      message: 'verification code in incorrect',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit(){}


  checkAuth(){

    this.storage.get('login').then((val) => {
      console.log('Your json is', val);
      if (val == true)
    {
      
      this.authState.next(true);

      this.router.navigate(['/dash']);
    }
    else {
      this.authState.next(false);
      this.router.navigate(['/login']);
    
    }

  });


  }

  sendPostRequest(data) {
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
  //const requestOptions = new RequestOptions({ headers: headers });

    let postData = new FormData();

    postData.append("email", data.email);
    postData.append("password", data.password);

    this.loadingCtrl.create({  
          message: 'Loading.....'   
          }).then((loading) => {  
           loading.present();{
        this.httpClient.post(this.baseUrl + "/login.php", postData)
        .subscribe((data: any) => {
           console.log(data);

           if (data.success != null){
            this.apiResponse = JSON.parse(data);
           }else {
            this.userData  = data;

           }
         
          // console.log(data['_body']);
          // console.log( this.apiResponse.success);

          if(this.apiResponse != null) {
            if (this.apiResponse.success == "true")
            {
              loading.dismiss();  
              this.authState.next(true);
    
              this.router.navigate(['/dash']);
    
            }else{
              loading.dismiss();  
              this.authState.next(false);
              this.storage.set('login', false);
            }
          }else {

          
            loading.dismiss();  
            this.authState.next(true);

            this.storage.set('login', true);
             this.storage.set('userData', this.userData);
  
            this.router.navigate(['/dash']);
            console.log("User Data");
            console.log( this.userData);
          }
         
         }, error => {
          console.log(error);
          loading.dismiss();  
        });
  

          } 
  
          
          });  

    // this.httpClient.post(this.baseUrl, postData)
    //   .subscribe((data: any) => {
    //      console.log(data);
    //     this.apiResponse = JSON.parse(data);;
    //     // console.log(data['_body']);
    //     console.log( this.apiResponse.success);
    //     if (this.apiResponse.success == "true")
    //     {
    //       this.authState.next(true);

    //       this.router.navigate(['ss/dash']);

    //     }else{
    //       this.authState.next(false);
    //     }
    //    }, error => {
    //     console.log(error);
    //   });

     
  }


  register(data ){


  
    
    this.loadingCtrl.create({  
          message: 'Loading.....'   
          }).then((loading) => {  
           loading.present();{
       
  this.checkUser(data);


        loading.dismiss();  

          } 
 
          });  

  }

  isAuthenticated() {
    return this.authState.value;
  }


  checkUser(userData){

    let postData = new FormData();

    postData.append("email", userData.email);
    
    this.httpClient.post(this.baseUrl + "/checkUser.php", postData)
    .subscribe((data: any) => {
      this.apiResponse = JSON.parse(data);

      console.log(data);
   
      if (this.apiResponse.success == "true")
      {

        this.presentUserExisitAlert();

      }else{

        this.registerUser(userData);

        
      }
     }, error => {
      console.log(error);
    });

    
  }

  registerUser(userData){

    this.userrEmail = userData.email;

    let postData = new FormData();

    postData.append("name", userData.name);
    postData.append("email", userData.email);
    postData.append("password", userData.password);

    this.httpClient.post(this.baseUrl + "/register.php", postData)
    .subscribe((data: any) => {
    
      console.log(data);
      this.apiResponse = JSON.parse(data);

      if (this.apiResponse.success == "true")
      {
    
        this.router.navigate(['verify-code']);

      }else{
      }
     }, error => {
      console.log(error);
    });


  }

  veridyUser(userData){

    let postData = new FormData();

    postData.append("code", userData.verifyCode);
    postData.append("email", this.userrEmail);

    


    this.loadingCtrl.create({  
          message: 'Loading.....'   
          }).then((loading) => {  
           loading.present();{
   

    this.httpClient.post(this.baseUrl + "/verifyOtp.php", postData)
    .subscribe((data: any) => {
    
      console.log(data);
      this.apiResponse = JSON.parse(data);

      if (this.apiResponse.success == "true")
          {
            loading.dismiss();  
            this.authState.next(true);
  
            this.router.navigate(['/dash']);
  
          }else{
            loading.dismiss();  
            // this.authState.next(false);




          }
     }, error => {
      console.log(error);
    });


     } 
 
    });  

  }
}
