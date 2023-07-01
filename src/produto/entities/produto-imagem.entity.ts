import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 500, nullable: false })
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produtoEntity) => produtoEntity.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}
