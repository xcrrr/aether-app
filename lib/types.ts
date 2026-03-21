export interface Message {
  id: string;
  role: "user" | "aether";
  content: string;
  timestamp: string;
}

export interface SwarmAgent {
  id: string;
  name: string;
  color: string;
  role: string;
}

export interface SwarmStep {
  id: string;
  agentName: string;
  agentColor: string;
  message: string;
  trustScore?: number;
  trustStatus?: "approved" | "rejected" | "warning";
}

export interface SwarmThreadData {
  id: string;
  messageId: string;
  agentCount: number;
  durationSeconds: number;
  steps: SwarmStep[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  swarmThreads: Record<string, SwarmThreadData>;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

export interface ChatHistorySection {
  label: string;
  items: ChatHistoryItem[];
}

export interface ModelOption {
  id: string;
  name: string;
  subtitle: string;
  dotColor: string;
  isDefault?: boolean;
}
