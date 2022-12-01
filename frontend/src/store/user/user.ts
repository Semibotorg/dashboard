import { APIUser } from "discord-api-types/v10";
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Guilds } from '../../utils/constants'
const initialStateUser: APIUser = null as any
const initialStateGuild: Guilds = null as any

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

export const { addUser } = userSlice.actions
export const { addGuild } = guildsSlice.actions