import { z } from "zod";

const editUserFormSchema = z.object({
    username: z.string(),
    email: z.string().email("email invalid"),
    bio: z.string()
})

export default editUserFormSchema