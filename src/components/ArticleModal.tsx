/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Article, VerdictType } from '../types';
import { X, Calendar, User, Eye, Share2, ThumbsUp, CheckCircle, AlertTriangle, AlertCircle, FileText, Check, Link } from 'lucide-react';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [likesCount, setLikesCount] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Verdict design themes helper
  const getVerdictTheme = (verdict: VerdictType) => {
    switch (verdict) {
      case 'correct':
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-800',
          badge: 'bg-emerald-500 text-white',
          icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
          label: 'صحيح'
        };
      case 'incorrect':
        return {
          bg: 'bg-rose-50 border-rose-200',
          text: 'text-rose-800',
          badge: 'bg-rose-500 text-white',
          icon: <AlertCircle className="w-6 h-6 text-rose-600" />,
          label: 'زائف'
        };
      case 'misleading':
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-800',
          badge: 'bg-amber-500 text-white shadow-xs',
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          label: 'مضلل'
        };
      case 'partially_correct':
        return {
          bg: 'bg-orange-50 border-orange-200',
          text: 'text-orange-800',
          badge: 'bg-orange-500 text-white',
          icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
          label: 'صحيح جزئياً'
        };
      case 'unexplained':
        return {
          bg: 'bg-pink-50 border-pink-200',
          text: 'text-pink-800',
          badge: 'bg-pink-600 text-white',
          icon: <AlertCircle className="w-6 h-6 text-pink-600" />,
          label: 'غير موضح'
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-200',
          text: 'text-slate-800',
          badge: 'bg-slate-600 text-white',
          icon: <FileText className="w-6 h-6 text-slate-600" />,
          label: 'تقرير'
        };
    }
  };

  const theme = getVerdictTheme(article.verdict);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/article/${article.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto" id="article-details-modal" dir="rtl">

      {/* Container Box */}
      <div className="relative w-full max-w-3xl bg-[#f4f7f9] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-scaleUp">

        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2.5 py-1 rounded-sm">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              رمز التحقق: SM-{article.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Main Title heading inside */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-950 leading-tight">
            {article.title}
          </h1>

          {/* Publisher Details and dates metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 py-1.5 border-y border-slate-100 bg-slate-50/50 px-3 rounded-lg">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>الناشر: <strong className="text-slate-700">{article.author}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>{article.views.toLocaleString()} قراءة</span>
            </div>
          </div>

          {/* Full Large Illustration/Image */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-inner relative flex items-center justify-center">
            <img
              src={article.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 pointer-events-none"
            />
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="relative max-h-full max-w-full object-contain z-10"
            />
          </div>

          {/* Core Verdict Badge Alert Box (Dotted original matching styled block) */}
          <div className={`p-5 rounded-2xl border-2 flex flex-col md:flex-row items-start md:items-center gap-4 ${theme.bg}`}>
            <div className="p-3 bg-white rounded-xl shadow-xs">
              {theme.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-500 text-xs font-medium">حكم المُنصة والمدققين:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${theme.badge}`}>
                  {theme.label}
                </span>
              </div>
              <p className={`text-sm font-medium ${theme.text}`}>
                {article.verdict === 'report'
                  ? 'هذا التقرير الصحفي مستند إلى جرد وتحاليل مالية وقانونية لسياسات التمويل والمشاريع القومية.'
                  : `بعد مراجعة كافة المستندات والتصريحات، نصنف هذا الادعاء باعتباره [${theme.label}].`}
              </p>
            </div>
          </div>

          {/* Split Fact-check Breakdown */}
          {article.verdict !== 'report' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="fact-split bg-grid">

              {/* Left block: The claim (danger/gray tone) */}
              <div className="border border-red-100 rounded-2xl p-5 bg-red-50/50 relative overflow-hidden">
                <div className="absolute -left-2 -top-4 text-8xl text-red-100/60 font-serif select-none">“</div>
                <h4 className="text-sm font-bold text-red-600 mb-2 relative z-10">الادعاء الشائع المتداول:</h4>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed relative z-10 font-sans">
                  {article.claim}
                </p>
              </div>

              {/* Right block: The truth (correct/info tone) */}
              <div className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/40 relative overflow-hidden">
                <div className="absolute -left-2 -top-4 text-8xl text-emerald-100 font-serif select-none bg-opacity-20">✓</div>
                <h4 className="text-sm font-bold text-emerald-600 mb-2 relative z-10">الحقيقة المثبتة بدقة:</h4>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed relative z-10 font-sans">
                  {article.truth}
                </p>
              </div>

            </div>
          )}

          {/* Full Analytical Explanation body */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 border-r-4 border-slate-900 pr-3.5 flex items-center gap-1">
              <span>التفاصيل الكاملة والتحليل العلمي</span>
            </h3>
            <div className="text-slate-700 text-sm leading-relaxed space-y-4 text-justify font-sans">
              {article.explanation.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Expandable Sources and References list */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>المصادر والمراجع المعتمدة للتحقق</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {article.sources.map((source, index) => (
                <li key={index} className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-3xs">
                  <span className="w-4 h-4 bg-slate-100 text-slate-500 font-mono font-bold rounded flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">{source}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Dynamic Modal Footer Interaction Panel */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-4">

          {/* Reaction buttons like simulated increment */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${hasLiked
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>مفيد ({likesCount})</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> : <Link className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم نسخ الرابط!' : 'انسخ الرابط'}</span>
            </button>
          </div>

          {/* Close Action Button */}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            رجوع للرئيسية
          </button>

        </div>

      </div>

    </div>
  );
}
