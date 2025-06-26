import { Decision, Vote, Discussion, AIInsight } from '../types';

export const mockDecisions: Decision[] = [
  {
    id: '1',
    title: 'Should I start a tech startup or join a big company?',
    description: 'I\'m a software engineer with 5 years of experience. I have a great startup idea but also received an offer from Google. The startup could be huge but risky, while Google offers stability and great benefits.',
    category: 'career',
    createdBy: '1',
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    status: 'active',
    votes: [
      { id: '1', userId: '2', decisionId: '1', option: 'yes', reasoning: 'Startups offer more learning and growth potential', confidence: 8, createdAt: new Date('2024-01-16') },
      { id: '2', userId: '3', decisionId: '1', option: 'no', reasoning: 'Google provides stability and world-class resources', confidence: 7, createdAt: new Date('2024-01-17') },
      { id: '3', userId: '4', decisionId: '1', option: 'maybe', reasoning: 'Depends on your risk tolerance and financial situation', confidence: 6, createdAt: new Date('2024-01-18') }
    ],
    discussions: [
      {
        id: '1',
        decisionId: '1',
        userId: '2',
        content: 'The startup route offers unlimited potential but comes with high risk. Consider your financial situation and risk tolerance.',
        type: 'pro',
        createdAt: new Date('2024-01-16'),
        likes: 12,
        replies: []
      },
      {
        id: '2',
        decisionId: '1',
        userId: '3',
        content: 'Google will provide incredible learning opportunities, world-class colleagues, and financial stability. You can always start a company later.',
        type: 'con',
        createdAt: new Date('2024-01-17'),
        likes: 8,
        replies: []
      }
    ],
    aiInsights: {
      id: '1',
      decisionId: '1',
      summary: 'This is a classic career decision between security and potential high reward. The community is split but leaning towards the startup option.',
      pros: [
        'Higher potential for financial return and equity',
        'More learning opportunities and diverse responsibilities',
        'Greater autonomy and decision-making power',
        'Potential to build something impactful from the ground up'
      ],
      cons: [
        'Higher risk of failure and financial instability',
        'Less structured environment and resources',
        'Longer working hours and higher stress',
        'Uncertain career progression'
      ],
      sentiment: 'neutral',
      confidence: 0.75,
      recommendations: [
        'Consider your current financial obligations and runway',
        'Evaluate the startup team and market opportunity',
        'Negotiate with Google for a delayed start date',
        'Seek mentorship from entrepreneurs and Google employees'
      ],
      generatedAt: new Date('2024-01-20')
    },
    tags: ['career', 'startup', 'big-tech', 'risk-assessment']
  },
  {
    id: '2',
    title: 'Should we adopt a hybrid work model or go fully remote?',
    description: 'Our company is deciding on post-pandemic work arrangements. We\'re considering a hybrid model (3 days office, 2 days remote) versus going fully remote. We need to balance productivity, company culture, and employee satisfaction.',
    category: 'business',
    createdBy: '2',
    createdAt: new Date('2024-01-20'),
    deadline: new Date('2024-02-28'),
    status: 'active',
    votes: [
      { id: '4', userId: '1', decisionId: '2', option: 'yes', reasoning: 'Hybrid offers best of both worlds - collaboration and flexibility', confidence: 9, createdAt: new Date('2024-01-21') },
      { id: '5', userId: '5', decisionId: '2', option: 'no', reasoning: 'Full remote saves costs and gives employees maximum flexibility', confidence: 8, createdAt: new Date('2024-01-22') }
    ],
    discussions: [
      {
        id: '3',
        decisionId: '2',
        userId: '1',
        content: 'Hybrid model allows for spontaneous collaboration while maintaining work-life balance. It\'s the future of work.',
        type: 'pro',
        createdAt: new Date('2024-01-21'),
        likes: 15,
        replies: []
      }
    ],
    aiInsights: {
      id: '2',
      decisionId: '2',
      summary: 'The hybrid vs remote debate centers on balancing collaboration benefits with flexibility and cost considerations.',
      pros: [
        'Maintains face-to-face collaboration opportunities',
        'Preserves company culture and spontaneous interactions',
        'Provides structure for employees who prefer office environment',
        'Easier onboarding and mentoring of new employees'
      ],
      cons: [
        'Higher real estate and operational costs',
        'Potential for creating two-tier employee experience',
        'Commuting challenges and time waste',
        'Reduced talent pool compared to full remote'
      ],
      sentiment: 'positive',
      confidence: 0.8,
      recommendations: [
        'Survey employees about their preferences',
        'Run a pilot program with both models',
        'Consider flexible arrangements for different roles',
        'Invest in collaboration tools for seamless experience'
      ],
      generatedAt: new Date('2024-01-23')
    },
    tags: ['business', 'remote-work', 'company-culture', 'productivity']
  },
  {
    id: '3',
    title: 'Should I invest in cryptocurrency or traditional stocks?',
    description: 'I have $50,000 to invest and I\'m torn between putting it into cryptocurrency (Bitcoin, Ethereum) or traditional stocks/ETFs. I\'m 28 years old and can handle some risk, but I want to make a smart long-term decision.',
    category: 'finance',
    createdBy: '3',
    createdAt: new Date('2024-01-25'),
    deadline: new Date('2024-03-01'),
    status: 'active',
    votes: [
      { id: '6', userId: '1', decisionId: '3', option: 'no', reasoning: 'Traditional stocks have better long-term track record and stability', confidence: 9, createdAt: new Date('2024-01-26') },
      { id: '7', userId: '2', decisionId: '3', option: 'maybe', reasoning: 'Consider a mix - 70% stocks, 30% crypto for diversification', confidence: 7, createdAt: new Date('2024-01-27') }
    ],
    discussions: [
      {
        id: '4',
        decisionId: '3',
        userId: '1',
        content: 'Diversification is key. Don\'t put all eggs in one basket. Consider index funds for stable growth.',
        type: 'neutral',
        createdAt: new Date('2024-01-26'),
        likes: 20,
        replies: []
      }
    ],
    aiInsights: {
      id: '3',
      decisionId: '3',
      summary: 'Investment decision between high-risk crypto and traditional stocks shows community favoring diversification and traditional investments.',
      pros: [
        'Cryptocurrency offers high growth potential',
        'Traditional stocks provide steady, proven returns',
        'Diversification reduces overall portfolio risk',
        'Your age allows for some risk-taking'
      ],
      cons: [
        'Cryptocurrency is highly volatile and unpredictable',
        'Traditional stocks may have lower short-term returns',
        'Missing out on potential crypto gains',
        'Inflation risk with conservative investments'
      ],
      sentiment: 'neutral',
      confidence: 0.85,
      recommendations: [
        'Consider a diversified portfolio approach',
        'Start with low-cost index funds as your base',
        'Allocate only 5-10% to high-risk investments',
        'Consult with a financial advisor'
      ],
      generatedAt: new Date('2024-01-28')
    },
    tags: ['finance', 'investment', 'cryptocurrency', 'stocks', 'risk-management']
  }
];