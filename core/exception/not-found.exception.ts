import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = HttpStatus.NOT_FOUND) {
    super(message);
    this.statusCode = statusCode;
  }
}
