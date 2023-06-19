import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  private buscarUsuarioPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );
    if (!possivelUsuario) {
      throw new Error('usuário não encontrado');
    }
    return possivelUsuario;
  }

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listarTodos() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }

  async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const possivelUsuario = this.buscarUsuarioPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') return;
      possivelUsuario[chave] = valor;
    });
    return possivelUsuario;
  }

  async remover(id: string) {
    const usuario = this.buscarUsuarioPorId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );
    return usuario;
  }
}
