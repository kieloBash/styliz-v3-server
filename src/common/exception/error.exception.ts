// common/exceptions/error.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(
    message: string | string[],
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        statusCode: status,
        message,
        error: HttpStatus[status], // e.g., "BAD_REQUEST"
      },
      status,
    );
  }
}
