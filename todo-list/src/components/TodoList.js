import React, { Fragment, useState } from "react";


const TodoList = (props) => {
  const {
    todo,
    handleCheckTodo,
    handleonDeleteTodo,
    handleAddTodo,
    createTodo,
    setCreateTodo,
    setTodo,
    handleReorder,
  } = {
    ...props,
  };

  const [select, setSelect] = useState();

  const handleOnChangeSetCreateTodo = (e) => {
    if (e.target.name == "checkbox") {
      let tmp = { ...createTodo };
      tmp.isDone = !createTodo.isDone;
      setCreateTodo({ ...tmp });
    }
    if (e.target.name == "message") {
      let tmp = { ...createTodo };
      tmp.message = e.target.value;
      setCreateTodo({ ...tmp });
    }
    if (e.target.name == "close") {
      setCreateTodo(false);
    }
  };

  const handleOnSetSelect = (value, index) => {
    const newSelect = { id: value.id, index: index };
    setSelect({ ...newSelect });
  };

  const handleNewSort = (index) => {
    console.log("test");
    let newTodo = [...todo];
    const tmpNo = todo[select.index].no;
    newTodo[select.index].no = todo[index].no;
    newTodo[index].no = tmpNo;
    setTodo([...newTodo]);
    setSelect(false);
  };

  return (
    <Fragment>
      <div className="w-full">
        {todo &&
          todo
            .sort((a, b) => (a.no > b.no ? 1 : -1))
            .map((value, index) => (
              <div
                className={`flex items-center h-full  px-4 ${
                  select && select.id == value.id && "bg-amber-100"
                } ${
                  select &&
                  select.id != value.id &&
                  "hover:border-b-2 hover:border-amber-500"
                }`}
                key={index}
              >
                <input
                  type="checkbox"
                  checked={value.isDone}
                  disabled={value.isDone}
                  onChange={() => handleCheckTodo(index)}
                  className="h-6 w-6 cursor-pointer"
                />
                <div
                  className={`w-full ml-2 py-2 overflow-hidden cursor-pointer`}
                  onClick={() => {
                    !select
                      ? handleOnSetSelect(value, index)
                      : handleReorder(index, select.index) && setSelect(false);
                  }}
                >
                  <p
                    className={`p-0 font-semibold truncate ${
                      value.isDone &&
                      "decoration-neutral-500 text-neutral-500 line-through"
                    }`}
                  >
                    {value.message}
                  </p>
                </div>
                {!value.isDone && (
                  <button
                    type="button"
                    className="font-semibold ml-2"
                    onClick={() => handleonDeleteTodo(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
        {createTodo && (
          <form onSubmit={(e) => handleAddTodo(e)}>
            <div className="flex item-center  py-2 px-4">
              <input
                type="checkbox"
                name="checkbox"
                className="h-6 w-6 cursor-pointer"
                checked={createTodo.isDone}
                onChange={(e) => handleOnChangeSetCreateTodo(e)}
              />
              <div className="w-full ml-2">
                <input
                  type="text"
                  name="message"
                  autoFocus={createTodo.message == "" ? true : false}
                  className="w-full font-semibold  border-0 focus:border-b focus:outline-none disabled:line-through disabled:bg-white disabled:text-neutral-500 disabled:decoration-neutral-500"
                  value={createTodo.message}
                  placeholder="Enter to save"
                  onChange={(e) => handleOnChangeSetCreateTodo(e)}
                />
              </div>
              <button
                name="close"
                type="button"
                className="font-semibold"
                onClick={(e) => handleOnChangeSetCreateTodo(e)}
              >
                X
              </button>
            </div>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default TodoList;
