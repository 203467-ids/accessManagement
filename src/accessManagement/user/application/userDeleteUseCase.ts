import { UserRepository } from "../domain/repositories/userRepository";

export class UserDeleteUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async run(id: number): Promise<boolean | Error> {
        console.log(id)
        try {
            console.log(this.userRepository.deleteUser)
            const deleted = await this.userRepository.deleteUser(id);
            console.log(deleted)
            if (deleted) {
                return true;
            } else {
                throw new Error(`No se pudo eliminar el usuario con el ID ${id}.`);
            }
        } catch (error) {
            console.error(`Error al eliminar el usuario con el ID ${id}:`, error);
            throw error;
        }
    }
}