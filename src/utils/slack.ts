/*
 * Package Import
 */
import axios from 'axios';

/**
 *
 * @param param0
 * @returns
 */
export const slackWrapper = ({ method = 'POST', request, params }) =>
  axios({
    method,
    url: `https://slack.com/api/${request}`,
    headers: { Authorization: `Bearer ${process.env.TOKEN_SLACK}` },
    params,
  });

/**
 *
 * @param params
 * @returns
 */
export const postMessage = (params) =>
  slackWrapper({
    request: 'chat.postMessage',
    params,
  });

/**
 * Send to Slack
 * @param {Array} items
 * @return {Object}
 */
export const setSlackResponse = (statusCode = 200, items) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    response_type: 'in_channel',
    text: items,
  }),
});
