import { Request, Response } from "express";
import { UpdatePasswordUseCase } from "../../application/updatePasswordUseCase";
import { User } from '../../domain/entities/user';

export class UpdatePasswordController {
    constructor(readonly updatePasswordUseCase: UpdatePasswordUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {password} = req.body

            const updatedUser = await this.updatePasswordUseCase.run(parseInt(id), password);

            if (updatedUser) {
                return res.status(201).send({
                    status: "success",
                    message: "Contraseña actualizada con éxito",
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "No se encontró o no se puede actualizar la contraseña",
                });
            }
        } catch (error) {
            console.error("Error update status:", error);
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar la contraseña: ", error,
            });
        }
    }
}