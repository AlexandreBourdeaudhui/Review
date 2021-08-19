/*
 * Package Import
 */
import axios, { AxiosResponse } from 'axios';

/**
 * Local Import
 */
import { PayloadSlack, ParamsSlack } from '../@types';

/**
 * Wrapper call API Slack
 */
export const slackWrapper = ({
  method = 'POST',
  params,
  request,
}: PayloadSlack): Promise<AxiosResponse> =>
  axios({
    method,
    url: `https://slack.com/api/${request}`,
    headers: { Authorization: `Bearer ${process.env.TOKEN_SLACK}` },
    params,
  });

/**
 * Post message
 * @doc https://api.slack.com/methods/chat.postMessage
 */
export const postMessage = (params: ParamsSlack): Promise<AxiosResponse> =>
  slackWrapper({
    request: 'chat.postMessage',
    params,
  });

/**
 * Post an ephemeral message
 * @doc https://api.slack.com/methods/chat.postEphemeral
 */
export const ephemeralMessage = (params: ParamsSlack): Promise<AxiosResponse> =>
  slackWrapper({
    request: 'chat.postEphemeral',
    params,
  });
