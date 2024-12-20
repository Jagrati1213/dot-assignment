import { configureStore } from '@reduxjs/toolkit'
import { favoriteListSlice } from './slice/allFavoriteSlice'

export const store = configureStore({
  reducer: {
    favoriteListSlice: favoriteListSlice.reducer
  },
})