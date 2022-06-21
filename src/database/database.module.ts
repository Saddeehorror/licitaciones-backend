import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          user,
          host,
          dbName,
          password,
          port,
          extra,
          dropSchema,
          synchronize,
        } = configService.mssql;
        return {
          type: 'mssql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          dropSchema: dropSchema,
          synchronize: synchronize,
          autoLoadEntities: true,
          extra,
          //subscribers: [NotificationSubscriber],
          //logger: 'advanced-console',
          logging: 'all',
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
