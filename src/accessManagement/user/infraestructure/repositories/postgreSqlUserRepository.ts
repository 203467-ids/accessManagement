import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import { compare, encrypt } from '../../../helpers/hash';
import { tokenSigIn } from "../../../helpers/token";
import { UserModel } from "../../infraestructure/models/userModel"


export class UserRepositoryImpl implements UserRepository{
    
    listAllUsers(): Promise<User[] | null> {
        return UserModel.findAll();
    }

    createUser(email: String, password: String, status_delet: String): Promise<User | null> {
        return UserModel.create({
         email,
         password,
         status_delet
        });
    }

    async loginUser(email: string, password: string): Promise<string | null> {
        try {
            const user = await UserModel.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return null; 
            }

            const passwordMatches = await compare(password, user.password);

            if (!passwordMatches) {
                return 'Unauthorized'; 
            }
            const token: string = tokenSigIn(user.id, user.email);
            return token;

        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    }

    deleteUser(userId: number): Promise<boolean> {
        return UserModel.destroy({
            where: {
                id: userId
            }
        }).then((deletedRows) => {
            return deletedRows > 0;
        });
    }

    async updateUserPassword(id: number, password: string): Promise<User | null | string> {
        try {

            const hashPassword = await encrypt(password);
    
            const [affectedRows] = await UserModel.update(
                { password: hashPassword },
                {
                    where: {
                        id: id
                    }
                }
            );
    
            if (affectedRows === 0) {
                return null;
            }

            const updatedUser = await UserModel.findOne({
                where: {
                    id: id
                }
            });
    
            return updatedUser || null;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    async validateDeletUser(id: number, status_delet: string): Promise<User | boolean | null | Error> {
        return UserModel.update(
            { status_delet },
            { where: { id } }
        )
            .then(([updatedRows]) => {
                if (updatedRows > 0) {
                    return UserModel.findOne({ where: { id } });
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error actualizando al artista:', error);
                return error;
            });
    }
}