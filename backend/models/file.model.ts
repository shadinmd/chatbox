import mongoose from "mongoose";
import IFile from "../interface/file.interface";

const fileSchema = new mongoose.Schema<IFile>({
	name: {
		type: String,
		required: true
	},
	key: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	url: {
		type: String,
		require: true
	}
})

const FileModel = mongoose.model("File", fileSchema)
export default FileModel
