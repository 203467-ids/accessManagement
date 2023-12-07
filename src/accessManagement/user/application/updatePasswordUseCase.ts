import { User } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/userRepository';

export class UpdatePasswordUseCase {
    constructor(readonly UserRepository: UserRepository) { }

    async run(
        id: number,
        password: string,
    ): Promise<User | null | string> {
        try {
            const update = await this.UserRepository.updateUserPassword(id, password);

            return update;
        } catch (error) {
            return null;
        }
    }
}