import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ProdutoCaracteristicaEntity } from 'src/produto/entities/produto-caracteristica.entity';
import { ProdutoImagemEntity } from 'src/produto/entities/produto-imagem.entity';
import { ProdutoEntity } from 'src/produto/entities/produto.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    //throw new Error("Method not implemented.");
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [UsuarioEntity, ProdutoEntity, ProdutoCaracteristicaEntity, ProdutoImagemEntity],
      synchronize: true,
    };
  }
}
