import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
  isURL,
} from 'class-validator';
import { ProdutoEntity } from '../entities/produto.entity';
import { Type } from 'class-transformer';

export class ProdutoCaracteristicaDTO {
  id: string;

  @IsString({
    message: 'nome da caracteristica deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'nome da caracteristica não pode ser vazio!',
  })
  nome: string;

  @IsString({
    message: 'descrição da caracteristica deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'descrição da caracteristica não pode ser vazio!',
  })
  descricao: string;

  produto: ProdutoEntity;
}

export class ProdutoImagemDTO {
  id: string;

  @IsUrl(
    {},
    {
      message: 'url deve ser uma URL válida',
    },
  )
  url: string;

  @IsString({
    message: 'descrição da imagem do produto deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'descrição da imagem do produto não pode ser vazio!',
  })
  descricao: string;

  produto: ProdutoEntity;
}

export class CreateProdutoDto {
  @IsString({
    message: 'usuário id deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'usuário id não pode ser vazio!',
  })
  usuarioId: string;

  @IsString({
    message: 'nome deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'nome não pode ser vazio!',
  })
  nome: string;

  @IsInt({ message: 'valor deve ser um inteiro' })
  @IsNotEmpty({
    message: 'valor não pode ser vazio!',
  })
  valor: number;

  @IsInt({ message: 'quantidade deve ser um inteiro' })
  @IsNotEmpty({
    message: 'quantidade não pode ser vazio!',
  })
  quantidade: number;

  @IsString({
    message: 'descrição deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'descrição não pode ser vazio!',
  })
  descricao: string;

  @IsString({
    message: 'categoria deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'categoria não pode ser vazio!',
  })
  categoria: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProdutoCaracteristicaDTO)
  caracteristicas: ProdutoCaracteristicaDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProdutoImagemDTO)
  imagens: ProdutoImagemDTO[];
}
