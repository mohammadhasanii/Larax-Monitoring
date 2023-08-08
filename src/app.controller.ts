import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { LogAnalyzerService } from './log-analyzer/log-analyzer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logAnalyzerService: LogAnalyzerService) { }



  @Get('status')
  async analyzeLog(): Promise<{ startTime: string; requestCount: number }[]> {
    const logFilePath = 'requests.txt';
    const requestCounts = await this.logAnalyzerService.analyzeLog(logFilePath);
    return requestCounts
  }


  @Get('statistics')
  async statistic() {
    const logFilePath = 'requests.txt';
    const logSummary = this.logAnalyzerService.readLogFile(logFilePath)
    return logSummary;
  }


  @Get()
  @Render('index')
  async renderIndexPage() {
    const logFilePath = 'requests.txt';
    const requestCounts = await this.logAnalyzerService.analyzeLog(logFilePath);
    return {  requestCounts };

  }

  @Get('message')
  async message(){
    return 'hello'
  }

  @Get('metriks')
  async delayedResponse() {
    await new Promise(resolve => setTimeout(resolve, 12000));
    return 'delay response after 12000 seconds';
  }

}
