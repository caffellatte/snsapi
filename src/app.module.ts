import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SnscrapeModule } from './snscrape/snscrape.module';
import { SnscrapeService } from './snscrape/snscrape.service';
import { SnscrapeController } from './snscrape/snscrape.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      {
        dbName: process.env.MONGO_DATABASE,
      },
    ),
    UserModule,
    AuthModule,
    SnscrapeModule,
  ],
  controllers: [AppController, SnscrapeController],
  providers: [AppService, SnscrapeService],
})
export class AppModule {}
