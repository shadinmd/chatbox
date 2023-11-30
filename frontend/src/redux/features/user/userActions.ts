import Api from "@/services/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getUser = createAsyncThunk(
	"user/get",
	async () => {
		try {
			const response = await Api.get("/user")
			if (response.data.success) {
				console.log(response.data)
				return response.data.user
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
		}
	}
)

export const editUser = createAsyncThunk(
	"user/edit",
	async (data: any) => {
		try {
			console.log(data._id)
			const response = await Api.put("/user/", data)
			if (response.data.success) {
				toast.success(response.data.message)
				return response.data.user
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
		}
	}
)
