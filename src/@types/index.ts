/**
 * Local Import
 */
import { Method } from 'axios';

/**
 * Types
 */
export interface Body {
  attachments?: { color?: string; footer?: string; mrkdwn_in?: string[] }[];
  message?: string;
  text: string;
  response_type: 'ephemeral' | 'in_channel';
}

export interface Commands {
  usage: string;
  desc: string;
}

export interface Repository {
  repository: string;
}

export interface RepositoryData {
  owner: string;
  repo: string;
  pull_number?: number;
}

export interface PullRequest {
  html_url: string;
  title: string;
}

export interface PayloadSlack {
  method?: Method;
  params: ParamsSlack;
  request: string;
}

export interface ParamsSlack {
  channel: string;
  text: string;
  thread_ts?: string;
}
