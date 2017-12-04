import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    
    constructor() {
    }
    
    
    validateRegister(user){
        if(user.firstname == undefined || user.lastname == undefined || user.username == undefined || user.password == undefined){
            return false
        } else {
            return true;
        }
    }
    
    validateEmail(username){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(username);
    }
}
