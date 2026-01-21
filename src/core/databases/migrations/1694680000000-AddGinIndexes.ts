import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGinIndexes1694680000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_product_tags_gin" ON "product" USING gin ("tags");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_product_metadata_gin" ON "product" USING gin ("metadata");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_product_pay_by_quarter_gin" ON "product" USING gin ("pay_by_quarter");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_product_schedule_gin" ON "product" USING gin ("schedule");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_product_tags_gin";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_product_metadata_gin";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_product_pay_by_quarter_gin";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_product_schedule_gin";`);
    }
}
