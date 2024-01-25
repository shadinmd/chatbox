import axios, { isAxiosError } from "axios";
import { toast } from "sonner";


const Api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API
})

Api.interceptors.request.use((request) => {
	if (localStorage.getItem("token")) {
		request.headers.authorization = localStorage.getItem("token")
	}
	return request
})

Api.interceptors.response.use(
	(e) => {
		return e
	},
	(error) => {
		if (isAxiosError(error)) {
			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("token")
				toast.error("your account is blocked")
				window.location.assign("/app/login")
			} else if (error?.response?.data?.error == "verification") {
				window.location.assign("/verify")
			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("token")
				window.location.assign("/app/login")
			}
			else {
				return Promise.reject(error)
			}
		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)

export default Api
