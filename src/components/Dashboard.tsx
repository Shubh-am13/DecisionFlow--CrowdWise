import React, { useState } from 'react';
import { Brain, Plus, TrendingUp, Users, MessageCircle, Clock, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockDecisions } from '../data/mockData';
import { Decision } from '../types';
import DecisionCard from './DecisionCard';
import CreateDecisionModal from './CreateDecisionModal';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'my-decisions'>('all');
  const [decisions, setDecisions] = useState<Decision[]>(mockDecisions);

  const handleDecisionCreated = (newDecision: Decision) => {
    setDecisions(prevDecisions => [newDecision, ...prevDecisions]);
    // Optionally switch to "my-decisions" filter to show the new decision
    setFilter('my-decisions');
  };

  const filteredDecisions = decisions.filter(decision => {
    if (filter === 'active') return decision.status === 'active';
    if (filter === 'my-decisions') return decision.createdBy === user?.id;
    return true;
  });

  const getVotingStats = (decisionId: string) => {
    const decision = decisions.find(d => d.id === decisionId);
    if (!decision) return { yes: 0, no: 0, maybe: 0 };
    
    return decision.votes.reduce((acc, vote) => {
      acc[vote.option]++;
      return acc;
    }, { yes: 0, no: 0, maybe: 0 });
  };

  const myDecisionsCount = decisions.filter(d => d.createdBy === user?.id).length;
  const totalVotes = decisions.reduce((acc, d) => acc + d.votes.length, 0);
  const totalDiscussions = decisions.reduce((acc, d) => acc + d.discussions.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Ready to make some informed decisions with AI insights and community wisdom?
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 flex items-center gap-3 font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Create Decision
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Decisions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {decisions.filter(d => d.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Votes</p>
                <p className="text-2xl font-bold text-gray-900">{totalVotes}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Decisions</p>
                <p className="text-2xl font-bold text-gray-900">{myDecisionsCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Discussions</p>
                <p className="text-2xl font-bold text-gray-900">{totalDiscussions}</p>
              </div>
              <div className="p-3 bg-coral-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-coral-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 inline-flex">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              All Decisions ({decisions.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'active' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Active ({decisions.filter(d => d.status === 'active').length})
            </button>
            <button
              onClick={() => setFilter('my-decisions')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'my-decisions' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              My Decisions ({myDecisionsCount})
            </button>
          </div>
        </div>

        {/* Decisions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDecisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </div>

        {filteredDecisions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Brain className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No decisions found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'my-decisions' 
                ? "You haven't created any decisions yet. Create your first one to get AI insights and community feedback!" 
                : "No decisions match your current filter."
              }
            </p>
            {filter === 'my-decisions' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-medium flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create Your First Decision
              </button>
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateDecisionModal 
          onClose={() => setShowCreateModal(false)} 
          onDecisionCreated={handleDecisionCreated}
        />
      )}
    </div>
  );
};

export default Dashboard;