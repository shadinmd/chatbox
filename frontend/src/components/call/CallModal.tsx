import { AlertDialog, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog"

interface Props {
	open: boolean,
	onOpenChange: (open: boolean) => void,
	onAccept: () => void,
	onReject: () => void
}

const CallModal: React.FC<Props> = ({ open, onOpenChange, onAccept, onReject }) => {
	return (
		<AlertDialog onOpenChange={onOpenChange} open={open} >
			<AlertDialogTrigger>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-white text-custom-blue">
				<AlertDialogHeader>
					start call?
				</AlertDialogHeader>
				<AlertDialogDescription className="">
					are you ready to start the call
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogAction onClick={(e) => onAccept()} className="outline-none bg-green-500 text-black hover:bg-green-600">
						yes
					</AlertDialogAction>
					<AlertDialogCancel onClick={(e) => onReject()} className="outline-none bg-red-500 text-black">
						no
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default CallModal
