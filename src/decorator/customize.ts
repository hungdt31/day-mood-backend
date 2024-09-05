import { SetMetadata } from '@nestjs/common';

// truyền thêm metadata vào lời gọi hàm
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // key:value
