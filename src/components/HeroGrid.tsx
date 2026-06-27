/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article } from '../types';
import { Eye, Share2, ThumbsUp } from 'lucide-react';
import FactCheckBadgeRow from './FactCheckBadgeRow';

interface HeroGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function HeroGrid({ articles, onArticleClick }: HeroGridProps) {
  // Finding our key screenshot articles specifically to guarantee their exact position
  const mainFeatured = articles.find(a => a.id === '1') || articles[0];
  const gemPath = articles.find(a => a.id === '2');
  const gemJapan = articles.find(a => a.id === '3');
  const escaRest = articles.find(a => a.id === '4');

  const leftArticles = [gemPath, gemJapan, escaRest].filter((a): a is Article => !!a);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="hero-layout-grid" dir="rtl">

      <div
        onClick={() => onArticleClick(mainFeatured)}
        className="lg:col-span-7 min-w-0 flex flex-col group cursor-pointer border border-slate-100 bg-[#f5f9ff] rounded-2xl overflow-hidden p-5"
        id="right-column-featured"
      >
        {/* Large high-impact header Image */}
        <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 mb-5 relative">
          <img
            src={mainFeatured.imageUrl}
            alt={mainFeatured.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Fact check evaluation badges */}
        <div className="mb-4">
          <FactCheckBadgeRow
            categoryLabel="تصريح"
            verdictLabel={mainFeatured.verdictLabel || 'غير موضح'}
            size="md"
          />
        </div>

        {/* Big News Heading Title */}
        <h2 className="text-[28px] md:text-[36px] font-medium text-slate-900 leading-[1.2] mb-3 font-['Alyamama']">
          {mainFeatured.title}
        </h2>

        {/* Description snippet in dark gray */}
        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-5 flex-1 font-['Alexandria']">
          {mainFeatured.snippet}
        </p>

      </div>

      {/* LEFT COLUMN (List of exactly 3 Articles): Occupies 5 cols on desktop (approx 40% split) */}
      <div className="lg:col-span-5 min-w-0 flex flex-col gap-5 lg:pt-[11px]" id="left-column-list">
        {leftArticles.map((article, index) => {
          const isJapan = article.id === '3';
          const isEsca = article.id === '4';

          return (
            <div key={article.id} className="w-full">
              <div
                onClick={() => {
                  if (isJapan) {
                    // Commented out to prevent popup on news item
                    // onArticleClick(article);
                  } else {
                    onArticleClick(article);
                  }
                }}
                className={`group flex flex-row gap-4 items-start p-1 justify-between w-full ${isJapan ? 'cursor-default' : 'cursor-pointer'}`}
                id={`lead-item-${article.id}`}
              >

                {/* Thumbnail Image section on the far right in RTL */}
                <div className="w-36 h-24 sm:w-40 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-3xs">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text section on the left in RTL */}
                <div className="flex-1 grow text-right">

                  {/* Category / Badge header */}
                  <div className="flex items-center gap-2 mb-2">
                    {isJapan ? (
                      <FactCheckBadgeRow categoryLabel="خبر" verdictLabel="مضلل" size="sm" />
                    ) : isEsca ? (
                      <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4]">
                        مرأة
                      </span>
                    ) : (
                      <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4]">
                        إقتصاد وسياسة
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-1.5 line-clamp-2 font-['Alyamama']">
                    {article.title}
                  </h3>

                  {/* Snippet summary */}
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-['Alexandria']">
                    {article.snippet}
                  </p>

                </div>

              </div>

              {/* Dotted border separators with light blue detail separating each article */}
              {index < leftArticles.length - 1 && (
                <div className="my-3 border-t border-dotted border-blue-200 w-full"></div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
