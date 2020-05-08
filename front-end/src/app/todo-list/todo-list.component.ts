import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  list=[]
  constructor(private http: HttpServiceService
  ) { }

  ngOnInit() {
    this.getToDoList()
  }

  getToDoList(){
    let currentUser = JSON.parse(localStorage.getItem("user"));
    this.http.get('todo/view?id='+currentUser.id).subscribe((result)=>{
      this.list = result['data']
    },(err)=>{

    })
  }

}
