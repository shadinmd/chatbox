import cn from "@/utils/cn"
import Link from "next/link"

interface Props {
	links: {
		location: string,
		icon: string,
		name: string
	}[],
	className?: string
}

const SubSidebar: React.FC<Props> = ({ links, className }) => {
	return (
		<div className={cn("flex flex-col items-center justify-start h-full py-44 gap-2 text-xl font-bold", className)}>
			{
				links.map((e) => (
					<Link href={`/app/${e.location}`}>
						{e.name}
					</Link>
				))
			}
		</div>
	)
}

export default SubSidebar
