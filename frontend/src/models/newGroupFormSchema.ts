import { z } from "zod";

const newGroupFormSchema = z.object({
	name: z.string().min(4, { message: "group name too short" }),
	description: z.string().nullable()
})

export default newGroupFormSchema
