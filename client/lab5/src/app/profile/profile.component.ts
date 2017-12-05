import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  collections: any[];
  user_id: String;
  
  constructor(
    private dataService: DataService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.dataService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.user_id = profile.user._id;
    },
    err => {
      console.log(err);
      return false;
    })
    this.dataService.getCollectionsForUser(this.user_id).subscribe(
        (data:any) => this.collections = data);
    
  }

}
