import { httpClient } from "./httpClient";

// import axios from "axios";

const getAllTodoList = () => {
  const res = httpClient.get("getTodoList");
  return res;
};

const postTodo = (data) => {
  const res = httpClient.post("postTodo", data);

  return res;
};

const deleteTodo = (id) => {
  const res = httpClient.delete("deleteTodo/" + id);
  return res;
};

const updateTodo = (id, data) => {
  const res = httpClient.put("deleteTodo/" + id, data);
  return res;
};

const deleteAllTodoList = () => {
  const res = httpClient.delete("deleteTodoList");
  return res;
};

const swapTodo = (data) => {
  const res = httpClient.put("swapTodo", data);
  return res;
};

export default {
  getAllTodoList,
  postTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodoList,
  swapTodo,
};
