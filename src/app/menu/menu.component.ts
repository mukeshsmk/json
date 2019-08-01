import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu : string [];
  
  constructor(private httpService: HttpClient) { }

  ngOnInit() { 
    this.httpService.get('http://localhost:3000/catagory').subscribe(
      data => {
       let res = data[0][1];    
       this.menu = data[0];
       var datas = JSON.stringify(this.menu)
      //  console.log("data",datas);
     
      var groups = JSON.parse(datas).reduce(function(obj,item){
          obj[item.parent_category.id] = obj[item.parent_category.id] || [];
          obj[item.parent_category.id].push(item);
          return obj;
        }, {});
        console.log("groups",groups)
      var myArray = Object.keys(groups).map(function(key,item){
          return {id: key,value: groups[key]};
      });
      // console.log("myArray",myArray)
      // var menu = JSON.stringify(myArray)
      // var mens = JSON.stringify(myArray[0])
      // var womens = JSON.stringify(myArray[1])
      // console.log("men",mens)
      // console.log("wommen",womens);
      // console.log('menu',menu)
      },
      (err: HttpErrorResponse) => {
       console.log (err.message);
      }
    );
    }
}



