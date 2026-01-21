
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        const parsedValue = this.schema.safeParse(value);
        console.log(parsedValue)
        if (parsedValue.success) return parsedValue.data;

        throw new BadRequestException(parsedValue.error.format())
    }
}
