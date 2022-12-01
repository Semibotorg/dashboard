import { configureStore, Store } from "@reduxjs/toolkit"
import {userSlice, guildsSlice} from './user/user'
export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        guilds: guildsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch