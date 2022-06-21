import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mssql: {
      dbName: process.env.MSSQL_DATABASE,
      port: parseInt(process.env.MSSQL_PORT, 10),
      password: process.env.MSSQL_PASSWORD,
      user: process.env.MSSQL_USERNAME,
      host: process.env.MSSQL_HOST,
      dropSchema: false,
      synchronize: process.env.SYNCHRONIZE === 'false' ? false : true,
      extra: { trustServerCertificate: true },
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtTime: process.env.JWT_TIME,
  };
});
