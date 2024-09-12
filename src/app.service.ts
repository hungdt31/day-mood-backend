import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloVersion1(): string {
    return 'Tự học Nestjs từ zero đến hero';
  }

  getHelloVersion2(): string {
    return 'This version will be developed soon.';
  }
}
