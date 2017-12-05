import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: String;
  description: String;
  visibility: Boolean;
  
  constructor(
    private validate:CollectionService, 
    private flashMessage:FlashMessagesService,
    private dataService:DataService,
    private router:Router
    ) { }

  ngOnInit() {
  }
  
  onCreateSubmit(){
    const user_id = localStorage.getItem('user_id').substr(1).slice(0, -1);
    const collection = {
      name: this.name,
      description: this.description,
      visibility: this.visibility,
      userId: user_id
    }
    console.log(this.visibility);
    console.log(this.name);
    
    //Required Fields
    if(!this.validate.validateCreate(collection)) {
      this.flashMessage.show("Please fill in all fields", {
        classes: ['alert', 'alert-warning'], 
        timeout: 3000
      });
      return false;
    }
    
    // Create Collection
    this.dataService.createCollection(collection).subscribe(data => {
      if(data.success){
        this.flashMessage.show("Collection successfully created!", {classes: ['alert', 'alert-success'], timeout: 3000});
        this.router.navigate(['/profile']); //Navigate to profile to see created collection
      } else {
        this.flashMessage.show("Something went wrong.", {classes: ['alert', 'alert-warning'], timeout: 3000});
      }
    });
  }

}
