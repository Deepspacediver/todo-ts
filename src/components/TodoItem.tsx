import React, { MouseEvent } from "react";
import { TypeTodo } from "./TodoList";

interface TodoProps extends TypeTodo {
  handleDeleteTodo: (e: MouseEvent<HTMLButtonElement>) => void;
}

const TodoItem = ({ task, id, handleDeleteTodo }: TodoProps) => {
  return (
    <div className="todo-wrapper" data-id={id}>
      <p>Todo: {task}</p>
      <button onClick={handleDeleteTodo}>Complete</button>
    </div>
  );
};

export default TodoItem;
