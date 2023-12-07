import { Request, Response } from 'express';
import { UserCreateUseCase } from '../../application/userCreateUseCase';

export class UserCreateController {
    constructor(readonly UserCreateUseCase: UserCreateUseCase) { }

    async run(req: Request, res: Response) {
        console.log('controller');
        console.log(req.body)
        const {
            email,
            password,
        } = req.body;
        const status_delet = 'Activo';
        try {
            
            
            const createUser = await this.UserCreateUseCase.run(
                email,
                password,
                status_delet
            );
            
     
            if (createUser instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: createUser.message,
                });
            }
        
            if (createUser) {

                return res.status(201).send({
                    status: "success",
                    data: {
                        createUser
                    },
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "Se registró un error inesperado mientras se registraban los datos del usuario.",
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
            });
        }
    }
}
