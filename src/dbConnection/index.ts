import sql, {ConnectionPool, config} from "mssql";

export class DBConn {
  ready: boolean = false;
  error: string = "";
  conn: ConnectionPool | null = null;
  conf: config | null = null;
  dbName: "RanGame1" | "RanLog" | "RanUser" | "RanShop" = "RanGame1";

  constructor (dbName: "RanGame1" | "RanLog" | "RanUser" | "RanShop") {
    this.conf = {
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: dbName,
      server: `${process.env.DB_SERVER}`,
      port: parseInt(process.env.DB_PORT!),
      pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
    this.dbName = dbName;
  }

  async connect() {
    // Connect
    await new Promise((res, rej) => {
      const pool = new ConnectionPool(this.conf!);
      pool.connect().then((pool) => {
        this.ready = true;
        this.conn = pool;
        res(pool);
      }).catch((reason) => {
        this.error = reason.code;
        rej(reason)
      });
    })
  }

  async close() {
    await this.conn?.close();
  }
}