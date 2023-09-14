import { Test, TestingModule } from '@nestjs/testing';
import { LearnController } from './learn.controller';

describe('learnController', () => {
    let learnController: LearnController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LearnController],
        }).compile();
        learnController = module.get<LearnController>(LearnController);
    });

    it('should be defined', () => {
        expect(learnController).toBeDefined();
    });
});
