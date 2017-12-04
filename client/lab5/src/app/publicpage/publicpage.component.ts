import { Component, OnInit } from '@angular/core';
// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-publicpage',
  templateUrl: './publicpage.component.html',
  styleUrls: ['./publicpage.component.css']
})
export class PublicpageComponent implements OnInit {
  
  // Define a users property to hold our user data
  photos: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getImages() method we defined
    this._dataService.getImages()
        .subscribe(res => this.photos = res);
  }

  ngOnInit() {
  }

}
