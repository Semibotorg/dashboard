import { configureStore, Store } from "@reduxjs/toolkit"
import {userSlice, guildsSlice, guildDashboardSlice, loadingDashboard,premiumStatusGuilds} from './user/user'
export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        guilds: guildsSlice.reducer,
        dashboard: guildDashboardSlice.reducer,
        loading_dashboard: loadingDashboard.reducer,
        premium: premiumStatusGuilds.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch