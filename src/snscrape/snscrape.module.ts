import { Module } from '@nestjs/common';
import { SnscrapeController } from './snscrape.controller';
import { SnscrapeService } from './snscrape.service';

@Module({
  controllers: [SnscrapeController],
  providers: [SnscrapeService],
})
export class SnscrapeModule {}
