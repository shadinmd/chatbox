"use client"
import { useState } from "react"
import Container from "../Container"

const CallSidebar = () => {

	const [search, setSearch] = useState("")

	return (
		<div className="flex flex-col gap-2 w-5/12">
			<Container className="h-24">
			</Container>
			<Container>
			</Container>
		</div>
	)
}

export default CallSidebar
