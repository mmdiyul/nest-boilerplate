import { HttpStatus } from '@nestjs/common';

export class GenericException extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}
