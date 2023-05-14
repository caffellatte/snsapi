import { Module } from '@nestjs/common';
import { SNScrapeService } from 'src/snscrape.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SNScrapeService],
})
export class AppModule {}
