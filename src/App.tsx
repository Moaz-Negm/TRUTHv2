/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Article,
  ClaimSubmission,
  INITIAL_ARTICLES,
  INITIAL_SUBMISSIONS,
  CATEGORIES
} from './types';
import Header from './components/Header';
import HeroGrid from './components/HeroGrid';
import ArticleModal from './components/ArticleModal';
import ClaimSubmissionModal from './components/ClaimSubmissionModal';
import InteractiveAnalytics from './components/InteractiveAnalytics';
import InteractiveAIAnalyzer from './components/InteractiveAIAnalyzer';
import StatementsSection from './components/StatementsSection';
import ReportsSection from './components/ReportsSection';
import HumanRightsBanner from './components/HumanRightsBanner';
import FakeNewsSection from './components/FakeNewsSection';
import InvestigationsSection from './components/InvestigationsSection';
import { Eye, Share2, Calendar, FileText, CheckCircle2, AlertTriangle, HelpCircle, ArrowLeft, Heart, Sparkles, TrendingUp } from 'lucide-react';

export default function App() {
  // Navigation and Filter States
  const [activeTab, setActiveTab] = useState<'home' | 'analytics' | 'analyzer'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive State Modules
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [userSubmissions, setUserSubmissions] = useState<ClaimSubmission[]>(INITIAL_SUBMISSIONS);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'الكل' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.explanation && article.explanation.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Upvote community claim submission callback
  const handleUpvoteClaim = (id: string) => {
    setUserSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, upvotes: sub.upvotes + 1 } : sub)
    );
  };

  // Add new submitted claim to queue callback
  const handleAddNewClaim = (newClaim: Omit<ClaimSubmission, 'id' | 'date' | 'status' | 'upvotes'>) => {
    const freshSubmission: ClaimSubmission = {
      ...newClaim,
      id: `sub_${Date.now()}`,
      date: '13 يونيو 2026',
      status: 'pending',
      upvotes: 1
    };
    setUserSubmissions(prev => [freshSubmission, ...prev]);
  };

  // Quick helper to determine color styling for card verdict label
  const getCardVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'correct':
        return 'border-emerald-200 text-emerald-700 bg-emerald-50';
      case 'incorrect':
        return 'border-rose-200 text-rose-700 bg-rose-50';
      case 'misleading':
        return 'border-amber-200 text-amber-700 bg-amber-50';
      case 'partially_correct':
        return 'border-orange-200 text-orange-700 bg-orange-50';
      case 'unexplained':
        return 'border-pink-200 text-pink-700 bg-pink-50';
      default:
        return 'border-slate-200 text-slate-700 bg-slate-50';
    }
  };

  const handleOpenCustomArticle = (title: string, category: string, snippet: string, imageUrl?: string) => {
    let matchedImg = imageUrl || 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=800';
    if (!imageUrl) {
      if (category === 'حقوق إنسان') {
        matchedImg = 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=800';
      } else if (title.includes('اليابان') || title.includes('المتحف') || title.includes('الأهرام')) {
        matchedImg = title.includes('اليابان') && !title.includes('المتحف')
          ? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800'
          : 'https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&q=80&w=800';
      } else if (title.includes('الأهلي') || title.includes('معلول') || title.includes('الرياضة') || title.includes('جمهور')) {
        matchedImg = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800';
      } else if (title.includes('مبارك') || title.includes('وزير') || title.includes('المالية') || title.includes('كجوك')) {
        matchedImg = title.includes('مبارك')
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'
          : 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=800';
      } else if (title.includes('نساء') || title.includes('التدريس)')) {
        matchedImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800';
      } else if (title.includes('لوجو') || title.includes('القاهرة')) {
        matchedImg = 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800';
      }
    }

    setSelectedArticle({
      id: `custom_${Date.now()}`,
      title,
      category,
      snippet,
      claim: title,
      truth: snippet,
      verdict: category === 'أخبار كاذبة' ? 'misleading' : 'report',
      verdictLabel: category === 'أخبار كاذبة' ? 'مضلل' : 'مراجعة موثقة',
      imageUrl: matchedImg,
      date: '13 يونيو 2026',
      author: 'فريق تحرير صحيح مصر',
      explanation: `${snippet} هذا الفحص يثبت دقة التفاصيل والأرقام بناءً على توثيق شامل وقراءة متأنية للجداول القانونية والمصادر الرسمية، تفادياً للأخبار المضللة في الفضاء العام المصري.`,
      sources: ['الجريدة الرسمية لجمهورية مصر العربية', 'البوابة الرسمية للمعلومات والتحقق من الحقائق'],
      views: Math.floor(Math.random() * 4000) + 1500,
      shares: Math.floor(Math.random() * 800) + 200,
      likes: Math.floor(Math.random() * 1000) + 100
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff] text-slate-900 flex flex-col font-sans" id="saheeh-masr-app" dir="rtl">

      {/* 1. Header component */}
      <Header
        onSearch={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        activeCategory={selectedCategory}
        onSubmitClaimClick={() => setIsSubmitModalOpen(true)}
      />

      {/* 2. Main Platform Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-3" id="main-content-area">

        {/* Dynamic Rendering of Panels based on selected view/tab */}
        {activeTab === 'home' ? (

          <div className="space-y-10 animate-fadeIn" id="news-explorer-section">

            {/* Condition A: Grid layout matching screenshot exactly (Category: 'الكل' and search is empty) */}
            {selectedCategory === 'الكل' && searchQuery === '' ? (
              <div className="space-y-12">

                {/* Saheeh Masr original-looking main grid section */}
                <HeroGrid
                  articles={articles}
                  onArticleClick={setSelectedArticle}
                />

                {/* 2. Statements ("تصريحات") section */}
                <StatementsSection
                  onArticleClick={handleOpenCustomArticle}
                />

                {/* 3. Reports ("تقارير") section */}
                <ReportsSection
                  onArticleClick={handleOpenCustomArticle}
                />

                {/* 4. Human Rights banner ("حقوق إنسان") */}
                <HumanRightsBanner
                  onArticleClick={handleOpenCustomArticle}
                />

                {/* 5. Fake News list section ("أخبار كاذبة") */}
                <FakeNewsSection
                  onArticleClick={handleOpenCustomArticle}
                />

                {/* 6. Investigations grid section ("تحقيقات") */}
                <InvestigationsSection
                  onArticleClick={handleOpenCustomArticle}
                />

              </div>
            ) : (
              /* Condition B: Filtered Grid of cards (Category is active, or search input has text) */
              <div className="space-y-6" id="filtered-grid-list">

                {/* Search Meta Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>النتائج المعروضة للفرز الحالي</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      بناء على القسم: <strong className="text-slate-700">[{selectedCategory}]</strong> {searchQuery && `ومحرك البحث: "${searchQuery}"`}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl font-mono">
                    عثرنا على {filteredArticles.length} مادة مراجعة
                  </span>
                </div>

                {filteredArticles.length > 0 ? (
                  /* Cards Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          if (article.category === 'أخبار كاذبة') {
                            // Commented out to prevent popup on news item
                            // setSelectedArticle(article);
                          } else {
                            setSelectedArticle(article);
                          }
                        }}
                        className={`group bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-3xs p-4 hover:shadow-sm transition-all flex flex-col justify-between ${
                          article.category === 'أخبار كاذبة' ? 'cursor-default' : 'cursor-pointer'
                        }`}
                        id={`filtered-article-${article.id}`}
                      >
                        <div className="space-y-3.5">
                          {/* Thumbnail */}
                          <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                            <span className="absolute top-3 right-3 bg-slate-950/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                              {article.category}
                            </span>
                          </div>

                          {/* Verdict / Date row */}
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-400 font-mono">{article.date}</span>
                            <span className={`border px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${getCardVerdictColor(article.verdict)}`}>
                              {article.verdictLabel || 'مراجعة'}
                            </span>
                          </div>

                          {/* Title & Preview snippet */}
                          <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-[#155EE7] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {article.snippet}
                          </p>
                        </div>

                        {/* Stats Footer */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50 text-[10px] text-slate-400">
                          <span className="font-semibold text-slate-600">{article.author}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty state result */
                  <div className="p-12 text-center bg-white border border-slate-100 rounded-3xl space-y-4 max-w-md mx-auto relative overflow-hidden">
                    <div className="inline-flex p-4 bg-slate-50 rounded-full text-slate-400">
                      <FileText className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-base">لا توجد مراجعات تطابق البحث</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        لم نعثر على مقالات أو فهارس تتطابق مع العبارة المطلوبة. جرب استخدام كلمات عامة كالمتحف، القمح، الديون، أو المدارس.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory('الكل');
                        setSearchQuery('');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      عرض جميع المقالات
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

        ) : activeTab === 'analytics' ? (

          /* 3. Analytics Module View: Trends & Community submissions */
          <div className="animate-fadeIn">
            <InteractiveAnalytics
              userSubmissions={userSubmissions}
              onUpvoteSubmission={handleUpvoteClaim}
            />
          </div>

        ) : (

          /* 4. AI Analyzer Simulator Playground */
          <div className="animate-fadeIn">
            <InteractiveAIAnalyzer />
          </div>

        )}

      </main>

      {/* 3. Footer */}
      <footer className="bg-[#155EE7] text-white py-10 mt-3" dir="rtl" id="platform-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5">

          {/* White Logo */}
          <img
            src="/images/logo.png"
            alt="صحيح مصر"
            className="h-12 w-auto select-none"
            draggable={false}
            style={{ filter: 'brightness(0) invert(1)' }}
            id="footer-logo-img"
          />

          {/* Social Media Icons */}
          <div className="flex items-center gap-5" id="footer-social-icons">
            {/* Signal */}
            <a href="https://signal.org" className="text-white hover:text-white/80 transition-colors" aria-label="Signal" target="_blank" rel="noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://x.com/SaheehMasr?lang=en" className="text-white hover:text-white/80 transition-colors" aria-label="X" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/SaheehMasr/" className="text-white hover:text-white/80 transition-colors" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/saheehmasr/?hl=en" className="text-white hover:text-white/80 transition-colors" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/90" id="footer-nav-links">
            <a href="#" className="hover:text-white transition-colors">من نحن</a>
            <span className="text-white/50">•</span>
            <a href="#" className="hover:text-white transition-colors">المنهجية</a>
            <span className="text-white/50">•</span>
            <a href="#" className="hover:text-white transition-colors">مدونة السلوك</a>
            <span className="text-white/50">•</span>
            <a href="#" className="hover:text-white transition-colors">سياسة التصحيح</a>
            <span className="text-white/50">•</span>
            <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/70 text-center" id="footer-copyright">
            © صحيح مصر 2026 - المحتوى متاح بموجب رخصة المشاع الإبداعي_النسبية-الترخيص بالمثل الدولية
          </p>

        </div>
      </footer>

      {/* 4. Overlay Modals */}
      {/* {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )} */}

      {isSubmitModalOpen && (
        <ClaimSubmissionModal
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={(claimData) => {
            handleAddNewClaim(claimData);
          }}
        />
      )}

    </div>
  );
}
