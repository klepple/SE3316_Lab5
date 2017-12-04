import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  firstname: String;
	lastname: String;
  username: String;
  password: String;
  
  
  constructor(
    private validate:UserService, 
    private flashMessage:FlashMessagesService,
    private dataService:DataService,
    private router:Router
    ) { }

  ngOnInit() {
  }
  
  onRegisterSubmit(){
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password
    }
    
    //Required Fields
    if(!this.validate.validateRegister(user)) {
      this.flashMessage.show("Please fill in all fields", {cssClass:'alert-warning', timeout: 3000});
      return false;
    }
    
    //Validate Email
    if(!this.validate.validateEmail(user.username)) {
      this.flashMessage.show("Please fill in a valid email address", {cssClass:'alert-warning', timeout: 3000});
      return false;
    }
    
    // Register User
    this.dataService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You are now registered and can login.", {cssClass:'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("Something went wrong.", {cssClass:'alert-success', timeout: 3000});
        this.router.navigate(['/signin']);
      }
    })
    
  }
}
