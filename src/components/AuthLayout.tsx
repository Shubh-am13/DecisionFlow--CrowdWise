import React, { useState } from 'react';
import { Brain, Users, TrendingUp, MessageCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthLayout: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Brain className="w-8 h-8 text-coral-400" />
            </div>
            <h1 className="text-3xl font-bold">DecisionFlow</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Make Better Decisions with the Power of Crowds
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Harness collective intelligence, AI insights, and community wisdom to make informed decisions about your life and business.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-teal-400" />
              <span className="text-lg">Community-driven decision making</span>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-lg">AI-powered insights and analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-coral-400" />
              <span className="text-lg">Real-time sentiment tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg">Engaging discussion forums</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white/5 backdrop-blur-sm">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Brain className="w-8 h-8 text-coral-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">DecisionFlow</h1>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;