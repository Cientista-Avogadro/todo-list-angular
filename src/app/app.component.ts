import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Todo } from "src/models/todo.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = "My Task List";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.loadTaskOnLocalStorage();
  }

  addTask() {
    const title = this.form.controls["title"].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.saveTaskOnLocalStorage();
    this.form.reset();
  }

  remover(todo: Todo) {
    const index = this.todos.indexOf(todo);
    index !== -1 && this.todos.splice(index, 1);
    this.saveTaskOnLocalStorage();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.saveTaskOnLocalStorage();
  }
  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.saveTaskOnLocalStorage();
  }

  saveTaskOnLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadTaskOnLocalStorage() {
    this.todos = JSON.parse(localStorage.getItem("todos"));
  }
}
