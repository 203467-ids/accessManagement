import bcrypt from 'bcrypt'; 

export const encrypt = async (textPlain:string) => {
    const hash = await bcrypt.hash(textPlain, 9)
    return hash
}

export const compare = async (passwordPlain:string, passwordHash:string) => {
    return await bcrypt.compare(passwordPlain, passwordHash)
}