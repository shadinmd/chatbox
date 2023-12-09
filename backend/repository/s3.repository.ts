import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Readable } from "stream"

class S3Repository {
	private s3Client: S3Client

	constructor() {
		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: process.env.AWS_ACCESS as string,
				secretAccessKey: process.env.AWS_SECRET as string
			},
			region: "ap-south-1"
		})
	}

	async upload(file: Express.Multer.File, key: string) {
		try {
			console.log(key)

			const fileStream = new Readable()
			fileStream._read = () => { }

			fileStream.push(file.buffer)
			fileStream.push(null)

			const command = new PutObjectCommand({
				Bucket: "chatbox-storage",
				Key: key,
				Body: fileStream,
				ContentLength: file.size
			})
			const response = await this.s3Client.send(command)
			return {
				success: true,
				message: "file uploaded"
			}
		} catch (error) {
			return {
				success: false,
				message: "server error"
			}
		}
	}
	async getUrl(key: string) {
		try {
			const command = new GetObjectCommand({
				Bucket: "chatbox-storage",
				Key: key
			})
			const url = await this.s3Client.send(command)
			return {
				success: true,
				message: "fetched signed url",
				url
			}
		} catch (error) {
			return {
				success: false,
				message: "server error"
			}
		}
	}
}

export default S3Repository
