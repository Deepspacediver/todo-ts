import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  MouseEvent,
} from "react";
import TodoItem from "./TodoItem";
import uniqd from "uniqid";

export interface TypeTodo {
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
    setTodoList((prevState: TypeTodo[]) => [
      ...prevState,
      { task: input.value, id: uniqd() },
    ]);
  };

  const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.parentElement?.dataset.id;
    if (id) {
      const newList = todoList.filter((todo: TypeTodo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newList));
      setTodoList(newList);
    }
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <label htmlFor="todo-input"></label>
        <input ref={inputRef} type="text" id="todo-input" />
        <button>Add Todo</button>
      </form>
      <ul>
        {todoList?.map((todo: TypeTodo) => (
          <TodoItem
            task={todo.task}
            id={todo.id}
            key={todo.id}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
