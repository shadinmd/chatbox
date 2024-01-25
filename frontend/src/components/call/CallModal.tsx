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
			<AlertDialogContent className="bg-black text-white">
				<AlertDialogHeader>
					start call?
				</AlertDialogHeader>
				<AlertDialogDescription className="text-white">
					are you ready to start the call
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogAction onClick={(e) => onAccept()} className="outline-none bg-chat-green text-black hover:bg-green-600">
						yes
					</AlertDialogAction>
					<AlertDialogCancel onClick={(e) => onReject()} className="outline-none bg-chat-red text-black">
						no
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default CallModal
