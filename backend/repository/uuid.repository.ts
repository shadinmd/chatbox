import { v4 as uuid4 } from "uuid"

class UuidRepository {
	constructor() { }

	generateId() {
		const id = uuid4()
		return id
	}
}

export default UuidRepository
