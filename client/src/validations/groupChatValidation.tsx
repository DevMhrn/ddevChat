import {z} from 'zod';
export const createChatSchema = z.object({
    title : z.string().min(3, {message : "Title must be at least 4 characters"}).max(255, {message : "Title must be at most 191 characters"}),
    passcode : z.string().min(3, {message : "Passcode must be at least 4 characters"}).max(255, {message : "Passcode must be at most 25 characters"}),
}).required({
    title : true,
    passcode : true,
})

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;
