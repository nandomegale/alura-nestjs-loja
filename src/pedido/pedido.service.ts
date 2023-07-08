import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProdutoEntity } from '../produto/entities/produto.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { CreatePedidoDTO } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedidoEntity } from './entities/item-pedido.entity';
import { PedidoEntity } from './entities/pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private trataDadosDoPedido(
    dadosDoPedido: CreatePedidoDTO,
    produtoRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtoRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O Produto com id: ${itemPedido.produtoId} não foi encontrado`,
        );
      }
      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada '${itemPedido.quantidade}' é maior do que a quantidade disponível '${produtoRelacionado.quantidadeDisponivel}' do produto '${produtoRelacionado.nome}'`,
        );
      }
    });
  }

  async create(usuarioId: string, dadosDoPedido: CreatePedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const produtosId = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtoRelacionados = await this.produtoRepository.findBy({
      id: In(produtosId),
    });

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    this.trataDadosDoPedido(dadosDoPedido, produtoRelacionados);

    const itensPedidoEntity = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtoRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntity.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntity;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  async findByUserId(usuarioId: string) {
    const pedidosDoUsuario = await this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
    return pedidosDoUsuario;
  }

  findAll() {
    return `This action returns all pedido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    // throw new Error('Simulando erro...')
    if (pedido === null) {
      throw new NotFoundException('Pedido não encontrado');
    }

    Object.assign(pedido, updatePedidoDto);

    return await this.pedidoRepository.save(pedido);
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
