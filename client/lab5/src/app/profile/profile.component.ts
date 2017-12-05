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
  
  constructor(
    private dataService: DataService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.dataService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    })
    const user_id = localStorage.getItem('user_id').substr(1).slice(0, -1)
    console.log(user_id);
    this.dataService.getCollectionsForUser(user_id).subscribe(
        (data:any) => this.collections = data);
        
    console.log(this.collections);
  }

}
