import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router, 
    private dataService: DataService,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }
  
  onLogoutClick(){
    this.dataService.logout();
    this.flashMessage.show('You are logged out.', {
    classes: ['alert', 'alert-success'], 
    timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
