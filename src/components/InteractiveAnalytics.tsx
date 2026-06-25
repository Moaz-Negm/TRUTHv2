/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ClaimSubmission, INITIAL_METRICS, INITIAL_SUBMISSIONS } from '../types';
import { TrendingUp, ThumbsUp, Calendar, AlertTriangle, Play, HelpCircle, Check, Sparkles } from 'lucide-react';

interface InteractiveAnalyticsProps {
  userSubmissions: ClaimSubmission[];
  onUpvoteSubmission: (id: string) => void;
}

export default function InteractiveAnalytics({ userSubmissions, onUpvoteSubmission }: InteractiveAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'trends' | 'submissions'>('trends');

  // Interactive local votes checklist tracker
  const [votedIds, setVotedIds] = useState<string[]>([]);

  const handleUpvote = (id: string) => {
    if (votedIds.includes(id)) return;
    setVotedIds([...votedIds, id]);
    onUpvoteSubmission(id);
  };

  const totalChecked = INITIAL_METRICS.reduce((sum, item) => sum + item.count, 0);

  // Egypt active rumors category map
  const categoriesStats = [
    { name: 'السلع الاستهلاكية والتموين', count: 48, percentage: 38, color: 'bg-rose-500' },
    { name: 'التعليم والمدارس', count: 35, percentage: 27, color: 'bg-amber-500' },
    { name: 'الاستثمار والقروض القومية', count: 24, percentage: 19, color: 'bg-[#155EE7]' },
    { name: 'السياحة والآثار التراثية', count: 21, percentage: 16, color: 'bg-pink-500' }
  ];

  return (
    <div className="space-y-6" id="analytics-panel" dir="rtl">

      {/* Segmented control navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-5 py-3 font-bold text-sm transition-all border-b-2 cursor-pointer ${activeTab === 'trends'
              ? 'border-pink-600 text-pink-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          📈 مؤشرات الشائعات النشطة
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-5 py-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${activeTab === 'submissions'
              ? 'border-pink-600 text-pink-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          🗳️ طابور ومقترحات المجتمع للتصحيح
          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-mono">
            {userSubmissions.length}
          </span>
        </button>
      </div>

      {activeTab === 'trends' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">

          {/* Block 1: Verdict proportions (Saheeh Masr summary stats) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-3xs space-y-5">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">أحصائيات التحقق لعام 2026</h3>
              <p className="text-xs text-slate-400">إجمالي المواد التي تم تفنيدها وتدقيقها: {totalChecked} مادة</p>
            </div>

            {/* Visual breakdown percentages */}
            <div className="space-y-4">
              {INITIAL_METRICS.map((metric, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{metric.label}</span>
                    <span className="font-mono text-slate-500 font-semibold">{metric.count} مادة ({metric.percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${metric.color}`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>ملاحظة للمجتمع:</strong> الشائعات التموينية والاستهلاكية تشهد نمواً متزايداً تزامناً مع حزم الحماية
                الاجتماعية وإعادة تسعير الخدمات. يُنصح دائمًا بالتأكد من المنافذ والصحف الرسمية لوزارة التموين.
              </p>
            </div>
          </div>

          {/* Block 2: Category distributions and trends in Egypt */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-3xs space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">القطاعات الأكثر استهدافاً بالشائعات</h3>
              <p className="text-xs text-slate-400">تصنيف كمي لمصادر الشائعات المرصودة هذا الشهر</p>
            </div>

            <div className="space-y-4">
              {categoriesStats.map((cat, i) => (
                <div key={i} className="flex items-center gap-4">
                  {/* Category description */}
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-slate-300" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 truncate">{cat.name}</span>
                      <span className="font-mono text-slate-500 font-bold">{cat.count} حالة</span>
                    </div>
                    {/* Tiny visual progress bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Aesthetic SVG trend line */}
            <div className="pt-4 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-500 block mb-3">حركة نشاط الشائعات (الأسبوع الماضي)</span>
              <div className="h-16 w-full flex items-end gap-1.5 px-2">
                {[35, 42, 28, 55, 68, 48, 72].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-sm transition-all hover:bg-pink-600 ${i === 6 ? 'bg-pink-500 h-10' : 'bg-slate-300 hover:h-12'
                        }`}
                      style={{ height: `${(v / 80) * 48}px` }}
                    />
                    <span className="text-[9px] text-slate-400 font-mono">
                      {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Block 3: Submissions queue */
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-3xs space-y-5 animate-fadeIn">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">صوت للموضوع التالي لكي نفحصه!</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              هنا تجد الادعاءات والشائعات التي أرسلها أفراد المجتمع المصري. يمكنك التصويت بالضغط على
              زر <strong className="text-slate-800">"صوت للبحث" ({votedIds.length} تصويت مفيد)</strong> لمساعدتنا في فرز وتفضيل الملفات الأكثر أهمية وبلاغاً للبدء الفوري.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userSubmissions.map((sub) => {
              const hasVoted = votedIds.includes(sub.id);

              const statusLabels = {
                'pending': { text: 'قيد المراجعة', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                'under_review': { text: 'جاري التحقيق والبحث', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
                'checked': { text: 'تم كشف الحقيقة', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
              };

              const currentStatus = statusLabels[sub.status] || statusLabels.pending;

              return (
                <div
                  key={sub.id}
                  className="p-5 border border-slate-100 hover:border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col justify-between gap-4 transition-all hover:shadow-2xs"
                >
                  <div className="space-y-3">
                    {/* Top status */}
                    <div className="flex justify-between items-center flex-wrap gap-2 text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full border ${currentStatus.color} font-bold`}>
                        {currentStatus.text}
                      </span>
                      <span className="text-slate-400 font-mono">{sub.date}</span>
                    </div>

                    {/* Body content */}
                    <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                      {sub.text}
                    </p>

                    <div className="text-[11px] text-slate-500 bg-white/60 p-2 rounded-lg border border-slate-100/30">
                      <strong>المصدر الشائع:</strong> {sub.source}
                    </div>

                    {sub.userNotes && (
                      <p className="text-xs text-slate-400 italic">
                        " {sub.userNotes} "
                      </p>
                    )}
                  </div>

                  {/* Actions bar for community interaction */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">📋 كود رقم: {sub.id}</span>
                    <button
                      disabled={hasVoted}
                      onClick={() => handleUpvote(sub.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${hasVoted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-100'
                        }`}
                    >
                      {hasVoted ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم التصويت ({sub.upvotes})</span>
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>صوت للبحث ({sub.upvotes})</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
