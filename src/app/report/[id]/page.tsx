"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import type { ProductReport } from '@/types/report';
import { FadeInSection } from '@/components/FadeInSection';
import {
  validateQualityLevel,
  validateConstructionLevel,
  validateDurabilityRange,
  validateEthicsRating,
  validateOverallScore
} from '@/utils/validation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

const PRIMARY = "#F610C1";
const ACCENT = "#F6F640";

const formatTimeAgo = (timestamp: string) => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};

const gradeToPercentage = (grade: string): number => {
  const grades: { [key: string]: number } = {
    'A': 95,
    'B': 85,
    'C': 75,
    'D': 65,
    'F': 55
  };
  return grades[grade] || 0;
};

const percentageToGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

interface PageParams {
  id: string;
  [key: string]: string | string[];
}

// Add Tooltip component
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full whitespace-normal max-w-xs">
          {text}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
        </div>
      )}
    </div>
  );
};

// Add Toast component for error messages
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50"
    >
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-red-700 hover:text-red-900">
          ×
        </button>
      </div>
    </motion.div>
  );
};

// Add PostShareSurvey component
const PostShareSurvey = ({ reportId, onClose }: { reportId: string; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [changedPerspective, setChangedPerspective] = useState<string | null>(null);
  const [wouldRecommend, setWouldRecommend] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!changedPerspective || !wouldRecommend) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          report_id: reportId,
          changed_perspective: changedPerspective,
          would_recommend: wouldRecommend
        });

      if (error) throw error;
      onClose();
    } catch (err) {
      console.error('Error submitting survey:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="mb-6">
          <div className="h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Did this change how you think about the item you scanned?</h3>
            <div className="space-y-2">
              {['yes', 'somewhat', 'no'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChangedPerspective(option);
                    setStep(2);
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                    changedPerspective === option
                      ? 'bg-pink-100 text-pink-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-4">Would you recommend this to a friend?</h3>
            <div className="space-y-2">
              {['yes', 'maybe', 'no'].map((option) => (
                <button
                  key={option}
                  onClick={() => setWouldRecommend(option)}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                    wouldRecommend === option
                      ? 'bg-pink-100 text-pink-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                disabled={submitting}
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={!wouldRecommend || submitting}
                className={`px-4 py-2 rounded-lg text-white ${
                  !wouldRecommend || submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-pink-600'
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Update FeedbackButton component
const FeedbackButton = ({ 
  type, 
  onFeedback, 
  reportId 
}: { 
  type: 'helpful' | 'not_helpful', 
  onFeedback: (type: string) => void,
  reportId: string 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          report_id: reportId,
          feedback_type: type,
          is_helpful: type === 'helpful'
        });

      if (error) throw error;
      setSubmitted(true);
      onFeedback(type);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        disabled={submitted || loading}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          submitted 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : loading
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : type === 'helpful'
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? 'Submitting...' : (
          <div className="flex items-center gap-2">
            {type === 'helpful' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-green-500"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-red-500"
                />
              </svg>
            )}
            <span>{type === 'helpful' ? 'Yes' : 'No'}</span>
          </div>
        )}
      </motion.button>
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </>
  );
};

// Add RecommendationCard component
const RecommendationCard = ({ item, tier, reportId }: { item: any, tier: string, reportId: string }) => {
  const tierColors = {
    budget: "bg-green-50 border-green-200",
    value: "bg-blue-50 border-blue-200",
    mid: "bg-purple-50 border-purple-200",
    investment: "bg-amber-50 border-amber-200",
    heirloom: "bg-rose-50 border-rose-200"
  };

  const tierLabels = {
    budget: "Budget",
    value: "Value",
    mid: "Mid-Range",
    investment: "Investment",
    heirloom: "Heirloom"
  };

  return (
    <div className={`p-4 rounded-lg border ${tierColors[tier as keyof typeof tierColors]} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.image || '/placeholder.png'}
            alt={item.title}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
            <span className="px-2 py-1 text-sm rounded-full bg-white border" style={{ color: PRIMARY }}>
              {tierLabels[tier as keyof typeof tierLabels]}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold" style={{ color: PRIMARY }}>{item.price}</span>
            <span className="text-sm text-gray-500">by {item.brand}</span>
          </div>

          {/* Quality Indicators */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Quality:</span>
              <span className="ml-2 font-medium">{item.quality}</span>
            </div>
            <div>
              <span className="text-gray-600">Ethics:</span>
              <span className="ml-2 font-medium">{item.ethics}</span>
            </div>
            <div>
              <span className="text-gray-600">Construction:</span>
              <span className="ml-2 font-medium">{item.construction}</span>
            </div>
            <div>
              <span className="text-gray-600">Durability:</span>
              <span className="ml-2 font-medium">{item.durability}</span>
            </div>
          </div>

          {/* Materials */}
          {item.materials && item.materials.length > 0 && (
            <div className="mt-2">
              <span className="text-sm text-gray-600">Materials: </span>
              <span className="text-sm text-gray-900">{item.materials.join(", ")}</span>
            </div>
          )}

          {/* Action Button */}
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-block px-4 py-2 text-sm font-medium rounded-full border-2 transition-colors"
            style={{ 
              borderColor: PRIMARY,
              color: PRIMARY
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = PRIMARY;
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = PRIMARY;
            }}
          >
            View Product →
          </a>
        </div>
      </div>

      {/* Add feedback component */}
      <RecommendationFeedback 
        reportId={reportId} 
        recommendationId={item.url} 
      />
    </div>
  );
};

// Update RecommendationFeedback component
const RecommendationFeedback = ({ 
  reportId, 
  recommendationId 
}: { 
  reportId: string, 
  recommendationId: string 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeedback = async (action: 'clicked' | 'skipped' | 'worn') => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('alt_feedback')
        .insert({
          report_id: reportId,
          recommendation_id: recommendationId,
          action
        });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return null;

  return (
    <>
      <motion.div 
        className="flex items-center gap-2 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-sm text-gray-600">Would you wear this?</span>
        <motion.button
          onClick={() => handleFeedback('worn')}
          disabled={loading}
          className="text-pink-500 hover:text-pink-600 disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ❤️ Yes
        </motion.button>
        <motion.button
          onClick={() => handleFeedback('skipped')}
          disabled={loading}
          className="text-gray-500 hover:text-gray-600 disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🌀 Show another
        </motion.button>
      </motion.div>
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </>
  );
};

// Update SuggestionBox component
const SuggestionBox = ({ reportId }: { reportId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [reason, setReason] = useState('price');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('user_suggestions')
        .insert({
          report_id: reportId,
          suggestion_url: suggestion,
          suggestion_reason: reason
        });

      if (error) throw error;
      setIsOpen(false);
      setSuggestion('');
    } catch (err) {
      setError('Failed to submit suggestion. Please try again.');
      console.error('Error submitting suggestion:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4">
        {!isOpen ? (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💡 Think we missed a better option?
          </motion.button>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mt-2 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Paste a link or brand name"
              className="w-full px-3 py-2 border rounded-lg"
              disabled={loading}
            />
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={loading}
            >
              <option value="price">Better price</option>
              <option value="ethics">Better ethics</option>
              <option value="material">Better materials</option>
              <option value="brand_trust">Trusted brand</option>
            </select>
            <div className="flex gap-2">
              <motion.button
                type="submit"
                disabled={loading || !suggestion}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                  loading || !suggestion
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-pink-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </>
  );
};

// Update FreeformFeedback component
const FreeformFeedback = ({ reportId }: { reportId: string }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('freeform_feedback')
        .insert({
          report_id: reportId,
          feedback_text: feedback,
          email: email || null
        });

      if (error) throw error;
      setSubmitted(true);
      setFeedback('');
      setEmail('');
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-600"
      >
        Thanks for your feedback! 🙏
      </motion.div>
    );
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium text-gray-900">
          What could've made this more useful for you?
        </h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback (optional — takes 5 seconds)"
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
          disabled={loading}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (optional, for follow-up)"
          className="w-full px-3 py-2 border rounded-lg"
          disabled={loading}
        />
        <motion.button
          type="submit"
          disabled={loading || !feedback}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
            loading || !feedback
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </motion.button>
      </motion.form>
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </>
  );
};

const ReportPage = () => {
  const params = useParams<{ id?: string }>();
  const [report, setReport] = React.useState<ProductReport | null>(null);
  const [recommendations, setRecommendations] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Function to extract and format domain from URL
  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      // Remove .com, .co.uk, etc. and split by dots
      const baseDomain = domain.split('.')[0];
      // Capitalize each word
      return baseDomain
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch {
      return 'Unknown source';
    }
  };

  React.useEffect(() => {
    const fetchReport = async () => {
      if (!params?.id) {
        setError('Invalid report ID');
        setLoading(false);
        return;
      }

      try {
        // Fetch report
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        
        // Validate and sanitize the data
        const validatedReport: ProductReport = {
          ...data,
          overall_score: validateOverallScore(data.overall_score),
          quality: validateQualityLevel(data.quality),
          construction: validateConstructionLevel(data.construction),
          durability: validateDurabilityRange(data.durability),
          ethics: validateEthicsRating(data.ethics),
          quality_explanation: data.quality_explanation || 'No quality explanation available',
          construction_explanation: data.construction_explanation || 'No construction explanation available',
          ethics_explanation: data.ethics_explanation || 'No ethics explanation available',
          overall_explanation: data.overall_explanation || 'No overall explanation available',
          materials: data.materials || 'Material information unavailable',
          brand: data.brand || 'Unknown brand',
          created_at: data.created_at || new Date().toISOString()
        };
        
        setReport(validatedReport);

        // Fetch recommendations
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: data.url })
        });

        if (response.ok) {
          const recData = await response.json();
          setRecommendations(recData.recommendations);
        }

      } catch (err) {
        setError('Failed to load report');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [params?.id]);

  const handleWaitlistClick = () => {
    setShowModal(true);
    setMessage(null);
    setWaitlistEmail("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email: waitlistEmail });

      if (error) throw error;
      setMessage('Thanks for joining! We\'ll be in touch soon.');
      setWaitlistEmail('');
      setTimeout(() => setShowModal(false), 2000);
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
      console.error('Error submitting to waitlist:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!report) return <div className="min-h-screen flex items-center justify-center">Report not found</div>;
  if (!params?.id) return <div className="min-h-screen flex items-center justify-center">Invalid report ID</div>;

  // Since we've checked that params.id exists, we can safely assert its type
  const reportId = params.id as string;

  const overallScore = report.overall_score;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        onWaitlistClick={handleWaitlistClick}
        onLoginClick={() => router.push('/signin')}
        onSignUpClick={() => router.push('/signup')}
      />
      <main className="flex-1 bg-white px-4 py-8 md:px-8">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {report?.title || "Your Piece's Report"}
                </h1>
                <div className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full flex items-center">
                  ✓ Verified from {report?.url ? getDomainFromUrl(report.url) : 'Unknown source'}
                </div>
              </div>
              <p className="text-gray-500">
                Analyzed {formatTimeAgo(report?.created_at || '')}
              </p>
            </div>

            {/* Add helpfulness feedback */}
            {!feedbackSubmitted && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-600">Was this report helpful?</span>
                <div className="flex gap-2">
                  <FeedbackButton
                    type="helpful"
                    onFeedback={() => setFeedbackSubmitted(true)}
                    reportId={reportId}
                  />
                  <FeedbackButton
                    type="not_helpful"
                    onFeedback={() => setFeedbackSubmitted(true)}
                    reportId={reportId}
                  />
                </div>
              </div>
            )}

            {/* Product Image and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Product Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                {report.images && report.images[0] ? (
                  <Image
                    src={report.images[0]}
                    alt={`${report.brand} ${report.materials} product`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Product Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {report.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Overall Score */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-900">Overall Score</h2>
                <span className="text-2xl font-bold text-pink-500">{percentageToGrade(overallScore)}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                  style={{ width: `${gradeToPercentage(percentageToGrade(overallScore))}%` }}
                />
              </div>
              {report.overall_explanation && (
                <p className="mt-4 text-sm text-pink-500">{report.overall_explanation}</p>
              )}
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Quality */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">Quality</h3>
                  <span className="text-2xl font-bold text-pink-500">{report.quality}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${gradeToPercentage(report.quality)}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-pink-500">
                  {report.quality_explanation || `This ${report.materials} piece features ${report.quality === 'A' ? 'premium' : report.quality === 'B' ? 'high-quality' : report.quality === 'C' ? 'standard' : 'basic'} materials. ${report.quality === 'A' ? 'The fabric shows excellent craftsmanship and attention to detail.' : report.quality === 'B' ? 'The materials are well-chosen for their intended use.' : report.quality === 'C' ? 'The materials are adequate but not exceptional.' : 'The materials may not meet premium standards.'}`}
                </p>
              </div>

              {/* Construction */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">Construction</h3>
                  <span className="text-2xl font-bold text-pink-500">{report.construction}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${gradeToPercentage(report.construction)}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-pink-500">
                  {report.construction_explanation || `Manufactured in ${report.brand === 'Made in Italy' ? 'Italy' : 'various locations'}, this piece shows ${report.construction === 'A' ? 'exceptional' : report.construction === 'B' ? 'strong' : report.construction === 'C' ? 'adequate' : 'basic'} construction quality. ${report.construction === 'A' ? 'The stitching and finishing are impeccable.' : report.construction === 'B' ? 'The construction is solid with good attention to detail.' : report.construction === 'C' ? 'The construction is functional but may show some inconsistencies.' : 'The construction may have some quality concerns.'}`}
                </p>
              </div>

              {/* Durability */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">Durability</h3>
                  <span className="text-2xl font-bold text-pink-500">{report.durability}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${gradeToPercentage(report.durability)}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-pink-500">
                  {`This ${report.materials} piece is expected to ${report.durability === 'A' ? 'last for many years with proper care' : report.durability === 'B' ? 'provide good longevity with regular maintenance' : report.durability === 'C' ? 'serve its purpose for a moderate period' : 'require careful handling to maintain its condition'}. ${report.durability === 'A' ? 'The materials and construction suggest excellent long-term durability.' : report.durability === 'B' ? 'The combination of materials and construction indicates good durability.' : report.durability === 'C' ? 'The durability is acceptable but may show wear over time.' : 'The durability may be limited and require extra care.'}`}
                </p>
              </div>

              {/* Human Impact */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">Human Impact</h3>
                  <span className="text-2xl font-bold text-pink-500">{report.ethics}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${gradeToPercentage(report.ethics)}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-pink-500">
                  {report.ethics_explanation || `${report.ethics === 'A' ? 'Excellent' : report.ethics === 'B' ? 'Good' : report.ethics === 'C' ? 'Moderate' : 'Limited'} consideration for ethical production practices. ${report.ethics === 'A' ? 'The brand demonstrates strong commitment to fair labor practices and sustainable production.' : report.ethics === 'B' ? 'The brand shows good attention to ethical manufacturing standards.' : report.ethics === 'C' ? 'The brand has some ethical considerations in place.' : 'The brand may need to improve its ethical manufacturing practices.'}`}
                </p>
              </div>
            </div>

            {/* Recommendations Section */}
            {recommendations && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                  Better Alternatives
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(recommendations).map(([tier, items]: [string, any]) => (
                    <div key={tier} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {tier.replace('_', ' ')} Options
                      </h3>
                      <div className="grid gap-4">
                        {items.map((item: any, index: number) => (
                          <RecommendationCard 
                            key={index} 
                            item={item} 
                            tier={tier} 
                            reportId={reportId}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add suggestion box */}
                <SuggestionBox reportId={reportId} />
              </div>
            )}

            {/* Add freeform feedback */}
            <FreeformFeedback reportId={reportId} />

            {/* Add share button */}
            <div className="mt-8 flex justify-center">
              <motion.button
                onClick={() => setShowSurvey(true)}
                className="px-6 py-3 text-sm font-medium text-white rounded-full"
                style={{ backgroundColor: PRIMARY }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Report
              </motion.button>
            </div>

            {/* Post-share survey */}
            <AnimatePresence>
              {showSurvey && (
                <PostShareSurvey
                  reportId={reportId}
                  onClose={() => setShowSurvey(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </FadeInSection>
      </main>
      <Footer onWaitlistClick={handleWaitlistClick} />

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] transition-opacity duration-500 backdrop-filter backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>Join the Waitlist</h2>
              <button 
                onClick={handleCloseModal}
                className="text-xl font-bold focus:outline-none"
                style={{ color: PRIMARY }}
              >
                &times;
              </button>
            </div>
            <p className="mb-4" style={{ color: PRIMARY }}>Be the first to know when CIRA launches. Get exclusive early access and updates!</p>
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                style={{ borderColor: PRIMARY }}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg text-white font-bold transition"
                style={{ 
                  backgroundColor: loading ? '#ccc' : PRIMARY,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Submitting...' : 'Join Waitlist'}
              </button>
              {message && (
                <p className={`text-center ${message.includes('Thanks') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
