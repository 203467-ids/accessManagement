import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";


export class ListAllUsersUseCase {
    constructor(readonly userRepository: UserRepository){}

    async run(): Promise<User[]|null> {
        try {
        const users = await this.userRepository.listAllUsers();
        return users;
        } catch (error) {
            return null;
        }
    }
}