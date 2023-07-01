import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
//import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dtos/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { randomUUID } from 'node:crypto';
import { ListaUsuarioDTO } from './dtos/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dtos/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    //private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;
    usuarioEntity.id = randomUUID();
    await this.usuarioService.criarUsuario(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'usuario criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );
    return {
      usuario: usuarioAtualizado,
      message: 'usuario atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
    return {
      usuario: usuarioRemovido,
      message: 'usuario removido com sucesso!',
    };
  }
}
