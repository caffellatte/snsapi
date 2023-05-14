import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { SNScrapeService } from 'src/snscrape.service';
import { formatPreHTML } from 'src/utils';

@Controller()
export class AppController {
  constructor(private readonly sNScrapeService: SNScrapeService) {}

  @Get(':scraperName/help')
  async getScraperHelp(
    @Param('scraperName') scraperName: string,
  ): Promise<string> {
    const response = await this.sNScrapeService.getScraperHelp(scraperName);
    return formatPreHTML(response);
  }

  // eslint-disable-next-line prettier/prettier
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

    const response = await this.sNScrapeService.runScraper({
      scraperName,
      globalOptions: { jsonl, withEntity, maxResults },
      scraperOptions,
    });
    return formatPreHTML(response);
  }
}
