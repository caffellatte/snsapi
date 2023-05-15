import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SnscrapeService } from './snscrape.service';
import { formatPreHTML } from 'src/utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('snscrape')
export class SnscrapeController {
  constructor(private readonly snscrapeService: SnscrapeService) {}

  @Get()
  getIndex(): string {
    const response = this.snscrapeService.getIndex();
    return formatPreHTML(response);
  }

  @Get('/help')
  async getHelp(): Promise<string> {
    const response = await this.snscrapeService.getHelp();
    return formatPreHTML(response);
  }

  @Get(':scraperName/help')
  async getScraperHelp(
    @Param('scraperName') scraperName: string,
  ): Promise<string> {
    const response = await this.snscrapeService.getScraperHelp(scraperName);
    return formatPreHTML(response);
  }

  @Get(':scraperName/:scraperOptions(*)')
  async getScraperResult(
    @Param('scraperName') scraperName: string,
    @Param('scraperOptions', new ParseArrayPipe({ separator: '/' }))
    scraperOptions: string[],
    @Query('jsonl') jsonlParam?: boolean,
    @Query('entity') withEntityParam?: boolean,
    @Query('max') maxResultsParam?: string,
  ): Promise<string> {
    const jsonl = typeof jsonlParam !== 'undefined';
    const withEntity = typeof withEntityParam !== 'undefined';
    const maxResults =
      maxResultsParam !== ''
        ? !isNaN(Number(maxResultsParam))
          ? Number(maxResultsParam)
          : 1
        : undefined;

    const response = await this.snscrapeService.runScraper({
      scraperName,
      globalOptions: { jsonl, withEntity, maxResults },
      scraperOptions,
    });
    return `[${response}]`;
  }
}
