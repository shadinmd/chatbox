import cn from "@/utils/cn"
import React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.Ref<HTMLDivElement>
}

const Container: React.FC<Props> = ({ children, className, ref }) => {

	return (
		<div className={cn(
			"flex items-center justify-center h-full w-full bg-white text-white", className)} ref={ref} >
			{children}
		</div>
	)
}

export default Container
