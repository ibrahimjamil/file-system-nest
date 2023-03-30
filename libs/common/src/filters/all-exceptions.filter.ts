import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(`Error ${statusCode}: ${exception.message}`, exception?.stack);

      response.status(statusCode).json({
        statusCode: statusCode,
        message: 'Internal server error',
      });

      return;
    }
    
    response.status(statusCode).json(exception.response);
  }
}
