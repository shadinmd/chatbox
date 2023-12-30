import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const Api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API })

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

Api.interceptors.request.use((e) => {

	if (localStorage.getItem("token")) {
		e.headers.Authorization = localStorage.getItem("token")
	}

	return e
})

export default Api
