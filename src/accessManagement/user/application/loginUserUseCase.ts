import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";


export class LoginUserUseCase {
    constructor(readonly usuarioRepository: UserRepository) {}
    
    async run(
        email:string,
        password:string

    ): Promise<User | string | null> {
        

        try {
            const loginUser = await this.usuarioRepository.loginUser(email,password)
            return loginUser;
        } catch (error) {
            return null;
        }
    }
}