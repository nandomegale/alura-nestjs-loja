import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dtos/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dtos/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async criarUsuario(usuario: UsuarioEntity) {
    await this.usuarioRepository.save(usuario);
  }

  async atualizaUsuario(id: string, usuario: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, usuario);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }

  async existeComEmail(email: string) {
    const existeUsuarioComEmail = await this.usuarioRepository.findOneBy({
      email,
    });
    return existeUsuarioComEmail;
  }
}
