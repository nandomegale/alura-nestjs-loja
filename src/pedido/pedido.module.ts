import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { PedidoEntity } from './entities/pedido.entity';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { ProdutoEntity } from 'src/produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
