import { createSlice } from "@reduxjs/toolkit";

// LOAD FAVORITE LIST
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favoriteList");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Could not load from local storage", error);
    return [];
  }
};

// SAVE FAVORITES IN LOCAL STORAGE
const saveToLocalStorage = (favoriteList) => {
  try {
    const serializedState = JSON.stringify(favoriteList);
    localStorage.setItem("favoriteList", serializedState);
  } catch (error) {
    console.error("Could not save to local storage", error);
  }
}

// INITIAL STATE
const initialState = {
  favoriteList: loadFromLocalStorage(),
};

// SLICE FOR FAVORITE LIST
export const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addFavoriteAction: (state, action) => {
      state.favoriteList.push(action?.payload);
      saveToLocalStorage(state.favoriteList);
    },

    deleteFavoriteAction: (state, action) => {
      const delIndex = state.favoriteList.findIndex(
        (item) => item.id === action?.payload
      );
      if (delIndex >= 0) {
        state.favoriteList.splice(delIndex, 1);
        saveToLocalStorage(state.favoriteList);
      }
    },
  },
});

export const { addFavoriteAction, deleteFavoriteAction } = favoriteListSlice.actions;
export default favoriteListSlice.reducer;