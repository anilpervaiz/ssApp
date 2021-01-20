import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransectionsModel } from '../Models/transectionsModel';
import { UserDataServiceService } from '../services/user-data-service.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  getAllTransection: TransectionsModel[] = [];

  baseUrl = "https://codelogue.org/apis";

  userID: string;

  title = 'app';
  elementType = 'url';
  value = 'https://google.com';

  constructor(private userDataService: UserDataServiceService, private http: HttpClient, private storage: Storage) {}


  ngOnInit() {

    // this.getAllTransection = this.userDataService.getTransections();

    this.getTransections()

   

  }

  createCode() {

  }


  getTransections(){




    this.storage.get('userData').then((val) => {
      console.log('Your Yuser data is', val);

      if (val != null){
       this.userID = val["uniqueId"]
      }
      let postData = new FormData();
      postData.append("userId", this.userID );
    
        this.http.post(this.baseUrl + "/getTransections.php", postData)
        .subscribe((data: any) => {
          
          this.getAllTransection = data;
      
          // console.log(this.getAllTransection[0].userId);
         }, error => {
          console.log(error);
        });

  
  });

 
  
  }

}
