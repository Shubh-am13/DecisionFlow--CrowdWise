import React, { useState } from 'react';
import { X, Calendar, Tag, FileText, Lightbulb, Brain, Loader } from 'lucide-react';

interface CreateDecisionModalProps {
  onClose: () => void;
  onDecisionCreated: (decision: any) => void;
}

const CreateDecisionModal: React.FC<CreateDecisionModalProps> = ({ onClose, onDecisionCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    deadline: '',
    tags: ''
  });
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const categories = [
    { value: 'personal', label: 'Personal', color: 'bg-pink-100 text-pink-700' },
    { value: 'career', label: 'Career', color: 'bg-purple-100 text-purple-700' },
    { value: 'business', label: 'Business', color: 'bg-blue-100 text-blue-700' },
    { value: 'finance', label: 'Finance', color: 'bg-green-100 text-green-700' },
    { value: 'lifestyle', label: 'Lifestyle', color: 'bg-orange-100 text-orange-700' },
    { value: 'technology', label: 'Technology', color: 'bg-teal-100 text-teal-700' }
  ];

  const generateAIInsights = async (title: string, description: string, category: string) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate contextual AI insights based on the decision content
    const insights = {
      summary: `AI analysis of your ${category} decision shows multiple factors to consider. The community input will help provide additional perspectives.`,
      pros: generatePros(title, description, category),
      cons: generateCons(title, description, category),
      sentiment: 'neutral' as const,
      confidence: 0.8,
      recommendations: generateRecommendations(title, description, category)
    };

    return insights;
  };

  const generatePros = (title: string, description: string, category: string): string[] => {
    const commonPros = {
      career: [
        'Potential for professional growth and skill development',
        'Opportunity to expand your network and connections',
        'Could lead to better compensation and benefits',
        'May provide new challenges and learning experiences'
      ],
      business: [
        'Potential for increased revenue and market share',
        'Opportunity to innovate and stay competitive',
        'Could improve operational efficiency',
        'May strengthen customer relationships'
      ],
      finance: [
        'Potential for long-term financial growth',
        'Opportunity to diversify your portfolio',
        'Could provide passive income streams',
        'May offer tax advantages'
      ],
      personal: [
        'Could improve your quality of life',
        'Opportunity for personal growth and development',
        'May strengthen relationships with others',
        'Could lead to greater life satisfaction'
      ],
      lifestyle: [
        'Potential for better work-life balance',
        'Opportunity to pursue your passions',
        'Could improve your physical and mental health',
        'May lead to new experiences and adventures'
      ],
      technology: [
        'Could improve efficiency and productivity',
        'Opportunity to stay current with trends',
        'May provide competitive advantages',
        'Could enhance user experience'
      ]
    };

    return commonPros[category as keyof typeof commonPros] || commonPros.personal;
  };

  const generateCons = (title: string, description: string, category: string): string[] => {
    const commonCons = {
      career: [
        'Risk of job instability or career setback',
        'Potential for increased stress and workload',
        'May require significant time investment',
        'Could impact work-life balance negatively'
      ],
      business: [
        'Risk of financial loss or reduced profitability',
        'Potential for operational disruptions',
        'May require substantial resource investment',
        'Could face market or competitive challenges'
      ],
      finance: [
        'Risk of financial loss or market volatility',
        'Potential for liquidity constraints',
        'May have tax implications',
        'Could be affected by economic downturns'
      ],
      personal: [
        'Risk of disappointment or unmet expectations',
        'Potential for relationship strain',
        'May require significant lifestyle changes',
        'Could have unforeseen consequences'
      ],
      lifestyle: [
        'Risk of disrupting current routines',
        'Potential for financial strain',
        'May face social or family resistance',
        'Could require significant time commitment'
      ],
      technology: [
        'Risk of technical issues or failures',
        'Potential for security vulnerabilities',
        'May require training and adaptation',
        'Could become obsolete quickly'
      ]
    };

    return commonCons[category as keyof typeof commonCons] || commonCons.personal;
  };

  const generateRecommendations = (title: string, description: string, category: string): string[] => {
    const commonRecommendations = {
      career: [
        'Research the company culture and growth opportunities',
        'Consult with mentors and industry professionals',
        'Consider the long-term impact on your career trajectory',
        'Evaluate the financial implications and benefits'
      ],
      business: [
        'Conduct thorough market research and analysis',
        'Consult with business advisors and experts',
        'Create a detailed implementation plan',
        'Consider starting with a pilot program'
      ],
      finance: [
        'Consult with a financial advisor',
        'Diversify your investment portfolio',
        'Consider your risk tolerance and timeline',
        'Research all fees and tax implications'
      ],
      personal: [
        'Discuss with family and close friends',
        'Consider the impact on your relationships',
        'Take time to reflect on your values and priorities',
        'Start with small steps to test the waters'
      ],
      lifestyle: [
        'Create a detailed plan and timeline',
        'Consider the impact on your finances',
        'Discuss with affected family members',
        'Research all aspects thoroughly'
      ],
      technology: [
        'Research alternatives and compare features',
        'Consider the total cost of ownership',
        'Plan for training and implementation',
        'Ensure compatibility with existing systems'
      ]
    };

    return commonRecommendations[category as keyof typeof commonRecommendations] || commonRecommendations.personal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingInsights(true);

    try {
      // Generate AI insights
      const aiInsights = await generateAIInsights(formData.title, formData.description, formData.category);

      // Create new decision object
      const newDecision = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        createdBy: '1', // Current user ID
        createdAt: new Date(),
        deadline: formData.deadline ? new Date(formData.deadline) : undefined,
        status: 'active' as const,
        votes: [],
        discussions: [],
        aiInsights: {
          id: Date.now().toString(),
          decisionId: Date.now().toString(),
          ...aiInsights,
          generatedAt: new Date()
        },
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };

      // Add to the decisions list
      onDecisionCreated(newDecision);
      onClose();
    } catch (error) {
      console.error('Error creating decision:', error);
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Decision</h2>
            <p className="text-gray-600 mt-1">Get community insights and AI analysis to make better choices</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isGeneratingInsights}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* AI Processing Overlay */}
        {isGeneratingInsights && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10 rounded-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <Brain className="w-8 h-8 text-purple-600 ml-4 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating AI Insights</h3>
              <p className="text-gray-600">Analyzing your decision and creating personalized recommendations...</p>
              <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-purple-700">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing pros and cons analysis</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Decision Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What decision do you need help with?"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isGeneratingInsights}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide context and details about your decision. The more information you share, the better AI insights and community feedback you'll receive."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
              disabled={isGeneratingInsights}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Tag className="w-4 h-4 inline mr-2" />
              Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <label key={category.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isGeneratingInsights}
                  />
                  <div className={`p-3 border-2 rounded-xl text-center transition-all ${
                    formData.category === category.value
                      ? `${category.color} border-current`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  } ${isGeneratingInsights ? 'opacity-50' : ''}`}>
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Decision Deadline (Optional)
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isGeneratingInsights}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., startup, risk-assessment, career-growth (comma separated)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isGeneratingInsights}
            />
          </div>

          {/* AI Enhancement Notice */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-800 mb-1">AI-Powered Insights</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Instant pros and cons analysis based on your decision</li>
                  <li>• Personalized recommendations and considerations</li>
                  <li>• Community voting and discussion features</li>
                  <li>• Real-time sentiment tracking and updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-teal-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-teal-800 mb-1">Tips for better decisions</h4>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Be specific about your situation and constraints</li>
                  <li>• Include relevant background information</li>
                  <li>• Mention what you've already considered</li>
                  <li>• The more detail you provide, the better the AI analysis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isGeneratingInsights}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGeneratingInsights || !formData.title.trim() || !formData.description.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGeneratingInsights ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Create with AI Insights
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDecisionModal;