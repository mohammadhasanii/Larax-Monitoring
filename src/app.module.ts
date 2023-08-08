import { Module ,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { LogAnalyzerService } from './log-analyzer/log-analyzer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LogAnalyzerService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }

}
