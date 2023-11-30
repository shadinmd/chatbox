import { createSlice } from "@reduxjs/toolkit";
import { editUser, getUser } from "./userActions";

const initialState = {
	user: {
		username: "",
		email: "",
		_id: "",
		bio: "",
		admin: false,
		verified: false
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
			state.loading = false
			state.error = false
			state.user = payload
		})

		builder.addCase(getUser.pending, (state) => {
			state.error = false
			state.loading = true
		})

		builder.addCase(getUser.rejected, (state) => {
			state.loading = false
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
