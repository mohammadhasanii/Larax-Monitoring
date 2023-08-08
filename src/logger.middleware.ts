import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        fs.appendFile('requests.txt', `Time:${new Date().toISOString()} - Method: ${req.method} - Url: ${req.originalUrl} - ResponseTime:${elapsed}ms -StatusCode:${res.statusCode} \n`, (err) => {
            if (err) {
              console.error(err);
            }
          });
    
      });
  

    next();
  }
}
