import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import dataStore from "../../appwrite/Config";

async function fetchImg(id) {
  const url = await dataStore.imageView(id);
  return url;
}

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const posts = await dataStore.allDocument();
  const todos = await Promise.all(
    posts.documents.map(async (post) => ({
      $id: post.$id || "",
      title: post.title || "",
      content: post.content || "",
      imageid: post.imageid || null,
      status: post.status || "",
      userid: post.userid || "",
      imageUrl: post.imageid ? await fetchImg(post.imageid) : null,
    }))
  );
  return todos;
});

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.todos = [];
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.todos = [];
      });
  },
});

export default todoSlice.reducer;
