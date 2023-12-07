
import { UserRepositoryImpl } from "./repositories/postgreSqlUserRepository";
const userRepositoryImpl= new UserRepositoryImpl();

import { UserCreateController } from "./controllers/userCreateController";
import {  UserCreateUseCase } from "../application/userCreateUseCase";

const userCreateUseCase = new  UserCreateUseCase(userRepositoryImpl);
const userCreateController = new UserCreateController(userCreateUseCase);

import { LoginUserController } from "./controllers/loginUserController";
import { LoginUserUseCase } from "../application/loginUserUseCase";

const loginUserUseCase = new LoginUserUseCase(userRepositoryImpl)
const loginUserController = new LoginUserController(loginUserUseCase)

import { ListAllUsersController} from "./controllers/listAllUsersController";
import { ListAllUsersUseCase} from "../application/listAllUsersUseCase";

const listAllUsersUseCase = new ListAllUsersUseCase(userRepositoryImpl)
const listAllUsersController = new ListAllUsersController(listAllUsersUseCase)

import { UserDeleteUseCase } from '../application/userDeleteUseCase';
import { UserDeleteController } from './controllers/userDeleteController';

const userDeleteUseCase = new UserDeleteUseCase(userRepositoryImpl);
const userDeleteController = new UserDeleteController(userDeleteUseCase);

import { UpdatePasswordController } from "./controllers/updatePasswordController";
import { UpdatePasswordUseCase } from "../application/updatePasswordUseCase";

const updatePasswordUseCase = new UpdatePasswordUseCase(userRepositoryImpl);
const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);

import { ValidateDeletUserController } from "./controllers/validateDeletUserController";
import { ValidateDeletUserUseCase } from "../application/validateDeletUserUseCase";

const validateDeletUserUseCase = new ValidateDeletUserUseCase(userRepositoryImpl);
const validateDeletUserController = new ValidateDeletUserController(validateDeletUserUseCase);

export {
    userCreateController,
    loginUserController,
    listAllUsersController,
    userDeleteController,
    updatePasswordController,
    validateDeletUserController
};