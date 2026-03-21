import type {
  Conversation,
  ChatHistorySection,
  ModelOption,
  SwarmThreadData,
} from "./types";

export const agents = {
  core: { id: "core", name: "Core", color: "#7F77DD", role: "orchestrator" },
  alpha1: { id: "alpha1", name: "Alpha-1", color: "#378ADD", role: "creative" },
  alpha2: { id: "alpha2", name: "Alpha-2", color: "#534AB7", role: "analyst" },
  syntax: { id: "syntax", name: "Syntax", color: "#E24B4A", role: "auditor" },
  sandbox: {
    id: "sandbox",
    name: "Sandbox",
    color: "#0E9149",
    role: "executor",
  },
} as const;

const swarmThread1: SwarmThreadData = {
  id: "swarm-1",
  messageId: "msg-2",
  agentCount: 4,
  durationSeconds: 2.3,
  steps: [
    {
      id: "s1-1",
      agentName: "Core",
      agentColor: "#7F77DD",
      message: "Routing query to research pipeline",
    },
    {
      id: "s1-2",
      agentName: "Alpha-1",
      agentColor: "#378ADD",
      message: "Generating initial response draft",
      trustScore: 44,
      trustStatus: "rejected",
    },
    {
      id: "s1-3",
      agentName: "Syntax",
      agentColor: "#E24B4A",
      message: "Flagged factual inconsistency in paragraph 2 — revising",
      trustScore: 61,
      trustStatus: "warning",
    },
    {
      id: "s1-4",
      agentName: "Alpha-1",
      agentColor: "#378ADD",
      message: "Revised response with corrected sourcing",
      trustScore: 92,
      trustStatus: "approved",
    },
    {
      id: "s1-5",
      agentName: "Sandbox",
      agentColor: "#0E9149",
      message: "Verified code examples execute correctly",
      trustScore: 98,
      trustStatus: "approved",
    },
  ],
};

const swarmThread2: SwarmThreadData = {
  id: "swarm-2",
  messageId: "msg-4",
  agentCount: 3,
  durationSeconds: 1.8,
  steps: [
    {
      id: "s2-1",
      agentName: "Core",
      agentColor: "#7F77DD",
      message: "Evaluating complexity — routing to dual-agent pipeline",
    },
    {
      id: "s2-2",
      agentName: "Alpha-2",
      agentColor: "#534AB7",
      message: "Analyzing architectural trade-offs",
      trustScore: 87,
      trustStatus: "approved",
    },
    {
      id: "s2-3",
      agentName: "Syntax",
      agentColor: "#E24B4A",
      message: "Auditing response for completeness",
      trustScore: 94,
      trustStatus: "approved",
    },
  ],
};

const swarmThread3: SwarmThreadData = {
  id: "swarm-3",
  messageId: "msg-6",
  agentCount: 5,
  durationSeconds: 3.1,
  steps: [
    {
      id: "s3-1",
      agentName: "Core",
      agentColor: "#7F77DD",
      message: "Full swarm activation — multi-domain query detected",
    },
    {
      id: "s3-2",
      agentName: "Alpha-1",
      agentColor: "#378ADD",
      message: "Drafting creative approach to explanation",
      trustScore: 76,
      trustStatus: "warning",
    },
    {
      id: "s3-3",
      agentName: "Alpha-2",
      agentColor: "#534AB7",
      message: "Cross-referencing technical accuracy",
      trustScore: 88,
      trustStatus: "approved",
    },
    {
      id: "s3-4",
      agentName: "Sandbox",
      agentColor: "#0E9149",
      message: "Running validation on all examples",
      trustScore: 95,
      trustStatus: "approved",
    },
    {
      id: "s3-5",
      agentName: "Syntax",
      agentColor: "#E24B4A",
      message: "Final audit passed — response cleared",
      trustScore: 97,
      trustStatus: "approved",
    },
  ],
};

export const mockConversation: Conversation = {
  id: "conv-1",
  title: "Understanding transformer architectures",
  messages: [
    {
      id: "msg-1",
      role: "user",
      content:
        "Can you explain how self-attention works in transformer models? I want to understand the intuition, not just the math.",
      timestamp: "10:24 AM",
    },
    {
      id: "msg-2",
      role: "aether",
      content:
        "Self-attention is essentially a way for each word in a sentence to look at every other word and decide which ones are most relevant to understanding its own meaning.\n\nImagine you're reading the sentence: \"The cat sat on the mat because it was tired.\" When you read \"it\", your brain automatically connects it back to \"cat\" — not \"mat\". Self-attention does the same thing computationally.\n\nEach word creates three vectors: a Query (what am I looking for?), a Key (what do I contain?), and a Value (what information do I share?). The attention score between any two words is the dot product of one word's Query with another's Key. High scores mean high relevance.\n\nThe beauty is that this happens in parallel for all words simultaneously — no sequential processing needed. That's what makes transformers so much faster than RNNs for training.",
      timestamp: "10:24 AM",
    },
    {
      id: "msg-3",
      role: "user",
      content:
        "That makes sense. How does multi-head attention improve on basic self-attention?",
      timestamp: "10:26 AM",
    },
    {
      id: "msg-4",
      role: "aether",
      content:
        "Multi-head attention is like having multiple perspectives on the same sentence.\n\nWith single-head attention, the model learns one set of Query/Key/Value projections — essentially one way to look at relationships. But language is nuanced. In \"The animal didn't cross the street because it was too wide\", the word \"it\" relates to \"street\" semantically (width), but to \"animal\" syntactically (subject reference).\n\nMulti-head attention runs several attention operations in parallel, each with its own learned Q/K/V weight matrices. One head might specialize in syntactic relationships, another in semantic similarity, another in positional proximity. Their outputs are concatenated and linearly projected.\n\nIn practice, 8-16 heads is common. Research shows different heads genuinely learn different linguistic patterns — some track coreference, others dependency parsing, others attend to adjacent tokens.",
      timestamp: "10:26 AM",
    },
    {
      id: "msg-5",
      role: "user",
      content:
        "What about positional encoding? How does the model know word order without recurrence?",
      timestamp: "10:28 AM",
    },
    {
      id: "msg-6",
      role: "aether",
      content:
        'Since self-attention treats the input as a set (it\'s permutation-equivariant), positional information must be injected explicitly. The original Transformer paper used sinusoidal positional encodings — fixed functions of different frequencies for each dimension.\n\nThe intuition: each position gets a unique "fingerprint" of sine and cosine values at different frequencies. This lets the model learn relative positions because the difference between any two positional encodings is itself a function of their distance.\n\nModern architectures have moved beyond fixed encodings. Rotary Position Embeddings (RoPE), used in LLaMA and many recent models, directly encode relative position into the attention computation by rotating query and key vectors. This has better extrapolation to longer sequences than the original approach.\n\nALiBi (Attention with Linear Biases) takes yet another approach — directly biasing attention scores based on distance, with no learned or fixed embeddings at all.',
      timestamp: "10:28 AM",
    },
  ],
  swarmThreads: {
    "msg-2": swarmThread1,
    "msg-4": swarmThread2,
    "msg-6": swarmThread3,
  },
};

export const cannedResponse = {
  id: "msg-canned",
  role: "aether" as const,
  content:
    "That's a great question. Let me think about this carefully and break it down for you.\n\nThe key insight is that understanding comes from building intuition layer by layer, starting from the fundamentals and connecting them to what you already know. I'd recommend exploring this topic further by experimenting with small examples first.",
  timestamp: "Now",
};

export const chatHistory: ChatHistorySection[] = [
  {
    label: "Today",
    items: [
      {
        id: "conv-1",
        title: "Understanding transformer architectures",
        timestamp: "10:24 AM",
      },
      {
        id: "conv-2",
        title: "Rust ownership model explained",
        timestamp: "9:15 AM",
      },
      {
        id: "conv-3",
        title: "Designing a zero-trust auth system",
        timestamp: "8:02 AM",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "conv-4",
        title: "React server components deep dive",
        timestamp: "4:30 PM",
      },
      {
        id: "conv-5",
        title: "Building a custom tokenizer",
        timestamp: "11:20 AM",
      },
    ],
  },
  {
    label: "This week",
    items: [
      {
        id: "conv-6",
        title: "Distributed systems consensus",
        timestamp: "Mar 18",
      },
      {
        id: "conv-7",
        title: "WebGPU compute shaders tutorial",
        timestamp: "Mar 17",
      },
    ],
  },
];

export const modelOptions: ModelOption[] = [
  {
    id: "aether-prime",
    name: "Aether-Prime",
    subtitle: "micro-seed",
    dotColor: "var(--green-primary)",
    isDefault: true,
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.6",
    subtitle: "",
    dotColor: "var(--violet-primary)",
  },
  {
    id: "claude-opus",
    name: "Claude Opus 4.6",
    subtitle: "",
    dotColor: "var(--violet-primary)",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    subtitle: "",
    dotColor: "var(--text-tertiary)",
  },
];

export const suggestionChips = [
  "Explain how neural networks learn",
  "Help me design a distributed system",
  "Write a Rust async runtime from scratch",
  "Compare React Server Components vs SSR",
];
