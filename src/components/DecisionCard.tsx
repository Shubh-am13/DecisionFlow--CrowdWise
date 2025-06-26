import React, { useState } from 'react';
import { Clock, ThumbsUp, ThumbsDown, Minus, MessageCircle, Brain, Users, Calendar, Sparkles } from 'lucide-react';
import { Decision, Vote } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DecisionCardProps {
  decision: Decision;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | 'maybe' | null>(null);
  const { user } = useAuth();

  const getVotingStats = () => {
    return decision.votes.reduce((acc, vote) => {
      acc[vote.option]++;
      return acc;
    }, { yes: 0, no: 0, maybe: 0 });
  };

  const stats = getVotingStats();
  const totalVotes = stats.yes + stats.no + stats.maybe;

  const handleVote = (option: 'yes' | 'no' | 'maybe') => {
    if (!user) return;
    
    // In a real app, this would make an API call
    setUserVote(option);
    
    // Simulate adding the vote to the decision
    const newVote: Vote = {
      id: Date.now().toString(),
      userId: user.id,
      decisionId: decision.id,
      option,
      reasoning: '',
      confidence: 8,
      createdAt: new Date()
    };
    
    // This would typically update the decision in the parent component
    console.log('Vote cast:', newVote);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      career: 'bg-purple-100 text-purple-700',
      business: 'bg-blue-100 text-blue-700',
      finance: 'bg-green-100 text-green-700',
      lifestyle: 'bg-pink-100 text-pink-700',
      personal: 'bg-orange-100 text-orange-700',
      technology: 'bg-teal-100 text-teal-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const isNewDecision = () => {
    const now = new Date();
    const createdAt = new Date(decision.createdAt);
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24; // Consider "new" if created within 24 hours
  };

  const isMyDecision = decision.createdBy === user?.id;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(decision.category)}`}>
                {decision.category}
              </span>
              {isNewDecision() && (
                <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  New
                </span>
              )}
              {isMyDecision && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Your Decision
                </span>
              )}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {formatDate(decision.createdAt)}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {decision.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {decision.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ThumbsUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">{stats.yes}</span>
            </div>
            <p className="text-xs text-gray-500">Yes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ThumbsDown className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">{stats.no}</span>
            </div>
            <p className="text-xs text-gray-500">No</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Minus className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600">{stats.maybe}</span>
            </div>
            <p className="text-xs text-gray-500">Maybe</p>
          </div>
        </div>

        {/* Progress Bar */}
        {totalVotes > 0 && (
          <div className="mb-6">
            <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 transition-all duration-300"
                style={{ width: `${(stats.yes / totalVotes) * 100}%` }}
              />
              <div 
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${(stats.no / totalVotes) * 100}%` }}
              />
              <div 
                className="bg-orange-500 transition-all duration-300"
                style={{ width: `${(stats.maybe / totalVotes) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{totalVotes} total votes</p>
          </div>
        )}

        {/* AI Insights Preview */}
        {decision.aiInsights && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI Insights</span>
              {isNewDecision() && (
                <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
                  Fresh Analysis
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              {decision.aiInsights.summary}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {totalVotes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {decision.discussions.length}
            </div>
            {decision.deadline && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(decision.deadline)}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        {/* Detailed View */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            {/* Voting Section */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Cast Your Vote</h4>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => handleVote('yes')}
                  className={`p-3 border-2 rounded-xl transition-all text-center ${
                    userVote === 'yes' 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-green-200 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-green-700">Yes</span>
                </button>
                <button 
                  onClick={() => handleVote('no')}
                  className={`p-3 border-2 rounded-xl transition-all text-center ${
                    userVote === 'no' 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-red-200 hover:border-red-400 hover:bg-red-50'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-red-700">No</span>
                </button>
                <button 
                  onClick={() => handleVote('maybe')}
                  className={`p-3 border-2 rounded-xl transition-all text-center ${
                    userVote === 'maybe' 
                      ? 'border-orange-400 bg-orange-50' 
                      : 'border-orange-200 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  <Minus className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-orange-700">Unsure</span>
                </button>
              </div>
              {userVote && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Your vote has been recorded! Thank you for participating.
                  </p>
                </div>
              )}
            </div>

            {/* AI Insights Full */}
            {decision.aiInsights && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Analysis
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {Math.round(decision.aiInsights.confidence * 100)}% confidence
                  </span>
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">Pros</h5>
                    <ul className="space-y-1">
                      {decision.aiInsights.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Cons</h5>
                    <ul className="space-y-1">
                      {decision.aiInsights.cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-700 mb-2">Recommendations</h5>
                    <ul className="space-y-1">
                      {decision.aiInsights.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Discussions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Discussions</h4>
              {decision.discussions.length > 0 ? (
                <div className="space-y-3">
                  {decision.discussions.slice(0, 2).map((discussion) => (
                    <div key={discussion.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-700">U</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">User {discussion.userId}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          discussion.type === 'pro' ? 'bg-green-100 text-green-700' :
                          discussion.type === 'con' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {discussion.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{discussion.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{discussion.likes} likes</span>
                        <span>•</span>
                        <span>{formatDate(discussion.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No discussions yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionCard;