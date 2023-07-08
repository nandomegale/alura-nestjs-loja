import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoEntity } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produtoEntity = new ProdutoEntity();
    //produtoEntity.id = randomUUID();
    produtoEntity.nome = createProdutoDto.nome;
    //produtoEntity.usuarioId = createProdutoDto.usuarioId;
    produtoEntity.valor = createProdutoDto.valor;
    produtoEntity.quantidadeDisponivel = createProdutoDto.quantidadeDisponivel;
    produtoEntity.descricao = createProdutoDto.descricao;
    produtoEntity.categoria = createProdutoDto.categoria;
    produtoEntity.caracteristicas = createProdutoDto.caracteristicas;
    produtoEntity.imagens = createProdutoDto.imagens;
    return await this.produtoRepository.save(produtoEntity);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async findOne(id: string) {
    return await this.produtoRepository.findOneBy({ id });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produtoEntity = await this.produtoRepository.findOneBy({ id });

    if (produtoEntity === null) {
      throw new NotFoundException('Produto não encontrado');
    }

    Object.assign(produtoEntity, updateProdutoDto);

    return await this.produtoRepository.save(produtoEntity);
  }

  async remove(id: string) {
    return await this.produtoRepository.delete(id);
  }
}
