import { Component, OnInit } from '@angular/core';
// Import the DataService
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicpage',
  templateUrl: './publicpage.component.html',
  styleUrls: ['./publicpage.component.css']
})
export class PublicpageComponent implements OnInit {
  
  // Define a users property to hold our user data
  photos: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(
    private dataService: DataService,
    private router:Router
    ) {

    // Access the Data Service's getImages() method we defined
    this.dataService.getImages()
        .subscribe(res => this.photos = res);
  }

  ngOnInit() {
  }
  
  redirect(){
    this.router.navigate(['login']);
  }

}
