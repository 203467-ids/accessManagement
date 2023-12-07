import { User } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/userRepository';

export class ValidateDeletUserUseCase {

    constructor(readonly UserRepository: UserRepository) { }

    async run(
        id: number,
        status_delet: string

    ): Promise< User |boolean | null | Error> {
        try {
            if (!id || !status_delet) {
                return null;
            }

            const validateUser = await this.UserRepository.validateDeletUser(id, status_delet);
            if (validateUser === null) {
                return null;
            }

            return validateUser;
        } catch (error) {
            return null;
        }
    }
}