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
  collections: any;
  
  constructor(
    private dataService: DataService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.dataService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user._id);
      this.dataService.getCollectionsForUser(this.user._id).subscribe(collections => {
      this.collections = collections.name;
    })
    },
    err => {
      console.log(err);
      return false;
    })
    
  }

}
