/**
 * @author huang
 * @date 2023-10-20
 * 自定义装饰器 使部分 endpoint 跳过 jwt 认证
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwt = () => SetMetadata(IS_PUBLIC_KEY, true);
