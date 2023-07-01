import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
