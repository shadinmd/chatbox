"use client";
import Container from "@/components/Container"
import CallModal from "@/components/call/CallModal";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SimplePeer from "simple-peer";
import { Newspaper } from "lucide-react";
import { off } from "process";

const Call = () => {

	const params = useSearchParams()
	const router = useRouter()

	const userParam = params.get("user")
	const startParam = params.get("start") ? JSON.parse(params.get("start")!) : false
	const acceptParam = params.get("accept") ? JSON.parse(params.get("accept")!) : false

	const [localStream, setLocalStream] = useState<MediaStream>()
	const [remoteStream, setRemoteStream] = useState<MediaStream>()

	const [callModal, setCallModal] = useState<boolean>(startParam)
	const [peer, setPeer] = useState<SimplePeer.Instance>()
	const [video, setVideo] = useState(true)
	const [mic, setMic] = useState(true)
	const [callAccepted, setCallAccepted] = useState(true)

	const socket = useSelector((state: RootState) => state.socket.socket)
	const currentUser = useSelector((state: RootState) => state.user.user)
	const friend = useSelector((state: RootState) => state.user.user.friends).find(e => e._id == userParam)
	const offer = useSelector((state: RootState) => state.socket.offer)

	const localVideoRef = useRef<HTMLVideoElement>(null)
	const remoteVideoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setLocalStream(stream)
				if (localVideoRef.current)
					localVideoRef.current.srcObject = stream
			})

		return () => {
			if (localStream) {
				const tracks = localStream.getTracks()
				tracks.map((e) => e.stop())
			}
		}
	}, [])

	useEffect(() => {
		if (acceptParam) {
			acceptcall({ offer: offer! })
		}
	}, [])

	const startCall = useCallback(() => {
		const newPeer = new SimplePeer({ initiator: true, trickle: false, stream: localStream })
		newPeer.on("signal", (data) => {
			console.log("call started")
			socket?.emit("call:start", {
				offer: data,
				caller: currentUser._id,
				to: userParam,
				callerName: currentUser.username
			})
		})

		newPeer.on("stream", (stream) => {
			console.log("i got sream", stream)
			if (remoteVideoRef.current)
				remoteVideoRef.current.srcObject = stream
			setRemoteStream(stream)
		})

		socket?.on("call:accepted", ({ ans }) => {
			console.log("call accepted", ans)
			newPeer.signal(ans)
			setCallAccepted(true)
		})


		setPeer(newPeer)
	}, [socket, callAccepted, localStream, currentUser._id, userParam, currentUser.username, remoteVideoRef, remoteStream])

	const acceptcall = useCallback(({ offer }: { offer: SimplePeer.SignalData }) => {
		const newPeer = new SimplePeer({ initiator: false, stream: localStream, trickle: false })
		newPeer.on("signal", (data) => {
			socket?.emit("call:accept", { ans: data, caller: userParam })
		})

		newPeer.on("stream", (stream) => {
			console.log("stream", stream)
			if (remoteVideoRef.current)
				remoteVideoRef.current.srcObject = stream
			setRemoteStream(stream)
		})

		console.log("got offer", offer)
		setCallAccepted(true)
		newPeer.signal(offer)
		setPeer(newPeer)
	}, [socket, callAccepted, localStream, currentUser._id, userParam, currentUser.username, remoteVideoRef, remoteStream])

	const toggleVideo = () => {
		if (localStream) {
			localStream.getVideoTracks().forEach(track => {
				track.enabled = !track.enabled; // Toggle the enabled state of the video track
			});
		}
		setVideo((prev) => !prev)
	}

	const toggleMic = () => {
		if (localStream) {
			localStream.getAudioTracks().forEach(track => {
				track.enabled = !track.enabled; // Toggle the enabled state of the video track
			});
		}
		setMic((prev) => !prev)
	}

	const dontStartCall = () => {
		router.back()
		const tracks = localStream?.getTracks()
		tracks?.forEach(e => e.stop())
	}

	const hangupCall = () => {
		const tracks = localStream?.getTracks()
		tracks?.forEach(e => e.stop())
		router.back()
	}

	return (
		<Container className="flex flex-col gap-5 p-10">
			<CallModal open={callModal} onOpenChange={setCallModal} onReject={dontStartCall} onAccept={startCall} />
			<div className="h-20">

			</div>
			<div className="flex gap-5 w-full h-full">
				<div className="w-full h-full">
					<video ref={localVideoRef} className="w-full h-full bg-black rounded-xl" autoPlay={true} muted={true} />
				</div>
				<div className="w-full h-full">
					<video ref={remoteVideoRef} className="w-full h-full bg-black rounded-xl" autoPlay={true} />
				</div>
			</div>
			<div className="flex gap-5 h-20">
				<button onClick={() => hangupCall()} className="bg-chat-red text-black text-4xl p-3 rounded-full">
					<Icon icon={"mdi:phone-hangup"} />
				</button>
				<button className="bg-white text-black text-4xl p-3 rounded-full" onClick={() => toggleVideo()}>
					{
						video ?
							<Icon icon={"mdi:video"} /> :
							<Icon icon={"mdi:video-off"} />
					}
				</button>
				<button className="bg-white text-black text-4xl p-3 rounded-full" onClick={() => toggleMic()}>
					{
						mic ?
							<Icon icon={"material-symbols:mic"} /> :
							<Icon icon={"material-symbols:mic-off"} />
					}
				</button>
			</div>
		</Container>
	)
}

export default Call
