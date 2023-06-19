import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailEhUnico } from '../validators/emeail-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsString({
    message: 'nome deve ser uma string!',
  })
  @IsNotEmpty({
    message: 'nome não pode ser vazio!',
  })
  nome: string;

  @IsEmail(
    {},
    {
      message: 'email deve ser um email válido!',
    },
  )
  @EmailEhUnico({
    message: 'Já existe um usuário com esse email!',
  })
  email: string;

  @MinLength(6, {
    message: 'senha deve conter no mínimo 6 caracteres!',
  })
  senha: string;
}
