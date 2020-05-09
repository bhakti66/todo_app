import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service'
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterModule, Routes  } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddTodoItemComponent } from "../add-todo-item/add-todo-item.component"
import { TodoServiceService } from "../services/todo-service.service"


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[];
  addTodoForm: FormGroup;
  isInEditMode:boolean = false
  updatedRow={
    title:"",
    description:"",
    status:""
  }
  currentUser

  constructor(private http: HttpServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private todoService: TodoServiceService
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.displayedColumns=[
      "id",
      "title",
      "description",
      "date",
      "status",
      "edit",
      "delete"
    ]
    this.todoService.getToDoList()
  }

  

  editRecord(row){
    this.updatedRow = row
    this.isInEditMode = true
  }

  deleteRecord(row){
    this.http.delete('todo?id='+row.id).subscribe((result)=>{
      this.todoService.getToDoList()
    })
  }

  addRecord(){
    this.dialog.open(AddTodoItemComponent, {
      data: {  }
    });
  }

  updateRecord(row){
    this.http.put('todo/modify',row).subscribe((result)=>{
      this.isInEditMode=false
    })
  }
}
