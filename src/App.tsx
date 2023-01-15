import React, { FC, useState } from "react";
import TodoList from "./components/TodoList";


function App(): JSX.Element {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
