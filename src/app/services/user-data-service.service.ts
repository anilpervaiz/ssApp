import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransectionsModel } from '../Models/transectionsModel';
import { UserModel } from '../Models/userProfileModel';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  getAllTransection: TransectionsModel[] = [];

  baseUrl = "https://codelogue.org/apis"

   postData = new FormData();

   userId: string;


   userModel: UserModel;

   

  constructor(private http: HttpClient) { 
  
    this.postData.append("userId", this.userId );
  }

getTransections(){
  
  this.http.post(this.baseUrl + "/getTransections.php", this.postData)
  .subscribe((data: any) => {
    
    this.getAllTransection = data;

    console.log(this.getAllTransection[0].userId)
   }, error => {
    console.log(error);
  });
if (this.getAllTransection.length > 0 ){
  return this.getAllTransection;
}

}


getUserPofile(){

  let postData = new FormData();

  postData.append("userId", "99657828");


  this.http.post(this.baseUrl + "/getUserProfile.php", postData)
  .subscribe((data: any) => {
  
    console.log(data);
    this.userModel = JSON.parse(data);

   
   }, error => {
    console.log(error);
  });

  return this.userModel
}



}
