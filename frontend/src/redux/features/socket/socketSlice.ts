import { createSlice } from "@reduxjs/toolkit";
import SimplePeer from "simple-peer";
import { Socket, io } from "socket.io-client";

interface initialStateType {
	socket: Socket | null,
	offer: SimplePeer.SignalData | null
}

const initialState: initialStateType = {
	socket: null,
	offer: null
}

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		initiate: (state) => {
			return { ...state, socket: io(process.env.NEXT_PUBLIC_API as string) }
		},
		setOffer: (state, { payload }: { payload: SimplePeer.SignalData }) => {
			return { ...state, offer: payload }
		}
	}
})

export default socketSlice
