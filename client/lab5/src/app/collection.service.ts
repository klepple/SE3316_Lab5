import { Injectable } from '@angular/core';

@Injectable()
export class CollectionService {

  constructor() { }
  
  validateCreate(collection){
        if(collection.name == undefined || collection.description == undefined){
            return false
        } else {
            return true;
        }
    }

}
