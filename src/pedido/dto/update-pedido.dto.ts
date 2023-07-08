import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDTO } from './create-pedido.dto';
import { StatusPedido } from '../enum/status-pedido.enum';
import { IsEnum } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDTO) {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
