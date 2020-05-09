import { Injectable } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { HttpServiceService } from '../services/http-service.service'


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  todolist : MatTableDataSource<Object>;
  currentUser
  constructor(private http: HttpServiceService) { 
    this.todolist= new MatTableDataSource();

  }

  getToDoList(){
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.http.get('todo/view?id='+this.currentUser.id).subscribe((result)=>{
      this.todolist = result['data']
    },(err)=>{

    })
  }
}
