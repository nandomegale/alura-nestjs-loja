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

    //refatorando todo a atribuição manual para Object.assign
    //fazer o Type Assertion serve para detectar se há diferenças entre as propriedades dos objetos
    Object.assign(produtoEntity, createProdutoDto as ProdutoEntity);

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

    //o Type Assertion neste caso não acusaria erro pois todas as propriedades do DTO são opcionais
    Object.assign(produtoEntity, updateProdutoDto);

    return await this.produtoRepository.save(produtoEntity);
  }

  async remove(id: string) {
    const result = await this.produtoRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Produto não encontrado');
    }
  }
}
