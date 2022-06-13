import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, { payload }) => {
      const newTask = {
        id: payload.id,
        name: payload.task,
        createdDate: payload.createdDate,
        createdTime: payload.createdTime,
        isCompleted: payload.isCompleted,
      };
      state.push(newTask);
    },
    deleteTask: (state, { payload }) => {
      return state.filter((item) => item.id !== payload.id);
    },
    completeTask: (state, { payload }) => {
      return state.map((item) =>
        item.id === payload.id ? { ...item, isCompleted: true } : item
      );
    },
    updateTask: (state, { payload }) => {
      return updateObj(state, payload.id, payload);
    },
  },
});

const updateObj = (list, id, payload) => {
  const updatedList = list;
  const val = payload,
    index = updatedList.findIndex(({ name, id }) => id === val.id);

  if (index === -1) {
    updatedList.push(val);
  } else {
    updatedList[index] = val;
  }

  return updatedList;
};
export const { addTask, deleteTask, completeTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
