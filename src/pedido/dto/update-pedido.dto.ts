import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDTO } from './create-pedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDTO) {}
