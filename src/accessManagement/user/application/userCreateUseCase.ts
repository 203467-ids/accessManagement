import { User } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/userRepository';
import { encrypt } from "../../helpers/hash";

export class UserCreateUseCase {

    constructor(readonly userRepository: UserRepository) { }

    async run(
        email: string,
        password: string,
        status_delet: string,
    ): Promise<User | null | number | Error> {

        const hashPassword = await encrypt(password)

        try {
            if (!email || !hashPassword || !status_delet) {
                return null;
            }

            const registerUser = await this.userRepository.createUser(email, hashPassword,status_delet);

            if (registerUser === null) {
                return null;
            }

            return registerUser;
        } catch (error) {
            return null;
        }
    }
}