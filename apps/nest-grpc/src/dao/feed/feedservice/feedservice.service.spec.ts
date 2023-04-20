import { Test, TestingModule } from '@nestjs/testing';
import { FeedserviceService } from './feedservice.service';

describe('FeedserviceService', () => {
  let service: FeedserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedserviceService],
    }).compile();

    service = module.get<FeedserviceService>(FeedserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
