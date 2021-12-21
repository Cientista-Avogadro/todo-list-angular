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
    this.todos.push(new Todo(1, "ir ao super mercado", false));
    this.todos.push(new Todo(2, "Estudar angular", true));
    this.todos.push(new Todo(3, "ir para cama", false));
  }

  remover(todo: Todo) {
    const index = this.todos.indexOf(todo);
    index !== -1 && this.todos.splice(index, 1);
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }
  markAsUnDone(todo: Todo) {
    todo.done = false;
  }

  
}
