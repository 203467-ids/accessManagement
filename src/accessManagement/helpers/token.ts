import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();

interface TokenPayload {
    id: number;
    email: string;
}

const secretKey:any=process.env.SECRET_JWT


export const tokenSigIn = (id:number, email:string ): string => {

    return jwt.sign(
        {
            id: id,
            email: email
        },
        secretKey,
        {
            expiresIn: '5m'
        }
    );
}

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, secretKey) as TokenPayload;
    } catch (error) {
        return null;
    }
}