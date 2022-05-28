/**
 * Local Import
 */
import { SlashCommand } from "./slack";

/**
 * Types
 */
export interface IActionParams {
  params: string;
  payload: SlashCommand;
}
