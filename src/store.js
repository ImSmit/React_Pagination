import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './reducers/users/userSlice'
import { usersAPI } from './reducers/users/api'
import { documentsAPI } from './reducers/documents/api'

export const store = configureStore({
    reducer: {
      user: userSlice,
      [usersAPI.reducerPath]: usersAPI.reducer,
      [documentsAPI.reducerPath]: documentsAPI.reducer,
    }, 

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersAPI.middleware, documentsAPI.middleware)
    })

setupListeners(store.dispatch)