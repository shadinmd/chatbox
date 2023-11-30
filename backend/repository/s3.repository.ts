import { S3Client } from "@aws-sdk/client-s3"

class S3Repository {
	private s3Client: S3Client

	constructor() {
		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: process.env.AWS_ACCESS as string,
				secretAccessKey: process.env.AWS_SECRET as string
			},
			region : "ap-south-1"
		})
	}

	async upload() {
		 
	}
	async get() { }
}

export default S3Repository
