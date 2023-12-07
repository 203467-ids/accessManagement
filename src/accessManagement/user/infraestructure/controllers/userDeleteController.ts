import { Request, Response } from 'express';
import { UserDeleteUseCase } from '../../application/userDeleteUseCase';

export class UserDeleteController {
    constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.userDeleteUseCase.run(parseInt(id));

            if (isDeleted) {
                res.status(200).json({ message: 'Usuario eliminado.' });
            } else {
                res.status(404).json({ error: 'Usuario no encontrado o no autorizado para eliminar.' });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Error al eliminar el usuario.' });
        }
    }
}