import { Request, Response } from "express";
import { ListAllUsersUseCase } from "../../application/listAllUsersUseCase";


export class ListAllUsersController {
    constructor(
        readonly listAllUsersUseCase : ListAllUsersUseCase,
    ){}

    async run(req: Request, res: Response) {
        try {
          const users = await this.listAllUsersUseCase.run();
          console.log(users)
          if (users) {
            return res.status(200).send({
              status: 'success',
              data: users,
              message: 'Lista de usuarios obtenida exitosamente',
              
            });
          }
          //console.log(users)
          return res.status(404).send({
            status: 'error',
            message: 'No se encontraron usuarios',
          });
        } catch (error) {   
            console.error("Error fetching all users:", error);
            return res.status(500).send({
                status: "error",
                data: [],
                message: "Error al recuperar usuarios",
            });
      
      }
}
}