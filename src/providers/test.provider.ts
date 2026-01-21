import { Injectable } from "@nestjs/common";

@Injectable()
export class TestProvider {
    findAll() {
        return `This action returns all providers`;
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
