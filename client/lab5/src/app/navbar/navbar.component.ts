import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  goHome(e){
    e.preventDefault();
  	this.router.navigate(['']);
  }
  
  signIn(e){
    e.preventDefault();
  	this.router.navigate(['login']);
  }
  signUp(e) {
    e.preventDefault();
    this.router.navigate(['signup']);
  }
  
  seePolicy(e){
    e.preventDefault();
  	this.router.navigate(['privacy']);
  }
}
