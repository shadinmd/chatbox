import { createSlice } from "@reduxjs/toolkit";
import { editUser, getUser } from "./userActions";

export interface IUser {
	username: string,
	email: string,
	_id: string,
	bio: string,
	admin: boolean,
	verified: boolean,
	image: string,
	online: boolean,
	lastOnline: Date,
	friends: IUser[],
	blocked: any[],
	createdAt: Date,
	updatedAt: Date
}

interface initialStateType {
	user: IUser,
	loading: boolean,
	error: boolean
}

const initialState: initialStateType = {
	user: {
		username: "",
		email: "",
		_id: "",
		bio: "",
		image: "",
		admin: false,
		verified: false,
		online: false,
		lastOnline: new Date(),
		friends: [],
		blocked: [],
		createdAt: new Date(),
		updatedAt: new Date()
	},
	loading: false,
	error: false
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {

		// get user details
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			state.error = false
			state.user = payload
		})

		builder.addCase(getUser.pending, (state) => {
			state.error = false
		})

		builder.addCase(getUser.rejected, (state) => {
			state.error = true
		})

		// edit use profile
		builder.addCase(editUser.fulfilled, (state, { payload }) => {
			state.loading = false
			state.error = false
			state.user = payload
		})

		builder.addCase(editUser.pending, (state) => {
			state.loading = true
			state.error = false
		})

		builder.addCase(editUser.rejected, (state) => {
			state.loading = false
			state.error = true
		})
	}
})


export default userSlice
