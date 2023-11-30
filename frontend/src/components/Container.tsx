import cn from "@/utils/cn"
import React from "react"

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {

	return (
		<div className={cn(
			"flex items-center justify-center h-full w-full bg-chat-black text-white rounded-3xl",
			className
		)}>
			{children}
		</div>
	)
}

export default Container
