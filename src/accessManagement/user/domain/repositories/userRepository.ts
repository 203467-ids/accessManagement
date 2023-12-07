
import { User } from "../entities/user";

export interface UserRepository {

    listAllUsers(): Promise<User[] | null>;
    
    createUser(email: String, password: String, status_delet: string,): Promise<User|null>;

    loginUser(email:string, password:string):Promise<User | string | null> 
    
    deleteUser(id: number): Promise<boolean | Error>;
    
    updateUserPassword(id: number, password: string): Promise<User | null | string>

    validateDeletUser( id: number , status_delet: string): Promise< User | boolean | null | Error >;
}
