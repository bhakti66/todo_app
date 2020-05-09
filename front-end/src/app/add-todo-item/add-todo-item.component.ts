import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterModule, Routes  } from "@angular/router";
import { HttpServiceService } from '../services/http-service.service'
import { TodoServiceService } from "../services/todo-service.service"

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.css']
})
export class AddTodoItemComponent implements OnInit {
  addTodoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http: HttpServiceService,
    private todoService: TodoServiceService) { }

  ngOnInit() {
    
    this.addTodoForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      status: ["", Validators.required],
      user_id:[0,Validators.required]
    });
  }

  saveRecord(){
    let currentUser = JSON.parse(localStorage.getItem("user"));
    this.addTodoForm.value['user_id'] = currentUser.id
    this.http.post('todo/add',this.addTodoForm.value).subscribe((result)=>{
      this.todoService.getToDoList()
    })
    
  }

}
