import todolistServices from "../services/todolist.services";

export const getAllTodoList = async () => {
  const data = await todolistServices.getAllTodoList().then((res) => {
    return res.data;
  });
  return data;
};

export const postTodo = async (data) => {
  return await todolistServices.postTodo(data).then(
    (res) => {
      return { data: res.data, status: "success" };
    },
    (error) => {
      return { data: error, status: "error" };
    }
  );
};

export const deleteTodo = async (id) => {
  return await todolistServices.deleteTodo(id).then(
    (res) => {
      return { data: res.data, status: "success" };
    },
    (error) => {
      return { data: error, status: "error" };
    }
  );
};

export const deleteAllTodoList = async (id) => {
  return await todolistServices.deleteAllTodoList().then(
    (res) => {
      return { data: res.data, status: "success" };
    },
    (error) => {
      return { data: error, status: "error" };
    }
  );
};

export const updateTodo = async (id, data) => {
  return await todolistServices.updateTodo(id, data).then(
    (res) => {
      return { data: res.data, status: "success" };
    },
    (error) => {
      return { data: error, status: "error" };
    }
  );
};

export const swapTodo = async (data) => {
  return await todolistServices.swapTodo(data).then(
    (res) => {
      return { data: res.data, status: "success" };
    },
    (error) => {
      return { data: error, status: "error" };
    }
  );
};
