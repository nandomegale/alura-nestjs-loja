/////////////////////////MANEIRA UM/////////////////////

// import {
//   IsString,
//   IsEmail,
//   MinLength,
//   IsNotEmpty,
//   IsOptional,
// } from 'class-validator';
// import { EmailEhUnico } from '../validators/emeail-eh-unico.validator';

// export class AtualizaUsuarioDTO {
//   @IsString({
//     message: 'nome deve ser uma string!',
//   })
//   @IsOptional()
//   nome: string;

//   @IsEmail(
//     {},
//     {
//       message: 'email deve ser um email válido!',
//     },
//   )
//   @EmailEhUnico({
//     message: 'Já existe um usuário com esse email!',
//   })
//   @IsOptional()
//   email: string;

//   @MinLength(6, {
//     message: 'senha deve conter no mínimo 6 caracteres!',
//   })
//   @IsOptional()
//   senha: string;
// }

//////////////////////////////////////////////////////////////

///////////////////////////MANEIRA DOIS///////////////////////

// import {
//   IsString,
//   IsEmail,
//   MinLength,
//   IsNotEmpty,
//   IsOptional,
// } from 'class-validator';
// import { EmailEhUnico } from '../validators/emeail-eh-unico.validator';
// import { CriaUsuarioDTO } from './CriaUsuario.dto';

// export class AtualizaUsuarioDTO extends CriaUsuarioDTO {
//   @IsOptional()
//   nome: string;

//   @IsOptional()
//   email: string;

//   @IsOptional()
//   senha: string;
// }

//////////////////////////////////////////////////////////////

///////////////////////////MANEIRA TRES///////////////////////

import { PartialType } from '@nestjs/mapped-types';
import { CriaUsuarioDTO } from './CriaUsuario.dto';

export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}

//////////////////////////////////////////////////////////////
