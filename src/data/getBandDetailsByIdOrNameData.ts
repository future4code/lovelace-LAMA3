import { connection } from "./databaseConnection/connection";

export const getBandDetailsByIdOrNameData = async (id: string, name: string) => {

  const result = await connection.raw(`
  SELECT * FROM NOME_TABELA_BANDAS WHERE id = "${id}" OR name = "${name}"; `)
  return result[0]
}

