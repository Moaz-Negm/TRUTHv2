/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClaimSubmission } from '../types';
import { X, Send, CheckCircle2, Copy, FileText, Globe, AlertCircle } from 'lucide-react';

interface ClaimSubmissionModalProps {
  onClose: () => void;
  onSubmit: (submission: Omit<ClaimSubmission, 'id' | 'date' | 'status' | 'upvotes'>) => void;
}

export default function ClaimSubmissionModal({ onClose, onSubmit }: ClaimSubmissionModalProps) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('أخبار كاذبة');
  const [userNotes, setUserNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setValidationError('برجاء كتابة نص الادعاء الشائع!');
      return;
    }
    if (!source.trim()) {
      setValidationError('برجاء توضيح مصدر الادعاء أو أين وجدته!');
      return;
    }

    setValidationError('');

    // Trigger submission action callback
    onSubmit({
      text,
      source,
      category,
      userNotes
    });

    // Create a random ticket ID
    const randomTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);
    setSuccess(true);
  };

  const categories = ['تصريحات', 'أخبار كاذبة', 'إقتصاد وسياسة', 'مرأة', 'أخرى'];

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    alert('تم نسخ رقم التذكرة لمتابعة الإجراء!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto" id="claim-submission-modal" dir="rtl">

      {/* Modal dialogue box */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 animate-scaleUp">

        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-extrabold text-lg text-slate-950 flex items-center gap-2">
            <span> أرسل ادعاءً أو خبراً كاذباً للتأكيد</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!success ? (
          /* Form layout */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              هل لاحظت شائعة على فيسبوك، أو تصريحاً تلفزيونياً تشك في دقته؟ أرسله لنا وسيقوم فريق المترجمين والمدققين في
              منصة <strong className="text-slate-800">صحيح مصر</strong> بالبحث ورفع الحقيقة فوراً.
            </p>

            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Claim text input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                نص الادعاء الشائع الشبهة فيه <span className="text-rose-500">*</span>
              </label>
              <textarea
                placeholder="مثال: منشور يدّعي تأجيل امتحانات النقل أو زيادة أسعار تذاكر القطارات..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setValidationError('');
                }}
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 text-right font-sans resize-none"
              />
            </div>

            {/* Source input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                أين رأيت هذا الادعاء؟ (المصدر / الرابط) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: منتدى على فيسبوك، أو رسالة متداولة في واتساب، أو تصريح تلفزيوني لبرنامج شريف عامر"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setValidationError('');
                }}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 text-right font-sans"
              />
            </div>

            {/* Grid for categories & optional info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Category dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">التصنيف الأقرب</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 bg-white font-sans text-right"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Extra notes or link */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">اسمك أو بريدك الإلكتروني (اختياري)</label>
                <input
                  type="text"
                  placeholder="لمشاركتك مستجدات التحقيق"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 text-right font-sans"
                />
              </div>

            </div>

            {/* Additional detailed notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">ملاحظات إضافية أو روابط تود إرفاقها</label>
              <textarea
                placeholder="ضع هنا أي سياق إضافي أو مراجع تساعد المدقق..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 text-right font-sans resize-none"
              />
            </div>

            {/* Submit operations */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 text-sm font-semibold cursor-pointer"
              >
                إلغاء الأمر
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الادعاء الآن</span>
              </button>
            </div>

          </form>
        ) : (
          /* Success Screen layout */
          <div className="p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900">تم إرسال بلاغك بنجاح!</h4>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                شكراً للمساهمة في تطهير المشهد الرقمي في مصر. تم تدوين البلاغ وإيداعه في طابور التدقيق الفوري.
              </p>
            </div>

            {/* Receipt ticket widget */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-w-sm mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>رقم التذكرة التعقبية:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-100 font-bold text-slate-700">{ticketId}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>تاريخ الارتباط:</span>
                <span className="text-slate-700 font-semibold font-mono">الآن (الفترة الجارية)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>الوضعية:</span>
                <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">تحت المراجعة (Pending)</span>
              </div>

              <button
                type="button"
                onClick={handleCopyTicket}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ رقم التذكرة للمتابعة</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm cursor-pointer"
            >
              الرجوع للرئيسية
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
