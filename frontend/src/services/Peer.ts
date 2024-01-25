export class Peer {
	peer: RTCPeerConnection;
	constructor() {
		this.peer = new RTCPeerConnection({
			iceServers: [
				{
					urls: [
						"stun:stun.l.google.com:19302",
						"stun:global.stun.twilio.com:3478",
					],
				},
			],
		})
	}


	async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
		await this.peer.setRemoteDescription(offer)
		const ans = await this.peer.createAnswer()
		await this.peer.setLocalDescription(new RTCSessionDescription(ans))
		return ans
	}

	async setRemoteDescription(ans: RTCSessionDescriptionInit) {
		await this.peer.setRemoteDescription(new RTCSessionDescription(ans))
	}

	async getOffer(): Promise<RTCSessionDescriptionInit> {
		const offer = await this.peer.createOffer()
		await this.peer.setLocalDescription(new RTCSessionDescription(offer));
		return offer
	}

}


const peer = new Peer()
export default peer
