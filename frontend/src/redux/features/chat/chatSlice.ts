import { createSlice } from "@reduxjs/toolkit";
import { getRequests, getAllMessages } from "./chatActions";

interface initialStateType {
    friends: any[],
    messages: any[],
    requests: any[],
    loading: boolean,
    error: boolean
}

const initialState: initialStateType = {
    friends: [],
    messages: [],
    requests: [],
    loading: false,
    error: false
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRequests.fulfilled, (state, { payload }) => {
            state.requests = payload
            state.error = false
            state.loading = false
        })
        builder.addCase(getRequests.pending, (state) => {
            state.error = false
            state.loading = true
        })
        builder.addCase(getRequests.rejected, (state) => {
            state.error = true
            state.loading = false
        })

        builder.addCase(getAllMessages.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = false
            state.messages = payload
        })
        builder.addCase(getAllMessages.pending, (state) => {
            state.error = false
            state.loading = true
        })
        builder.addCase(getAllMessages.rejected, (state) => {
            state.loading = false
            state.error = true
        })
    }
})

export default chatSlice