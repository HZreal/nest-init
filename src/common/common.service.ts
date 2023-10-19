import { Injectable } from '@nestjs/common';

/**
 * 单一的功能都可以在这写
 */
@Injectable()
export class CommonService {
    async getUUID(): Promise<string> {
        return '';
    }
}
