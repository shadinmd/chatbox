import { createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";

interface initialStateType {
	socket: Socket | null
}

const initialState: initialStateType = {
	socket: null
}

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		initiate: (state) => {
			return { ...state, socket: io(process.env.NEXT_PUBLIC_API as string) }
		}
	}
})

export default socketSlice
