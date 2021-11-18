import { connection } from "../data/databaseConnection/connection";

export const signUpData = async (id: string, name: string, email: string, password: string, role:string) => {
    await connection().
        insert
        ({
            id,
            name,
            email,
            password,
            role
        }).into("NOME_TABELAS_USUÁRIOS")

}