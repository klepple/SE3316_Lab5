import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  username: String;
  password: String;
  
  constructor(
    private router:Router, 
    private dataService: DataService,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.dataService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.dataService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in.', {
          classes: ['alert', 'alert-success'], 
          timeout: 5000});
          this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          classes: ['alert', 'alert-warning'], 
          timeout: 5000});
          this.router.navigate(['login']);
      }
    });
  }
}
