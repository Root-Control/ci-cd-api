import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval } from 'rxjs';
import { map  } from 'rxjs/operators';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
