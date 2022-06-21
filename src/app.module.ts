import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from '@nestjs/axios';
import { ProfilesModule } from './profiles/profiles.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TIME: Joi.string().required(),
      }),
    }),
    HttpModule,
    DatabaseModule,
    ProfilesModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
