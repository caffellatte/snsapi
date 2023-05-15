import { Test, TestingModule } from '@nestjs/testing';
import { SnscrapeController } from './snscrape.controller';

describe('SnscrapeController', () => {
  let controller: SnscrapeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnscrapeController],
    }).compile();

    controller = module.get<SnscrapeController>(SnscrapeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
