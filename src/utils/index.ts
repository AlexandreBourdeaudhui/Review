/**
 * Package Import
 */
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import { Body } from '../@types';

/**
 *
 */
export const respond = (
  statusCode: number,
  body: Body,
): APIGatewayProxyResult => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body, null, 2),
});
