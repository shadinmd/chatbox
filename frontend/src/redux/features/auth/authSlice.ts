import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { login, register } from "./authActions"

const initialState = {
	loggedIn: false,
	error: false,
	loading: false
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoggedIn(state, action: PayloadAction<boolean>) {
			state.loggedIn = action.payload
		},
		logout(state) {
			localStorage.removeItem("token")
			state.loggedIn = false
		}
	},
	extraReducers: (builder) => {
		// login
		builder.addCase(login.pending, (state) => {
			state.loading = true
			state.error = false
		})

		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.loading = false
			state.error = false
			state.loggedIn = true
			if (payload.success)
				localStorage.setItem("token", payload.token)
		})

		builder.addCase(login.rejected, (state) => {
			state.loading = false
			state.error = true
		})

		// register
		builder.addCase(register.fulfilled, (state) => {
			state.error = false
			state.loading = false
		})

		builder.addCase(register.pending, (state) => {
			state.error = false
			state.loading = true
		})

		builder.addCase(register.rejected, (state) => {
			state.error = true
			state.loading = false
		})

	}
})

export default authSlice
