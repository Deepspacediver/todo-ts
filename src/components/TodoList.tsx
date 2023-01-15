import React, { useState, useEffect, useRef, FormEvent } from "react";
import uniqd from "uniqid";

interface Todo {
  task: string;
  id: string;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState(() => {
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    localStorage.setItem("todos", JSON.stringify([]));
    return [];
  });
  let inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || !input.value) return;
    setTodoList((prevState: Todo[]) => [
      ...prevState,
      { task: input.value, id: uniqd() },
    ]);
  };
  console.log(todoList);
  return (
    <div>
      <form onSubmit={addTodo}>
        <label htmlFor="todo-input"></label>
        <input ref={inputRef} type="text" id="todo-input" />
        <button>Add Todo</button>
      </form>
      <ul>
        {todoList?.map((todo: Todo) => (
          <p key={todo.id}>{todo.task}</p>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
