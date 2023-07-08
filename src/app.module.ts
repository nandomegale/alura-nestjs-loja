import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoHttp } from './filtros/filtro-de-excecao-http';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttp,
    },
  ],
})
export class AppModule {}
