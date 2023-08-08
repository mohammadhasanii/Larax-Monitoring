import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as fs from 'fs-extra';


interface LogSummary {
  requestCount: number;
  maxResponseTime: number;
  averageResponseTime: number;
}

@Injectable()
export class LogAnalyzerService {




  async  analyzeLog(logFilePath: string): Promise<{ startTime: string; requestCount: number }[]> {
    const logContent = await fs.readFile(logFilePath, 'utf-8');
    const logLines = logContent.split('\n');
  
    const requestCounts: { startTime: string; requestCount: number }[] = [];
    let currentTimestamp = moment().subtract(1, 'hour').startOf('hour'); // زمان فعلی منها یک ساعت
    let requestCount = 0;
  
    for (const line of logLines) {
      if (line.trim() !== '') {
        const timestampMatch = line.match(/Time:(.*?)\s/);
        if (timestampMatch && timestampMatch[1]) {
          const timestamp = moment(timestampMatch[1]);
          if (timestamp.isAfter(currentTimestamp)) {
            const diffMinutes = Math.floor(timestamp.diff(currentTimestamp, 'minutes') / 5); // بازه‌های 5 دقیقه‌ای
            for (let i = 0; i < diffMinutes; i++) {
              requestCounts.push({ startTime: currentTimestamp.format('HH:mm'), requestCount });
              currentTimestamp = currentTimestamp.add(5, 'minutes'); // افزودن 5 دقیقه به زمان فعلی
              requestCount = 0; // بازنشانی تعداد رکوئست‌ها
            }
            requestCount++;
          }
        }
      }
    }
  
    requestCounts.push({ startTime: currentTimestamp.format('HH:mm'), requestCount });
  
    return requestCounts;
  }




      


   
   
      async  readLogFile(file_path: string) {
        try {
          file_path='requests.txt'
          const logFileContent = await fs.promises.readFile(file_path, 'utf-8');
          const logLines = logFileContent.split('\n');
          let totalResponseTime = 0;
          let maxResponseTime = 0;
          let requestCount = 0;
          
          const currentTime = new Date();
          const fiveSecondsAgo = new Date(currentTime.getTime() - 5000);
          let recentLogsCount = 0;

          for (const line of logLines) {
            if (line.includes('Time:')) {
              const logTime = new Date(line.split(' - ')[0].split('Time:')[1]);
              
              if (logTime >= fiveSecondsAgo && logTime <= currentTime) {
                recentLogsCount++;
              }
            }
          }
        

          
      
          for (const line of logLines) {
            if (line.includes('ResponseTime')) {
              const responseTime = parseInt(line.split('ResponseTime:')[1].split('ms')[0]);
              totalResponseTime += responseTime;
              maxResponseTime = Math.max(maxResponseTime, responseTime);
              requestCount++;
            }
          }
      
          const averageResponseTime = totalResponseTime / requestCount;
      
          return  {requestCount,averageResponseTime,maxResponseTime,recentLogsCount}
        } catch (error) {
          console.error('Error reading the log file:', error);
        }
      }
      
      
      


    









}
