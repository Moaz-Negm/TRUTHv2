/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import FactCheckBadgeRow from './FactCheckBadgeRow';

interface FakeNewsSectionProps {
  onArticleClick: (title: string, category: string, snippet: string, imageUrl?: string) => void;
}

export default function FakeNewsSection({ onArticleClick }: FakeNewsSectionProps) {
  const fakeNews = [
    {
      id: 'fn_1',
      badgeLeft: 'خبر',
      badgeRight: 'مضلل',
      title: 'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
      snippet: 'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان، وتم نفي هذه الشائعة كلياً.',
      imageUrl: '/images-sec-5/5-2.jpg', // Tutankhamun mask representation
    },
    {
      id: 'fn_2',
      badgeLeft: 'خبر',
      badgeRight: 'غير دقيق',
      title: 'علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير',
      snippet: 'نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التلفزيونية والتقارير الصحفية الصادرة.',
      imageUrl: '/images-sec-5/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg',
    },
    {
      id: 'fn_3',
      badgeLeft: 'خبر',
      badgeRight: 'مضلل',
      title: 'علي معلول ليس أول أجنبي يرتدي شارة القيادة في النادي الأهلي',
      snippet: 'اللاعب التونسي علي معلول ليس أول أجنبي يرتدي شارة القيادة في النادي الأهلي عبر تاريخه الممتد لقرن من النضال الرياضي.',
      imageUrl: '/images-sec-5/cc47522027e7712f1c388b2234d38a2ac67a902f.jpg',
    },
    {
      id: 'fn_4',
      badgeLeft: 'خبر',
      badgeRight: 'غير دقيق',
      title: 'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
      snippet: 'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان وعلاقتي البلدين مستمرة.',
      imageUrl: '/images-sec-5/1-1.jpg',
    }
  ];

  const getGridClasses = (index: number) => {
    switch (index) {
      case 0:
        return 'border-b border-dotted border-blue-200 pb-6 mb-6 md:border-b md:border-dotted md:border-blue-200 md:pl-6 md:pb-6 md:mb-0 md:pt-0';
      case 1:
        return 'border-b border-dotted border-blue-200 pb-6 mb-6 md:border-b md:border-dotted md:border-blue-200 md:pr-6 md:pb-6 md:mb-0 md:pt-0';
      case 2:
        return 'border-b border-dotted border-blue-200 pb-6 mb-6 md:border-b-0 md:pl-6 md:pt-6 md:pb-0 md:mb-0';
      case 3:
        return 'md:pr-6 md:pt-6';
      default:
        return '';
    }
  };

  return (
    <section className="mb-12" id="fakenews-section" dir="rtl">
      {/* Accent title for Fake News */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-blue-100">
        <span className="w-3.5 h-3.5 bg-[#155EE7] rounded-[3px]" id="title-accent-fakenews"></span>
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
        >أخبار كاذبة</h2>
      </div>

      {/* Grid structure: 2 Columns, 2 Rows with dotted dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:gap-x-0">
        {fakeNews.map((news, index) => {
          // onClick is commented out here so clicking news items does nothing (no popup)
          return (
            <div
              key={news.id}
              className={`group flex flex-row gap-4 cursor-default items-start justify-between relative ${getGridClasses(index)}`}
              id={`fakenews-item-${news.id}`}
            >

            {/* Right Box in RTL: Thumbnail Image with sharp corners (rounded-none) */}
            <div className="w-36 h-24 sm:w-44 sm:h-32 shrink-0 rounded-none overflow-hidden bg-slate-100 shadow-3xs">
              <img
                src={news.imageUrl}
                alt={news.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left Box in RTL: Badge & Content */}
            <div className="flex-1 text-right pr-4">

              {/* Badges */}
              <div className="mb-2">
                <FactCheckBadgeRow categoryLabel={news.badgeLeft} verdictLabel={news.badgeRight} size="sm" />
              </div>

              <h3 
                style={{
                  fontFamily: 'Alyamama',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '130%',
                  letterSpacing: '0%',
                  textAlign: 'right'
                }}
                className="text-slate-900 mb-2 group-active:text-[#155EE7] transition-colors"
              >
                {news.title}
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
                {news.snippet}
              </p>
            </div>

            {/* Vertical dotted divider between columns (with gaps around horizontal line) */}
            {index === 0 && (
              <div className="hidden md:block absolute left-0 top-0 bottom-3 border-l border-dotted border-blue-200" id="fakenews-vertical-divider-top"></div>
            )}
            {index === 2 && (
              <div className="hidden md:block absolute left-0 top-3 bottom-0 border-l border-dotted border-blue-200" id="fakenews-vertical-divider-bottom"></div>
            )}

            </div>
          );
        })}
      </div>

    </section>
  );
}
