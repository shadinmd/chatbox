import { createSlice } from "@reduxjs/toolkit";
import { getRequests, getChats } from "./chatActions";

interface IUser {
	_id?: string,
	username?: string,
	password?: string,
	email?: string,
	image?: string,
	bio?: string,
	admin?: boolean,
	active?: boolean,
	verified?: boolean,
	blocked?: [],
	friends?: string[],
	online?: boolean,
	lastOnline?: Date,
	settings?: {
		theme?: "DARK" | "LIGHT",
		icons?: {
			call?: string,
			chat?: string,
			settings?: string,
			home?: string
		}
	}
	verificationToken?: string
}

export interface IChat {
	_id?: string,
	groupName?: string,
	description?: string,
	latestMessage?: string,
	latestMessageTime?: Date,
	newMessages?: number,
	members?: { user: IUser, role: string }[]
	group?: boolean
}

export interface IRequest {
	_id?: string,
	sender?: IUser,
	reciever?: string,
	status?: "ACCEPTED" | "REJECTED" | "WAITING",
	createdAt?: Date
}

interface initialStateType {
	friends: any[],
	chats: IChat[],
	requests: IRequest[],
	loading: boolean,
	error: boolean
}

const initialState: initialStateType = {
	friends: [],
	chats: [],
	requests: [],
	loading: false,
	error: false
}

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		acceptRequest: (state, { payload }: { payload: string }) => {
			const newRequests = state.requests.map((e) => {
				if (e._id == payload) {
					e.status = "ACCEPTED"
					return e
				} else {
					return e
				}
			})
			state.requests = newRequests
		},
		appendRequest: (state, { payload }) => {

			if (typeof payload.sender != "string")
				return {
					...state,
					requests: [...state.requests, payload]
				}
			else
				return state
		},
		deleteRequest: (state, { payload }) => {
			console.log("paying the load", payload)
			const newRequests = state.requests.filter((e) => e._id != payload)
			console.log(newRequests)
			return {
				...state,
				requests: newRequests
			}
		},
		updateLatestMessage: (state, { payload }: { payload: { id: string, message: string, time: Date } }) => {
			return {
				...state,
				chats: [...state.chats.map((e) => e._id == payload.id ? { ...e, latestMessage: payload.message, latestMessageTime: payload.time } : e)]
			}
		}
	},
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

		builder.addCase(getChats.fulfilled, (state, { payload }) => {
			state.loading = false
			state.error = false
			state.chats = payload
		})
		builder.addCase(getChats.pending, (state) => {
			state.error = false
			state.loading = true
		})
		builder.addCase(getChats.rejected, (state) => {
			state.loading = false
			state.error = true
		})
	}
})

export default chatSlice
