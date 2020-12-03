import { Controller, Get, Sse, MessageEvent, Req, Res,  } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { Observable, interval, Subject } from 'rxjs';
import { map  } from 'rxjs/operators';
@Controller()
export class AppController {
  private variableUpdatedSource = new Subject<any>();
  variableUpdated$ = this.variableUpdatedSource.asObservable();

  constructor(private readonly appService: AppService) {
    
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => {
      return { data: { hello: 'world' } }
    }));
  }

  @Sse('sse2')
  @OnEvent('api.called')
  sse2(): Observable<MessageEvent> {
    return this.variableUpdated$;
  }

  @Get('call')
  call() {
    this.variableUpdatedSource.next({ data: new Date() });
    return 'Api called';
  }
}
