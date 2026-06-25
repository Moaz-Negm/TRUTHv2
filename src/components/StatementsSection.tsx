/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import FactCheckBadgeRow from './FactCheckBadgeRow';

interface StatementsSectionProps {
  onArticleClick: (title: string, category: string, snippet: string, imageUrl?: string) => void;
}

export default function StatementsSection({ onArticleClick }: StatementsSectionProps) {
  const [personSearch, setPersonSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('الموضوع');
  const [jobFilter, setJobFilter] = useState('الوظيفة');
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive device width tracking for mathematically perfect translation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statements = [
    {
      id: 'stmt_1',
      author: 'نشأت الديهي',
      role: 'مقدم برامج',
      quote: '“الشعب المصري هو الأقدم في ممارسة الانتخابات”',
      verdict: 'غير دقيق',
      category: 'سياسة',
      roleCategory: 'إعلامي',
      date: 'مايو ٢٠٢٥',
      avatar: '/images-sec-2/dehi.jpg',
      description: 'تعد بريطانيا أول دولة تشهد انتخابات بشكل أقرب إلى ما هو متعارف عليه حاليا من خلال انتخاب جزئي لأعضاء الـ... المزيد',
    },
    {
      id: 'stmt_2',
      author: 'شريف عامر',
      role: 'إعلامي',
      quote: '“النهاردة عندي تصريح من وزير المالية بأن ديون مصر تتراجع ٤ مليار دولار خلال الفترة الماضية”',
      verdict: 'مضلل',
      category: 'اقتصاد',
      roleCategory: 'إعلامي',
      date: 'سبتمبر ٢٠٢٥',
      avatar: '/images-sec-2/84fcf0e9f519808e8fffeb9bf115950cb3170574.jpg',
      description: 'إن الديون الخارجية للحكومة انخفضت بقيمة ٤ مليارات دولار خلال عامين، وليس إجمالي الدين الخارجي لمصر كما قال شريف... المزيد',
    },
    {
      id: 'stmt_3',
      author: 'مرتضى منصور',
      role: 'رئيس نادي الزمالك السابق',
      quote: '“الشعب المصري هو الأقدم في ممارسة الانتخابات”',
      verdict: 'مفبرك',
      category: 'رياضة',
      roleCategory: 'رياضي',
      date: 'سبتمبر ٢٠٢٥',
      avatar: '/images-sec-2/mort.jpg',
      description: 'تعد بريطانيا أول دولة تشهد انتخابات أقرب إلى ما هو متعارف عليها حالياً من خلال انتخاب جزئي لأعضاء الـ... المزيد',
    },
    {
      id: 'stmt_4',
      author: 'أحمد كجوك',
      role: 'وزير المالية',
      quote: '“حققنا فائضاً أولياً بنسبة ٣.٧٪ في الموازنة العامة للدولة للعام المالي المنتهي”',
      verdict: 'غير دقيق',
      category: 'اقتصاد',
      roleCategory: 'مسؤول حكومي',
      date: 'يونيو ٢٠٢٦',
      avatar: '/images-sec-5/5-6.jfif',
      description: 'تشير الأرقام الرسمية الصادرة عن الحسابات الختامية إلى تحقيق الفائض الأولي المذكور فعلياً، نتيجة لترشيد الإنفاق العام... المزيد',
    }
  ];

  // Apply filters dynamically
  const filteredStatements = statements.filter((stmt) => {
    if (subjectFilter !== 'الموضوع' && stmt.category !== subjectFilter) {
      return false;
    }
    if (jobFilter !== 'الوظيفة' && stmt.roleCategory !== jobFilter) {
      return false;
    }
    if (personSearch && !stmt.author.includes(personSearch)) {
      return false;
    }
    return true;
  });

  // Calculate sliding constraints
  const totalItems = filteredStatements.length;
  const maxIndex = Math.max(0, isMobile ? totalItems - 1 : totalItems - 2);

  // Automatically adjust startIndex if container size or filter changes
  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [maxIndex, startIndex]);

  const handleNextSlide = () => {
    if (startIndex < maxIndex) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleCardClick = (quote: string, author: string, desc: string, verdict: string, avatar: string) => {
    // Pass appropriate arguments to show in ArticleModal
    onArticleClick(`${author}: ${quote}`, 'أخبار كاذبة', desc, avatar);
  };

  return (
    <section className="mb-12" id="statements-section" dir="rtl">

      {/* Header & Filters row matching the screenshot exactly */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-50">

        {/* Title on the far right (RTL flow) */}
        <div className="flex items-center gap-2 select-none">
          <span className="w-3.5 h-3.5 bg-[#1d4ed8] rounded-[3px]" id="title-accent-statements"></span>
          <h2 
            style={{ 
              fontFamily: 'Alexandria', 
              fontWeight: 500, 
              fontStyle: 'Medium', 
              fontSize: '18px', 
              lineHeight: '160%', 
              letterSpacing: '0%', 
              textAlign: 'right', 
              color: '#0f172a' 
            }}
          >تصريحات</h2>
        </div>

        {/* Filters and Inputs on the left (RTL flow) */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Search bar input for specific speakers */}
          <div className="relative flex items-center w-[212px] h-[43px] border-b border-[#6F9CF1] py-3 gap-[10px] bg-transparent">
            <input
              type="text"
              placeholder="اكتب اسم الشخص هنا..."
              value={personSearch}
              onChange={(e) => {
                setPersonSearch(e.target.value);
                setStartIndex(0);
              }}
              className="bg-transparent border-none text-[12px] font-normal font-['Alexandria'] text-[#155EE7] placeholder-[#155EE7]/70 text-right w-full h-full focus:outline-none pr-8 pl-1"
              id="statements-person-search"
            />
            <Search className="absolute right-1 top-1/2 -translate-y-1/2 w-[19px] h-[19px] text-[#155EE7]" />
          </div>

          {/* Job Dropdown */}
          <div className="relative">
            <select
              value={jobFilter}
              onChange={(e) => {
                setJobFilter(e.target.value);
                setStartIndex(0);
              }}
              className="appearance-none bg-[rgba(200,218,250,0.5)] text-[#155EE7] border border-[#6F9CF1] text-[12px] font-normal font-['Alexandria'] w-[91px] h-[42px] pr-2 pl-6 cursor-pointer focus:outline-[#155EE7]"
              id="dropdown-job"
            >
              <option value="الوظيفة">الوظيفة</option>
              <option value="مسؤول حكومي">مسؤول حكومي</option>
              <option value="إعلامي">إعلامي</option>
              <option value="رياضي">رياضي</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-[22px] h-[12px] text-[#155EE7] pointer-events-none" />
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <select
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setStartIndex(0);
              }}
              className="appearance-none bg-[rgba(200,218,250,0.5)] text-[#155EE7] border border-[#6F9CF1] text-[12px] font-normal font-['Alexandria'] w-[91px] h-[42px] pr-2 pl-6 cursor-pointer focus:outline-[#155EE7]"
              id="dropdown-theme"
            >
              <option value="الموضوع">الموضوع</option>
              <option value="اقتصاد">اقتصاد</option>
              <option value="سياسة">سياسة</option>
              <option value="رياضة">رياضة</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-[22px] h-[12px] text-[#155EE7] pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Slider Carousel stage */}
      <div className="relative">

        {/* Dynamic Carousel Arrow buttons overlapping container elegantly */}
        {/* Left Arrow (Moves Left, towards index 3 on desktop-RTL) — overlaps the blue border */}
        {startIndex < maxIndex && (
          <div className="absolute z-20 top-1/2 -translate-y-1/2" style={{ left: '-18px' }}>
            <button
              onClick={handleNextSlide}
              className="w-[36px] h-[36px] border-[1.5px] border-[#155EE7] bg-[#DFEAFD] rounded-full flex items-center justify-center text-[#155EE7] cursor-pointer hover:bg-[#cbe0fc] transition-all"
              id="statement-slider-next-arrow"
              title="التالي"
            >
              <ArrowLeft className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        )}

        {/* Right Arrow (Moves Right, towards index 0 on desktop-RTL) */}
        {startIndex > 0 && (
          <div className="absolute z-20 top-1/2 -translate-y-1/2" style={{ right: '-18px' }}>
            <button
              onClick={handlePrevSlide}
              className="w-[36px] h-[36px] border-[1.5px] border-[#155EE7] bg-[#DFEAFD] rounded-full flex items-center justify-center text-[#155EE7] cursor-pointer hover:bg-[#cbe0fc] transition-all"
              id="statement-slider-prev-arrow"
              title="السابق"
            >
              <ArrowRight className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        )}

        {/* Overflow hidden sliding stage — bordered container */}
        <div className="overflow-hidden w-full border border-[#155EE7] relative">

          {/* Left-side Gradient Fade Overlay to show scrollability (desktop only) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f4f7f9] to-transparent pointer-events-none z-10"></div>

          <div
            className="flex transition-transform duration-500 ease-in-out gap-0 w-full items-start"
            style={{ transform: `translateX(${startIndex * (isMobile ? 100 : 44)}%)` }}
          >
            {filteredStatements.map((stmt) => (
              <div
                key={stmt.id}
                className="w-full md:w-[44%] shrink-0 px-2.5 flex flex-col"
                id={`statement-wrapper-${stmt.id}`}
              >
                <div
                  onClick={() => handleCardClick(stmt.quote, stmt.author, stmt.description, stmt.verdict, stmt.avatar)}
                  className="relative bg-white rounded-2xl p-6 sm:p-8 cursor-pointer shadow-2xs flex flex-col justify-start select-none"
                  dir="rtl"
                  id={`statement-card-${stmt.id}`}
                >
                  {/* Speaker Avatar - Pinned to the top-right corner */}
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-[56px] h-[68px] sm:w-[72px] sm:h-[86px] rounded-md overflow-hidden shrink-0 bg-slate-50">
                    <img
                      src={stmt.avatar}
                      alt={stmt.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Left Column Container: Date, Badge, Quote, Author, Description (with right-padding to clear the absolute-positioned avatar) */}
                  <div className="pr-[72px] sm:pr-[88px] flex flex-col justify-start">
                    {/* Top Row: Date on the far left, Badge on the right next to the avatar */}
                    <div className="flex items-center justify-between w-full mb-4">
                      {/* Badge (Right under RTL) */}
                      <FactCheckBadgeRow categoryLabel="تصريح" verdictLabel={stmt.verdict} size="md" />

                      {/* Date (Left under RTL) */}
                      <div
                        style={{
                          fontFamily: 'Alexandria',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '12px',
                          lineHeight: '150%',
                          letterSpacing: '0%',
                          textAlign: 'right'
                        }}
                        className="text-slate-400 shrink-0"
                      >
                        {stmt.date}
                      </div>
                    </div>

                    {/* Bold Quote right-aligned */}
                    {(() => {
                      const cleanQuote = stmt.quote.replace(/[“""”]/g, '').trim();
                      return (
                        <blockquote className="text-[19px] sm:text-[22px] font-bold text-slate-900 leading-[1.4] text-right font-display">
                          <span className="text-[#155EE7]">”</span>
                          {cleanQuote}
                          <span className="text-[#155EE7]">“</span>
                        </blockquote>
                      );
                    })()}

                    {/* Author Subtitle right-aligned */}
                    <div className="text-right text-[13px] sm:text-[14px] text-slate-950 font-semibold mt-2">
                      {stmt.author}، {stmt.role}
                    </div>

                    {/* Paragraph Statement Analysis Snippet (aligned right under the author) */}
                    <div className="w-full mt-4">
                      {(() => {
                        const match = stmt.description.match(/(.*?)(?:\.{2,}\s*المزيد)$/);
                        if (match) {
                          const textPart = match[1];
                          return (
                            <p className="text-[14px] text-slate-500 leading-[1.4] text-right font-['Alexandria'] font-normal">
                              {textPart}
                              <span className="text-[#155EE7] hover:underline font-semibold cursor-pointer">...المزيد</span>
                            </p>
                          );
                        }
                        return (
                          <p className="text-[14px] text-slate-500 leading-[1.4] text-right font-['Alexandria'] font-normal">
                            {stmt.description}
                          </p>
                        );
                      })()}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}

