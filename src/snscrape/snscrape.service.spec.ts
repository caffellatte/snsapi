import { Test, TestingModule } from '@nestjs/testing';
import { SnscrapeService } from './snscrape.service';

describe('SnscrapeService', () => {
  let service: SnscrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnscrapeService],
    }).compile();

    service = module.get<SnscrapeService>(SnscrapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
