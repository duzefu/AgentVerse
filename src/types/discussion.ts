// 基础消息类型
export interface BaseMessage {
  id: string;
  discussionId: string;
  agentId: string;
  timestamp: Date;
  type: string;
}

// 普通消息
export interface NormalMessage extends BaseMessage {
  type: "text" | "image" | "audio" | "video";
  content: string;
  mentions?: string[];    // 被 @ 的 agentId 列表
  replyTo?: string;      // 回复某条消息的ID
}

// Action执行结果消息
export interface ActionResultMessage extends BaseMessage {
  type: "action_result";
  originMessageId: string;  // 关联到触发action的原始消息
  results: Array<{
    operationId: string;    // 关联到具体的 action 操作
    capability: string;
    description: string;    // GPT生成的操作描述
    params: Record<string, unknown>;
    status: 'success' | 'error';
    result?: unknown;
    error?: string;
  }>;
}

// 带有 action 结果的消息
export interface MessageWithResults extends NormalMessage {
  actionResults?: {
    [operationId: string]: {
      capability: string;
      description: string;  // GPT生成的操作描述
      params: Record<string, unknown>;
      status: 'success' | 'error';
      result?: unknown;
      error?: string;
    }
  }
}

export type AgentMessage = NormalMessage | ActionResultMessage;

export interface Discussion {
  id: string;
  title: string;
  topic: string;
  status: "active" | "paused" | "completed";
  settings: DiscussionSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscussionSettings {
  maxRounds: number;
  temperature: number;
  interval: number;
  moderationStyle: "strict" | "relaxed";
  focusTopics: string[];
  allowConflict: boolean;
}
