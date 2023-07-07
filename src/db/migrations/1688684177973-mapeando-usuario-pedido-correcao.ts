import { MigrationInterface, QueryRunner } from "typeorm";

export class MapeandoUsuarioPedidoCorrecao1688684177973 implements MigrationInterface {
    name = 'MapeandoUsuarioPedidoCorrecao1688684177973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "usuarioId" uuid`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "usuarioId"`);
    }

}
