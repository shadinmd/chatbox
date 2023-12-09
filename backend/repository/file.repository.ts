import IFile from "../interface/file.interface"
import FileModel from "../models/file.model"

class FileReopsitory {
	constructor() { }

	async create(file: IFile) {
		try {
			const response = await new FileModel(file).save()
			return {
				success: true,
				message: "file created",
				file: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async delete() {

	}
}

export default FileReopsitory
