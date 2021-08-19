/**
 * Package Import
 */
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Types
 */
export interface Body {
  attachments?: { color?: string; footer?: string; mrkdwn_in: string[] }[];
  message?: string;
  text: string;
  response_type: 'ephemeral' | 'in_channel';
}

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
