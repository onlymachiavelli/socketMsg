import { DataSource } from "typeorm"
import { DBCONFIG } from "../types/dbconfig"

console.log("the host is: ", process.env.HOSTNAME)
const config: DBCONFIG = {
  host: process.env.HOSTNAME as string,
  port: Number(process.env.PORT_DB),
  username: process.env.USER as string,
  password: "",
  database: process.env.DATABASE as string,
}

const appDataSource = new DataSource({
  type: "mysql",
  ...config,

  entities: [__dirname + "/../models/*.ts"],
  synchronize: true,
})

export default appDataSource
