import { create } from "canvas-confetti";
import { v4 as uuidV4 } from "uuid";

const formTodo = document.querySelector(".todo-form") as Element;
const inputTodo = document.querySelector(
  ".todo-form_input"
) as HTMLInputElement;
const btnSubmit = document.querySelector(".btn.btn--submit") as Element;
const listTodo = document.querySelector(".todo-list") as Element;
console.log(listTodo.firstElementChild);

interface Todo {
  id: ReturnType<typeof uuidV4>;
  task: string;
}

type ArrayOfTodos = Todo[];

const STORAGE_ARRAY_KEY = "todos.array";
let todoArray: ArrayOfTodos = JSON.parse(
  localStorage.getItem(STORAGE_ARRAY_KEY) || "[]"
);

const createTodo = (taskName: string): Todo => ({
  id: uuidV4(),
  task: taskName,
});

const addTodo = (todo: Todo, arr = todoArray) => {
  arr.push(todo);
  localStorage.setItem(STORAGE_ARRAY_KEY, JSON.stringify(arr));
};

const appendTodo = (todo: Todo, container = listTodo) => {
  const todoItem = document.createElement("li");
  todoItem.dataset.id = todo.id;

  const todoDescription = document.createElement("p");
  todoDescription.textContent = todo.task;
  todoItem.appendChild(todoDescription);

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn--delete");
  btnDelete.textContent = "Delete";
  todoItem.appendChild(btnDelete);

  container.appendChild(todoItem);
};

const renderTodos = () => {
  const todoList = JSON.parse(localStorage.getItem(STORAGE_ARRAY_KEY) || "[]");
  todoList.forEach((todo: Todo) => appendTodo(todo));
};

const clearParentContent = (parent: Element) => {
  while (parent.lastChild) parent.removeChild(parent.lastChild);
};

const clearAndRenderTodos = (parent: Element) => {
  clearParentContent(parent);
  renderTodos();
};

const removeTodo = (id: string) => {
  todoArray = todoArray.filter((todo: Todo) => todo.id !== id);
  localStorage.setItem(STORAGE_ARRAY_KEY, JSON.stringify(todoArray));
  clearAndRenderTodos(listTodo);
};

formTodo.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const name = inputTodo.value;
  if (!name) return;
  const newTodo = createTodo(name);
  addTodo(newTodo);
  clearAndRenderTodos(listTodo);
});

listTodo.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  if (target && target.classList.contains("btn--delete")) {
    const id = target.parentElement?.dataset.id;
    if (id) removeTodo(id);
  }
});

window.addEventListener("load", () => {
  renderTodos();
});

export {};
