import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { TypeTodo } from "./components/TodoList";

const firebaseConfig = {
  apiKey: "AIzaSyBP24-AeeHkbR-WeNOBvZ_gNYontoUtRDk",
  authDomain: "react-ts-todo-a522e.firebaseapp.com",
  projectId: "react-ts-todo-a522e",
  storageBucket: "react-ts-todo-a522e.appspot.com",
  messagingSenderId: "659401571513",
  appId: "1:659401571513:web:05ed4f134c057156302f68",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const saveList = async (list: TypeTodo[] | null) => {
  try {
    // console.log("save");
    await setDoc(doc(db, "list", "todos"), {
      todos: list,
    });
  } catch (err) {
    console.error("Failed to save Todo List", err);
  }
};

const getList = async () => {
  try {
    const todoRef = doc(db, "list", "todos");
    const todoSnapshot = await getDoc(todoRef);
    const todoData: TypeTodo[] | undefined = await todoSnapshot.data()?.todos;
    console.log("promise get", todoData);
    return todoData;
  } catch (err) {
    console.log("Failed to retrieve todos", err);
  }
};

export { saveList, getList };
