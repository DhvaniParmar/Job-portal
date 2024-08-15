import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import progressReducer from './progress/progressSlice'

export default configureStore({
  reducer: {
    theme : themeReducer,
    progress : progressReducer,
  },
})

