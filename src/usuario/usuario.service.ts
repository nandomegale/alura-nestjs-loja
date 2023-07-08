import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dtos/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dtos/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dtos/ListaUsuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

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

  async criarUsuario(criaUsuarioDTO: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    //refatorando todo a atribuição manual para Object.assign
    //fazer o Type Assertion serve para detectar se há diferenças entre as propriedades dos objetos
    Object.assign(usuarioEntity, criaUsuarioDTO as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async atualizaUsuario(id: string, atualizaUsuarioDTO: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    Object.assign(usuario, atualizaUsuarioDTO);

    return await this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const result = await this.usuarioRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Usuário não foi encontrado');
    }
  }

  async existeComEmail(email: string) {
    const existeUsuarioComEmail = await this.usuarioRepository.findOneBy({
      email,
    });
    return existeUsuarioComEmail;
  }
}
