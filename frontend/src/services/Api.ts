import axios from "axios";

const Api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API })

Api.interceptors.request.use((e) => {

	if (localStorage.getItem("token")) {
		e.headers.Authorization = localStorage.getItem("token")
	}

	return e
})

export default Api
