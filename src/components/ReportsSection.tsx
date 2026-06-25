/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ReportsSectionProps {
  onArticleClick: (title: string, category: string, snippet: string, imageUrl?: string) => void;
}

export default function ReportsSection({ onArticleClick }: ReportsSectionProps) {
  const reports = [
    {
      id: 'rp_1',
      category: 'مرأة',
      categoryColor: 'text-[#155EE7]',
      title: 'لماذا تفضل النساء الوظائف الإدارية عن التدريس في المدارس؟',
      snippet: 'رغم تفوق السيدات في أعداد العاملين داخل وظائف التربية والتعليم، تظل رواتبهن الأقل مقارنة بالذكور في المدارس الخاصة والحكومية بالمحافظات.',
      imageUrl: '/images-sec-3/rea.jpg',
    },
    {
      id: 'rp_2',
      category: 'رياضة',
      categoryColor: 'text-[#155EE7]',
      title: 'كيف قفز جمهور الأهلي على التعليمات الأمنية؟',
      snippet: 'نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التلفزيونية وصحف الصباح واللقاءات الرياضية.',
      imageUrl: '/images-sec-3/trek.jpg',
    }
  ];

  return (
    <section className="mb-12" id="reports-section" dir="rtl">
      {/* Target heading with solid accent bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-blue-100">
        <span className="w-3.5 h-3.5 bg-[#155EE7] rounded-[3px]" id="title-accent-reports"></span>
        <h2 
          style={{ 
            fontFamily: 'Alexandria', 
            fontWeight: 500, 
            fontStyle: 'Medium', 
            fontSize: '18px', 
            lineHeight: '160%', 
            letterSpacing: '0%', 
            textAlign: 'right', 
            color: '#0f172a',
            width: '43px',
            height: '29px'
          }}
        >تقارير</h2>
      </div>

      {/* Grid of exactly two articles with vertical dotted line separator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-0">
        {reports.map((report, index) => (
          <div
            key={report.id}
            onClick={() => onArticleClick(report.title, report.category, report.snippet, report.imageUrl)}
            className={`group flex flex-row gap-4 cursor-pointer items-start ${
              index === 0 
                ? 'md:border-l md:border-dotted md:border-blue-200 md:pl-8' 
                : 'md:pr-8'
            }`}
            id={`report-item-${report.id}`}
          >
            
            {/* Right element in RTL: Image with sharp corners (rounded-none) */}
            <div className="w-36 h-24 sm:w-44 sm:h-32 shrink-0 rounded-none overflow-hidden bg-slate-100 shadow-3xs">
              <img
                src={report.imageUrl}
                alt={report.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left element in RTL: Text content */}
            <div className="flex-1 text-right">
              <span className={`block font-['Alexandria'] font-normal text-[14px] leading-[1.4] ${report.categoryColor} mb-2`}>
                {report.category}
              </span>
              <h3 
                style={{
                  fontFamily: 'Alyamama',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '130%',
                  letterSpacing: '0%',
                  textAlign: 'right'
                }}
                className="text-slate-900 mb-2"
              >
                {report.title}
              </h3>
              <p 
                style={{
                  fontFamily: 'Alexandria',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  letterSpacing: '0%',
                  textAlign: 'right'
                }}
                className="text-slate-500 line-clamp-3"
              >
                {report.snippet}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
