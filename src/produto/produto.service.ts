import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    return await this.produtoRepository.save(createProdutoDto);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async findOne(id: string) {
    return await this.produtoRepository.findOneBy({ id });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    return await this.produtoRepository.update(id, updateProdutoDto);
  }

  async remove(id: string) {
    return await this.produtoRepository.delete(id);
  }
}
