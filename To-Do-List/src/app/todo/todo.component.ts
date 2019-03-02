import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  todoArray: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getList().snapshotChanges().subscribe(task => {
      this.todoArray = [];
      task.forEach(task => {
        var todo = task.payload.toJSON();
        todo["$key"] = task.key;
        this.todoArray.push(todo);
      })
      //Sort the array
      this.todoArray.sort((first, second) =>{
        return first.completed - second.completed;
      })
      //Sort the array
    });
  }

  addTask(task){
    this.todoService.addTodo(task.value);
    task.value = null;
  }

  deleteTask($key: string){
    this.todoService.deleteTodo($key);
  }

  checkTask($key: string, completed){
    this.todoService.checkTodo($key, !completed);
  }

}
