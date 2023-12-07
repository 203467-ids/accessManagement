import express, { Router } from 'express';
import { validateToken } from '../../../helpers/verifyToken';
import { userCreateController,loginUserController, listAllUsersController,userDeleteController, updatePasswordController,validateDeletUserController} from '../dependencies';

export const userRouter: Router = express.Router();

userRouter.post('/', userCreateController.run.bind(userCreateController));

userRouter.post('/login',loginUserController.run.bind(loginUserController))

userRouter.get('/',validateToken,  listAllUsersController.run.bind(listAllUsersController))

userRouter.delete('/:id',validateToken, userDeleteController.deleteUser.bind(userDeleteController));

userRouter.put('/password/:id',validateToken, updatePasswordController.run.bind(updatePasswordController));

userRouter.put('/validate_delet/:id', validateDeletUserController.run.bind(validateDeletUserController));