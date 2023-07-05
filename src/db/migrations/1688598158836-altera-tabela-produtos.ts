import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraTabelaProdutos1688598158836 implements MigrationInterface {
    name = 'AlteraTabelaProdutos1688598158836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`);
    }

}
