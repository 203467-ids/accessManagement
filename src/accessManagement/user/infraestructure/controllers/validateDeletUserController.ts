import { Request, Response } from "express";
import { ValidateDeletUserUseCase } from "../../application/validateDeletUserUseCase";
import { ValidationError } from "sequelize";

export class ValidateDeletUserController {
    constructor(readonly validateDeletUserUseCase: ValidateDeletUserUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let {
                id
            } = req.params;

            let {
                status_delet
            } = req.body;

            let updatedArtist;

            try {
                updatedArtist = await this.validateDeletUserUseCase.run(parseInt(id), status_delet);
            } catch (error) {
                if (error instanceof ValidationError) {
                    const errors = error.errors.map((validationError) => ({
                        message: validationError.message,
                        type: validationError.type,
                        path: validationError.path,
                        value: validationError.value,
                    }));

                    return res.status(400).json({
                        status: "error",
                        message: "Error de validación",
                        errors,
                    });
                }

                throw error;
            }

            return res.status(201).json({
                status: "success",
                message: "Estado modificado con éxito",
                updatedArtist,
            });
        } catch (error) {
            console.error("Error update status:", error);
            return res.status(500).json({
                status: "error",
                message: "Error al modificar el estado",
            });
        }
    }
}
