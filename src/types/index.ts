/**
 * Package Import Import
 */
import { Method } from 'axios';
import { Endpoints } from '@octokit/types';

/**
 * Slack
 */
export interface SlashCommand {
  token: string;
  command: string;
  text: string;
  response_url: string;
  trigger_id: string;
  user_id: string;
  user_name: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  api_app_id: string;
  enterprise_id?: string;
  enterprise_name?: string;
  // exists for enterprise installs
  is_enterprise_install?: string; // This should be a boolean, but payload for commands gives string 'true'
}

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

/**
 * Github
 */
export type ReviewsParams =
  Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['parameters'];

export type PullRequestParams =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['parameters'];

export type PullRequestData =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];

export type RepositoryData =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

export interface Repositories {
  repository?: string;
}

export interface PullRequest {
  html_url: string;
  title: string;
}
