export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'personal' | 'career' | 'lifestyle' | 'finance' | 'technology';
  createdBy: string;
  createdAt: Date;
  deadline?: Date;
  status: 'active' | 'closed' | 'draft';
  votes: Vote[];
  discussions: Discussion[];
  aiInsights?: AIInsight;
  tags: string[];
}

export interface Vote {
  id: string;
  userId: string;
  decisionId: string;
  option: 'yes' | 'no' | 'maybe';
  reasoning?: string;
  confidence: number; // 1-10
  createdAt: Date;
}

export interface Discussion {
  id: string;
  decisionId: string;
  userId: string;
  content: string;
  type: 'pro' | 'con' | 'neutral' | 'question';
  createdAt: Date;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  discussionId: string;
  userId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface AIInsight {
  id: string;
  decisionId: string;
  summary: string;
  pros: string[];
  cons: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  recommendations: string[];
  generatedAt: Date;
}