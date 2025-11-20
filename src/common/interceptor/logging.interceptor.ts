import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, originalUrl } = req;
    const user = req.user?.email || req.user?.id || 'Guest';
    const start = Date.now();

    this.logger.log(`➡️  [START] ${method} ${originalUrl} by ${user}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;

        this.logger.log(
          `✅  [END] ${method} ${originalUrl} | Status: ${statusCode} | Duration: ${duration}ms`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - start;
        const statusCode = error?.status || 500;

        this.logger.error(
          `❌  [ERROR] ${method} ${originalUrl} | Status: ${statusCode} | Duration: ${duration}ms | Message: ${error.message}`,
        );

        if (error.stack) {
          this.logger.verbose(error.stack);
        }

        return throwError(() => error);
      }),
    );
  }
}
