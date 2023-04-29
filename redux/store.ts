import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/users'
import campaignsReducer from './reducers/campaigns'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    campaigns: campaignsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;