/**
 * Types
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

export interface SlackBlock {
  type: string;
  text: {
    type: string;
    text: string;
  };
}

export type SlackBlocks = Array<SlackBlock>;

export interface ResponseSlack {
  attachments?: { color?: string; footer?: string; mrkdwn_in?: string[] }[];
  message?: string;
  text: string;
  response_type: 'ephemeral' | 'in_channel';
}

export interface Commands {
  usage: string;
  desc: string;
}

export interface ParamsSlack {
  blocks?: SlackBlocks;
  channel: string;
  text?: string;
  thread_ts?: string;
}