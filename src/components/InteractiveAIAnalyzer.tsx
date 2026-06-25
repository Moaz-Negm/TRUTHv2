/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Play, Search, AlertCircle, RefreshCw, CheckCircle, ThumbsUp, ArrowRight } from 'lucide-react';

interface PreSetRumor {
  id: string;
  text: string;
  verdict: 'incorrect' | 'misleading' | 'correct';
  score: number;
  baitWords: string[];
  explanation: string;
  origin: string;
}

const PRESET_RUMORS: PreSetRumor[] = [
  {
    id: 'pr_1',
    text: 'عاجل جداً والسرية التامة: إعلان وزارة التموين إيقاف بطاقات التموين للمواطنين الأرامل والمطلقات فور إقرار الميزانية السنوية الجاري مراجعتها.',
    verdict: 'incorrect',
    score: 95,
    baitWords: ['عاجل جداً', 'السرية التامة', 'إيقاف بطاقات التموين', 'الأرامل والمطلقات'],
    explanation: 'المستند المتداول مفبرك تماماً. نفت وزارة التموين قطعياً هذا النبأ، وأوضحت أن الفئات الأكثر احتياجاً كالأرامل والمطلقات والأسر البديلة تقع في طليعة المستفيدين الحتميين بل ويحق لهن التقدم للحصول على سلع مضافة للرصيد الأساسي.',
    origin: 'صفحات وهمية على منصات التواصل بهدف جذب النقرات والتفاعل.'
  },
  {
    id: 'pr_2',
    text: 'تحذير لجميع أهالي الإسكندرية: إغلاق ميناء الإسكندرية لـ 12 يوماً بسبب موجة الأعاصير ونوة الصليبة وإلغاء كافة رحلات القوارب.',
    verdict: 'misleading',
    score: 75,
    baitWords: ['تحذير لجميع', 'إغلاق ميناء', 'أعاصير نوة الصليبة'],
    explanation: 'الخبر مضلل. حركة تسيير السفن تخضع لدرجات الرؤية وسرعة الرياح وسلطات الميناء تغلقه مؤقتاً لساعات عند تجاوز النواة الحدود الآمنة الطبيعية للحفاظ على البنى التحتية، وليس لمدة 12 يوماً متواصلة كما زعمت المنشورات الحاشدة.',
    origin: 'مجموعات واتساب وحسابات نشر الطقس غير المعتمدة.'
  },
  {
    id: 'pr_3',
    text: 'افتتاح مصر لأكبر مدينة ثقافية مع معهد ترميم متكامل بوسط القاهرة لصيانة المخطوطات الأثرية النادرة.',
    verdict: 'correct',
    score: 12,
    baitWords: ['مصر لأكبر مدينة', 'صيانة المخطوطات'],
    explanation: 'الخبر صحيح ويشير لوثائق دار الكتب والوثائق القومية بالشراكة مع هيئات الترميم العربية والدولية لفتح أجنحة تخصصية جديدة مجهزة بأحدث تقنيات الليزر الكربوني للحفظ الكلي.',
    origin: 'وكالة أنباء الشرق الأوسط الرسمية وصحف الأهرام.'
  }
];

export default function InteractiveAIAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<PreSetRumor | null>(null);

  const steps = [
    'جاري تحليل معجم وبنية الكلمات والكشف عن ألفاظ الإثارة أو التهويل...',
    'جاري مطابقة الجملة بقاعدة بيانات النفي الحكومية الصادرة للمركز الإعلامي لمجلس الوزراء...',
    'جاري البحث والتحقق من السياق وعنوان الاستجابة ومحركات الويب الصادقة...',
    'جاري تقييم نسبة المصداقية وإخراج تقرير الفحص من مدققي صحيح مصر...'
  ];

  const handleRunPreset = (preset: PreSetRumor) => {
    setInputText(preset.text);
    runAnalysis(preset);
  };

  const handleCustomAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Build a smart dynamic response if it matches presets, else run rule-based generator
    const matched = PRESET_RUMORS.find(
      p => inputText.toLowerCase().includes(p.text.slice(5, 20).toLowerCase()) ||
        p.text.toLowerCase().includes(inputText.slice(5, 20).toLowerCase())
    );

    if (matched) {
      runAnalysis(matched);
    } else {
      // Dynamic rules to make user's typing analyze authentically
      const hasUrgent = /عاجل|هام|خطير|تحذير|سري للغاية|الحق قبل|أقصى درجات/gi.test(inputText);
      const hasMinistry = /وزارة|الحكومة|مجلس الوزراء|البنك المركزي|المالية|التموين|التعليم/gi.test(inputText);
      const hasCancel = /إلغاء|وقف|زيادة|فرض|عقوبة|غرامة|بيع/gi.test(inputText);

      let verdict: 'incorrect' | 'misleading' | 'correct' = 'misleading';
      let score = 50;
      let bait: string[] = [];

      if (hasUrgent) {
        bait.push('لفظ إثارة تعجلي');
        score += 25;
      }
      if (hasCancel) {
        bait.push('قرار إلغاء أو وقف مفاجئ');
        score += 15;
      }
      if (hasMinistry) {
        bait.push('تأصيل حكومي غير منسق');
        score += 5;
      }

      if (score > 80) verdict = 'incorrect';
      else if (score < 30) verdict = 'correct';

      const reasons = [];
      if (hasUrgent) reasons.push('استخدام ألفاظ التهويل العاجلة التي تمنع القارئ من التفكير النقدي');
      if (hasCancel) reasons.push('الإشارة لقرارات وقف أو رسوم مفاجئة دون إرفاق مستند رسمي من الجريدة الرسمية للبلاد');
      if (hasMinistry) reasons.push('ادعاء انتساب القرار لجهة حكومية رفيعة المستوى من غير الاستناد لبيانها الإعلامي الرسمي');

      const customMockResult: PreSetRumor = {
        id: `custom_${Date.now()}`,
        text: inputText,
        verdict,
        score,
        baitWords: bait.length > 0 ? bait : ['غياب مؤشرات التوثيق'],
        explanation: reasons.length > 0
          ? `قمنا بمطابقة نصك وتبين وجود عوامل رصد شائعات تشمل: ${reasons.join('، ثم ')}. يُرجح عدم مشاركته حالياً حتى يكتمل فحصه بواسطة صحفي محلي.`
          : 'هذا النص لا يحتوي على علامات الشائعات المباشرة ومؤشرات التهويل التقليدية، ولكن يُنصح بالتريث قبل مشاركته عبر منصات التواصل.',
        origin: 'نص محرر ومصنوع محلياً بواسطة المستخدم.'
      };

      runAnalysis(customMockResult);
    }
  };

  const runAnalysis = (analysisObject: PreSetRumor) => {
    setAnalyzing(true);
    setResult(null);
    setActiveStep(0);

    // Multi-stage timed animation representing processing
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setAnalyzing(false);
          setResult(analysisObject);
          return prev;
        }
      });
    }, 1100);
  };

  const handleReset = () => {
    setInputText('');
    setResult(null);
    setAnalyzing(false);
    setActiveStep(0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6 animate-fadeIn" id="ai-analyzer-container" dir="rtl">

      {/* Intro block */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black select-none">
          <Sparkles className="w-3.5 h-3.5 fill-indigo-100" />
          <span>المعمل الافتراضي لكشف التضليل والأكاذيب</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 font-display">المُحلل الفوري الذكي</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          نظام محاكاة تفاعلي مدعوم بقواعد تفكيك الشائعات لدى منصات التحقق. الصق أي منشور أو خبر وشاهد كيف يقوم المدققون بتحليله خطوة بخطوة.
        </p>
      </div>

      {!analyzing && !result ? (
        <div className="space-y-6">

          {/* Form input */}
          <form onSubmit={handleCustomAnalyze} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">قم بلصق الشائعة أو الخبر هنا:</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="امسح أي بوست شفته على فيسبوك أو تويتر واكتبه هنا واضغط فحص..."
                rows={4}
                className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-400 text-right font-sans resize-none shadow-3xs"
              />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-full py-4.5 rounded-2xl font-bold text-sm select-none transition-all flex items-center justify-center gap-2 cursor-pointer ${inputText.trim()
                  ? 'bg-slate-900 text-white shadow-md hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>ابدأ فحص الفكر المعزز بدقائق صحيح مصر</span>
            </button>
          </form>

          {/* Seed presets */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-slate-400 block">أمثلة سريعة لنماذج الشائعات الشائعة في مصر للتجربة المستهلكة:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_RUMORS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleRunPreset(preset)}
                  className="p-4 border border-slate-150 hover:border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer text-right flex flex-col justify-between gap-3 text-xs shadow-3xs group"
                >
                  <p className="text-slate-800 font-semibold leading-relaxed line-clamp-3 group-hover:text-pink-600">
                    "{preset.text}"
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="font-bold flex items-center gap-1 text-slate-500">
                      <span>اضغط للتحليل</span>
                      <ArrowRight className="w-3 h-3 rotate-180" />
                    </span>
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-100 font-semibold">
                      {preset.verdict === 'incorrect' ? 'زائف' : preset.verdict === 'misleading' ? 'مضلل' : 'صحيح'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : analyzing ? (
        /* Multi-step loaded animation style */
        <div className="py-12 flex flex-col items-center justify-center p-6 space-y-6 text-center animate-fadeIn" id="analyzer-processing">

          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <Sparkles className="w-6 h-6 text-indigo-500 absolute animate-pulse" />
          </div>

          <div className="space-y-3 max-w-md">
            <h4 className="font-extrabold text-slate-900 text-lg">تحرير الفحص والربط الجاري...</h4>

            {/* Display list of steps */}
            <div className="space-y-2 mt-4 text-xs font-semibold">
              {steps.map((step, index) => {
                const isPassed = index < activeStep;
                const isCurrent = index === activeStep;

                return (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-right ${isPassed
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        : isCurrent
                          ? 'bg-indigo-50 border-indigo-100 text-indigo-800 scale-102 font-bold shadow-3xs'
                          : 'bg-slate-50 border-slate-100 text-slate-400'
                      }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isPassed
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-indigo-600 text-white animate-pulse'
                          : 'bg-slate-205 text-slate-400'
                      }`}>
                      {isPassed ? '✓' : index + 1}
                    </span>
                    <span className="flex-1">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Result presentation */
        <div className="space-y-6 animate-scaleUp text-right" id="analyzer-results">

          {/* Main verdict header summary card */}
          <div className={`p-6 rounded-3xl border-2 grid grid-cols-1 md:grid-cols-3 gap-6 items-center ${result?.verdict === 'incorrect'
              ? 'bg-rose-50 border-rose-200'
              : result?.verdict === 'misleading'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-emerald-50 border-emerald-200'
            }`}>

            {/* Circular Gauge component using plain elegant CSS and state styling */}
            <div className="flex flex-col items-center justify-center text-center space-y-1.5 md:border-l border-slate-200 md:pl-6">
              <span className="text-xs font-extrabold text-slate-400 block">معامل الشبهة وعدم المصداقية:</span>
              <div className="relative w-28 h-28 flex items-center justify-center">

                {/* Gauge Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" strokeWidth="8" stroke="#cbd5e1" fill="transparent" strokeDasharray="300" className="opacity-30" />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    strokeWidth="8"
                    stroke={result?.verdict === 'incorrect' ? '#f43f5e' : result?.verdict === 'misleading' ? '#f59e0b' : '#10b981'}
                    fill="transparent"
                    strokeDasharray="290"
                    strokeDashoffset={290 - (290 * (result?.score || 0)) / 100}
                    className="transition-all duration-1000"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 font-mono">{result?.score}%</span>
                  <span className={`text-[9px] font-bold ${result?.verdict === 'incorrect'
                      ? 'text-rose-600'
                      : result?.verdict === 'misleading'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}>
                    {result?.verdict === 'incorrect' ? 'شبهة قصوى' : result?.verdict === 'misleading' ? 'شبهة متوسطة' : 'موثّق وعادي'}
                  </span>
                </div>

              </div>
            </div>

            {/* Verdict text summaries */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <span className="text-xs text-slate-500">حكم المدقق الافتراضي:</span>
                <h4 className={`text-xl font-extrabold ${result?.verdict === 'incorrect'
                    ? 'text-rose-700'
                    : result?.verdict === 'misleading'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}>
                  {result?.verdict === 'incorrect' ? 'الخبر زائف تماماً ومفبرك' : result?.verdict === 'misleading' ? 'الخبر ينطوي على تضليل وتشويش' : 'الخبر صحيح ومدعوم'}
                </h4>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                {result?.explanation}
              </p>
            </div>

          </div>

          {/* Details breakdown block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Bait Words found */}
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-500 block">ألفاظ وعبارات الشبهة المرصودة:</span>
              <div className="flex flex-wrap gap-2">
                {result?.baitWords.map((word, i) => (
                  <span
                    key={i}
                    className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                  >
                    🔍 {word}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                ملاحظة: استخدام كلمات التعجل متبوعة بمصادر سيادية من غير روابط مرئية من علامات التضليل الكبرى.
              </p>
            </div>

            {/* Source profile */}
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-500 block font-sans">توزيع الرواج والانتشار في الفضاء الرقمي المصري:</span>
              <div className="text-sm">
                <strong>المنبع الأكثر رواجاً:</strong> {result?.origin}
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl">
                <span className="text-xs font-bold text-slate-700 block mb-1">الخطوة الآمنة المقترحة للمجتمع:</span>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  لا تقم بمشاركة هذا النص عبر مجموعات واتساب أو فيسبوك العائلية تفادياً لبث الذعر الاستهلاكي بغير مستند.
                </p>
              </div>
            </div>

          </div>

          {/* Action buttons list */}
          <div className="flex justify-between items-center gap-4 pt-4 border-t border-slate-100 flex-wrap">
            <span className="text-xs text-slate-400 italic">ملاحظة: هذه المحاكاة آلية بهدف التدريب وزيادة الوعي الفكري.</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                فحص نص آخر جديد
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
