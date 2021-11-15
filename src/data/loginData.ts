import { connection } from "../data/databaseConnection/connection";

export const loginData = async (email: string) => {
   const result = await connection("NOME_TABELAS_USUÁRIOS").where({email})
      
   return result

}