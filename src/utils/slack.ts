/*
 * Package Import
 */
import axios, { AxiosResponse } from 'axios';

/**
 * Local Import
 */
import type { ParamsSlack } from '../types/slack';

/**
 * Wrapper call API Slack
 */
export const api = (
  request: string,
  params: ParamsSlack,
): Promise<AxiosResponse> =>
  axios.get(`https://slack.com/api/${request}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_SLACK}`,
    },
    params,
  });

/**
 * Post message
 * @doc https://api.slack.com/methods/chat.postMessage
 */
export const postMessage = (params: ParamsSlack): Promise<AxiosResponse> =>
  api('chat.postMessage', params);

/**
 * Post an ephemeral message
 * @doc https://api.slack.com/methods/chat.postEphemeral
 */
export const ephemeralMessage = (params: ParamsSlack): Promise<AxiosResponse> =>
  api('chat.postEphemeral', params);
