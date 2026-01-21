import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const FindProductsSchema = z.object({
  quarter: z.number().int().positive().optional(),
  meta: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
})

export class FindProductsDto extends createZodDto(FindProductsSchema) { }
