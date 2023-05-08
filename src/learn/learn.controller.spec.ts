import { Test, TestingModule } from '@nestjs/testing';
import { LearnController } from './learn.controller';

describe('CatsController', () => {
    let controller: LearnController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LearnController],
        }).compile();

        controller = module.get<LearnController>(LearnController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
