import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoEntity } from './entities/produto.entity';
import { randomUUID } from 'crypto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    const produto = new ProdutoEntity();
    produto.id = randomUUID();
    produto.usuarioId = createProdutoDto.usuarioId;
    produto.nome = createProdutoDto.nome;
    produto.valor = createProdutoDto.valor;
    produto.quantidade = createProdutoDto.quantidade;
    produto.descricao = createProdutoDto.descricao;
    produto.categoria = createProdutoDto.categoria;
    produto.caracteristicas = createProdutoDto.caracteristicas;
    produto.imagens = createProdutoDto.imagens;
    const produtoCadastrado = await this.produtoService.create(produto);
    return produtoCadastrado;
  }

  @Get()
  async findAll() {
    return await this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.produtoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.produtoService.remove(id);
  }
}
