import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getList(){
    this.todoList = this.firebasedb.list('todoTitles');
    return this.todoList;
  }

  addTodo(todoTitle: string){
    this.todoList.push({
      todoTitle: todoTitle,
      completed: false
    });
    document.getElementById("addButton").setAttribute("disabled", "disabled");
  }

  deleteTodo($key: string){
    this.todoList.remove($key);
  }

  checkTodo($key: string, flag: boolean){
    this.todoList.update($key, {completed: flag});
  }


}
