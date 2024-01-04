import { Response } from 'express';

export class GeneratorResponse<T> {
  public successResponse(
    res: Response,
    data: T,
    message?: string,
    detail?: string,
    statusCode?: number,
  ) {
    return res.status(statusCode ?? 200).send({
      data,
      message: message ?? 'OK',
      detail: detail ?? 'Success',
      statusCode: statusCode ?? 200,
    });
  }

  public successArrayResponse(
    res: Response,
    data: T[],
    message?: string,
    detail?: string,
    statusCode?: number,
  ) {
    return res.status(statusCode ?? 200).send({
      data,
      message: message ?? 'OK',
      detail: detail ?? 'Success',
      statusCode: statusCode ?? 200,
    });
  }

  public successPageResponse(
    res: Response,
    data: [T[], number],
    message?: string,
    detail?: string,
    statusCode?: number,
    page?: string,
    limit?: string,
  ) {
    const result = data[0];
    const total = data[1];
    const totalPage = Math.ceil(total / parseInt(limit));
    res.status(statusCode ?? 200);
    return res.send({
      data: result,
      total,
      totalPage,
      currentPage: parseInt(page),
      message: message ?? 'OK',
      detail: detail ?? 'Success',
      statusCode: statusCode ?? 200,
    });
  }

  public failedResponse(
    res: Response,
    data: T,
    message?: string,
    detail?: string,
    statusCode?: number,
  ) {
    return res.status(statusCode ?? 500).send({
      data,
      message: message ?? 'Failed',
      detail: detail ?? 'Failed',
      statusCode: statusCode ?? 500,
    });
  }
}
