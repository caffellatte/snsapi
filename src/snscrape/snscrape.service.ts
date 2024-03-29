import { Injectable } from '@nestjs/common';
import { execAsPromise, processMultilineJSON } from 'src/utils';

interface GlobalOptions {
  jsonl?: boolean;
  withEntity?: boolean;
  maxResults?: number;
}

interface RunScraperParams {
  scraperName: string;
  globalOptions: GlobalOptions;
  scraperOptions: string[];
}

const getGlobalOptionsString = ({
  jsonl,
  withEntity,
  maxResults,
}: GlobalOptions) =>
  `${jsonl ? '--jsonl ' : ''}${withEntity ? '--with-entity ' : ''}${
    typeof maxResults !== 'undefined' ? `--max-results ${maxResults}` : ''
  }`;

@Injectable()
export class SnscrapeService {
  getIndex(): string {
    return 'https://github.com/caffellatte/snsapi';
  }

  async getHelp(): Promise<string> {
    const result = await execAsPromise(`snscrape --help`);
    return result;
  }

  async getScraperHelp(scraperName: string): Promise<string> {
    const result = await execAsPromise(`snscrape ${scraperName} --help`);
    return result;
  }

  async runScraper({
    scraperName,
    globalOptions,
    scraperOptions,
  }: RunScraperParams): Promise<string> {
    const result = await execAsPromise(
      `snscrape ${getGlobalOptionsString(
        globalOptions,
      )} ${scraperName} ${scraperOptions.join('')}`,
    );
    return processMultilineJSON(result);
  }
}
