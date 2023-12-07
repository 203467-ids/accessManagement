/*import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../application/userGetUseCase';

export class UserGetController {
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    async getUserById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;

            // Validar el ID del usuario aquí si es necesario...

            // Ejecutar el caso de uso para obtener el usuario por su ID
            const user = await this.getUserByIdUseCase.execute(Number(id));

            // Manejar el resultado de la operación de lectura
            if (user) {
                response.status(200).json(user);
            } else {
                response.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            // Manejar errores y enviar una respuesta de error al cliente
            console.error('Error al obtener el usuario por ID:', error);
            response.status(error.http_status || 500).json({
                message: 'Error while fetching user',
                error: error.message || 'Internal Server Error',
            });
        }
    }
}*/
