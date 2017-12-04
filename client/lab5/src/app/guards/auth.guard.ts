import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from '../data.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private dataService:DataService, private router:Router){
        
    }
    
    canActivate(){
        if(this.dataService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}