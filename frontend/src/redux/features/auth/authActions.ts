import { loginFormType } from "@/models/loginFormSchema"
import Api from "@/services/Api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export const login = createAsyncThunk(
	"auth/login",
	async (data: loginFormType, { rejectWithValue }) => {
		try {
			const response = await Api.post("/auth/login", data)
			if (response.data.success) {
				return response.data
			} else {
				toast.error(response.data.message)
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
			return rejectWithValue("error on login")
		}
	}
)

export const register = createAsyncThunk(
	"auth/register",
	async (data: { password: string, username: string, email: string }, { rejectWithValue }) => {
		try {
			const response = await Api.post("/auth/register", data)
			if (response.data.success)
				return response.data
			else
				toast.error(response.data.message)
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			} else {
				console.log(error)
			}
		}
		return rejectWithValue("error on registering")
	}
)

export default {
	login, register
}
