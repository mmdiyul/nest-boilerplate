import { HttpStatus } from '@nestjs/common';

export class ExistsException extends Error {
  statusCode: number;
  constructor(field: string, statusCode: number = HttpStatus.BAD_REQUEST) {
    super(`${field} is Exists`);
    this.statusCode = statusCode;
  }
}
