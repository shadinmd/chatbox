import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/user/userSlice";
import chatSlice from "./features/chat/chatSlice";
import socketSlice from "./features/socket/socketSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		user: userSlice.reducer,
		chat: chatSlice.reducer,
		socket: socketSlice.reducer
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false
	})
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
