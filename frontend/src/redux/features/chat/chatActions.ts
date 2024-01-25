import Api from "@/services/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getRequests = createAsyncThunk(
	"chat/getRequests",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await Api.get("/chat/requests")
			if (data.success) {
				return data.requests
			} else {
				toast.error(data.message)
				return rejectWithValue(data.message)
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message) {
					toast.error(error.response.data.message)
				} else {
					toast.error(error.message)
				}
			} else {
				console.log(error)
			}
			return rejectWithValue("error")
		}
	}
)

export const getChats = createAsyncThunk(
	"chat/getChats",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await Api.get("/chat/")
			if (data.success) {
				return data.chats || []
			} else {
				toast.error(data.message)
				return rejectWithValue({})
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			} else {
				console.log(error)
			}
			return rejectWithValue({})
		}
	}
)
