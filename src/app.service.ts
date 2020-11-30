import { Injectable } from '@nestjs/common';
let serverUpDate = new Date();
@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World From nestjs! serverUp = ${serverUpDate}`;
  }
}
