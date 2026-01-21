import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const CredentialsSchema = z.object({
    test: z.object({
        name: z.string(),
    }),
    username: z.string(),
    password: z.string(),
    arrtest: z.array(z.object({
        sim: z.string(),
        solution: z.number(),
        nested: z.object({
            type: z.boolean(),
            lol: z.float32(),
            date: z.iso.date().transform(d => new Date(d))
        })
    }))
})

// class is required for using DTO as a type
export class CreateProductDto extends createZodDto(CredentialsSchema) { }