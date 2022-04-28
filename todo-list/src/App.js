import "./App.css";
import { Fragment, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import {
  deleteAllTodoList,
  deleteTodo,
  getAllTodoList,
  postTodo,
  swapTodo,
  updateTodo,
} from "./actions/todolist";

const todoStruc = {
  no: 0,
  message: "",
  isDone: false,
};

function App() {
  const [todo, setTodo] = useState();
  const [createTodo, setCreateTodo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTodoList();
      console.log("do");
      if (data) {
        setTodo(data);
      } else {
        setTodo([]);
      }
    };
    !todo && fetchData();
  }, []);

  const handleCreateTodo = () => {
    let newTodo = { ...todoStruc };
    newTodo.no = todo.length + 1;
    setCreateTodo(newTodo);
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const res = await postTodo(createTodo);
    if (res.status == "success") {
      const data = await getAllTodoList();
      setTodo(data);
      setCreateTodo(false);
    } else if (res.status == "error") {
      alert("post todo fail.");
    }
  };

  const handleCheckTodo = async (index) => {
    let newTodo = [...todo];
    newTodo[index].isDone = true;
    const id = todo[index].id;
    const res = await updateTodo(id, todo[index]);
    if (res.status == "success") {
      setTodo(() => [...newTodo]);
    } else if (res.status == "error") {
      alert("checked fail");
    }
  };

  // const handleonChangeMessage = async (index, event) => {
  //   let newTodo = [...todo];
  //   newTodo[index].message = event.target.value;
  //   setTodo(() => [...newTodo]);
  //   if (event.type == "blur") {
  //     const id = todo[index].id;
  //     const res = updateTodo(id, todo[index]);
  //     if (res.status == "error") {
  //       const data = await getAllTodoList();
  //       setTodo(data);
  //     }
  //   }
  // };

  const handleReorder = async (index1, index2) => {
    const data = {
      firstId: todo[index1].id,
      firstNo: todo[index2].no,
      seconId: todo[index2].id,
      seconNo: todo[index1].no,
    };
    const res = await swapTodo(data);
    if (res.status == "success") {
      const data = await getAllTodoList();
      setTodo(data);
    } else if (res.status == "error") {
      alert("swap all fail.");
    }
  };

  const handleOnClickDeleteAll = async () => {
    const res = await deleteAllTodoList();
    if (res.status == "success") {
      setTodo([]);
    } else if (res.status == "error") {
      alert("delete all fail.");
    }
  };

  const handleonDeleteTodo = async (index) => {
    const id = todo[index].id;

    const res = await deleteTodo(id);

    if (res.status == "success") {
      const data = await getAllTodoList();
      setTodo(data);
    } else if (res.status == "error") {
      alert("delete todo fail.");
    }
  };

  return (
    <Fragment>
      <div className="flex flex-row justify-center items-center h-screen">
        <div className="border-2 border-neutral-300 rounded-xl w-80 overflow-hidden">
          <div className="flex w-full flex-col h-96">
            <div className="p-4">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl text-emerald-600 font-bold">
                  Todo list
                </h1>
                <button onClick={handleOnClickDeleteAll}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 fill-rose-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-semibold text-sm italic">
                {todo && todo.length} Tasks
              </p>
            </div>
            <div style={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
              <TodoList
                todo={todo}
                handleAddTodo={handleAddTodo}
                handleCheckTodo={handleCheckTodo}
                handleonDeleteTodo={handleonDeleteTodo}
                createTodo={createTodo}
                setCreateTodo={setCreateTodo}
                setTodo={setTodo}
                handleReorder={handleReorder}
              />
            </div>
            <div className="w-full bg-neutral-300 h-12">
              <div className="w-full h-full flex justify-between items-center px-4">
                <p className="font-bold text-neutral-500">
                  What we have to do?
                </p>
                <button
                  className="font-bold text-neutral-500"
                  type="button"
                  onClick={handleCreateTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
