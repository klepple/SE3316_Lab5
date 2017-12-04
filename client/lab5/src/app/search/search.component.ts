import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: String;
  photos: any[];
  
  constructor(
    private router:Router, 
    private dataService: DataService,
    private flashMessage: FlashMessagesService
    ) { }
  

  ngOnInit() {
  }
  
  onSearchSubmit(){
    this.dataService.getImages(this.query).subscribe(
        (data:any) => this.photos = data.collection.items
    );
  }
  
}
