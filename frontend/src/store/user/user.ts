import { APIUser, APIGuild } from "discord-api-types/v10";
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Guilds, StateDashboardI } from '../../utils/constants'

const initialStateUser: APIUser = null as any
const initialStateGuild: Guilds = null as any
const initialStateDashboard: StateDashboardI = {
    guilds:[]
}
const initialStateLoadingDashboard: boolean = null as any

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUser,
    reducers: {
        addUser: (state, action: PayloadAction<APIUser>) => {
            return action.payload
        }
    }
})

export const guildsSlice = createSlice({
    name: 'guilds',
    initialState: initialStateGuild,
    reducers: {
        addGuild: (state, action: PayloadAction<Guilds>) => {
            return action.payload
        }
    }
})

export const guildDashboardSlice = createSlice({
    name:'dashboard',
    initialState: initialStateDashboard,
    reducers:{
        addDashboard: (state, action: PayloadAction<StateDashboardI>) => {
            return action.payload
        }
    }

})

export const loadingDashboard = createSlice({
    name:'loading_dashboard',
    initialState: initialStateLoadingDashboard,
    reducers:{
        addLoadingDashboard: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }

})

export const { addUser } = userSlice.actions
export const { addGuild } = guildsSlice.actions
export const { addDashboard } = guildDashboardSlice.actions
export const { addLoadingDashboard } = loadingDashboard.actions