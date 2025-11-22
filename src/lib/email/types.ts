/**
 * Email System - Types
 */

export interface EmailData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

