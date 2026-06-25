/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface InvestigationsSectionProps {
  onArticleClick: (title: string, category: string, snippet: string, imageUrl?: string) => void;
}

export default function InvestigationsSection({ onArticleClick }: InvestigationsSectionProps) {
  return (
    <section className="mb-12 bg-[#f4f8fc] p-6 sm:p-8 lg:p-10" id="investigations-section" dir="rtl">
      {/* Accent Title row */}
      <div className="flex items-center gap-2 mb-8 pb-4">
        <span className="w-3.5 h-3.5 bg-[#155EE7]" style={{ borderRadius: 0 }} id="title-accent-investigations"></span>
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
        >تحقيقات</h2>
      </div>

      {/* Top Row: Asymmetrical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* RIGHT: Big Featured Article (lg:col-span-7, first in DOM for RTL → visual right) */}
        <div 
          className="lg:col-span-7 min-w-0 flex flex-col group cursor-pointer lg:pl-8 lg:border-l lg:border-dotted lg:border-slate-300 pb-8 lg:pb-0" 
          onClick={() => onArticleClick(
            'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
            'رياضة',
            'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان وعلاقتي البلدين مستمرة.',
            '/images-sec-5/1-1.jpg'
          )}
        >
          <div className="w-full h-64 md:h-80 lg:h-[400px] overflow-hidden bg-slate-100 mb-4" style={{ borderRadius: 0 }}>
            <img 
              src="/images-sec-5/1-1.jpg" 
              alt="المتحف المصري الكبير" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-2 block">رياضة</span>
          <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-slate-900 leading-tight mb-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
            اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
          </h3>
          <p className="text-[#475569] text-sm leading-relaxed font-['Alexandria']">
            لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان وعلاقتي البلدين مستمرة.
          </p>
        </div>

        {/* LEFT: 3 Small Articles Stacked (lg:col-span-5, second in DOM for RTL → visual left) */}
        <div className="lg:col-span-5 min-w-0 flex flex-col justify-between lg:pr-8 pt-8 lg:pt-0" id="investigations-left-stack">
          {/* Small Article 1 */}
          <div 
            className="group flex flex-row gap-4 cursor-pointer items-start pb-5 w-full" 
            onClick={() => onArticleClick(
              'من صمم لوجو القاهرة المشبوه؟',
              'رياضة',
              'تشابه إلى حد كبير مع تصميمات شركة تنمية زراعية إيطالية، في واقعة أعادت إلى الأذهان سرقة تصميمات مترو الأنفاق',
              '/images-sec-5/5-2.jpg'
            )}
          >
            <div className="w-36 h-26 sm:w-44 sm:h-32 shrink-0 overflow-hidden bg-slate-100" style={{ borderRadius: 0 }}>
              <img 
                src="/images-sec-5/5-2.jpg" 
                alt="لوجو القاهرة" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1 grow text-right">
              <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-1.5 block">رياضة</span>
              <h4 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug line-clamp-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
                من صمم لوجو القاهرة المشبوه؟
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-['Alexandria']">
                تشابه إلى حد كبير مع تصميمات شركة تنمية زراعية إيطالية، في واقعة أعادت إلى الأذهان سرقة تصميمات مترو الأنفاق
              </p>
            </div>
          </div>

          {/* Dotted Divider 1 */}
          <div className="border-t border-dotted border-slate-300 w-full mb-5"></div>

          {/* Small Article 2 */}
          <div 
            className="group flex flex-row gap-4 cursor-pointer items-start py-5 w-full" 
            onClick={() => onArticleClick(
              'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
              'رياضة',
              'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان',
              '/images-sec-5/1-1.jpg'
            )}
          >
            <div className="w-36 h-26 sm:w-44 sm:h-32 shrink-0 overflow-hidden bg-slate-100" style={{ borderRadius: 0 }}>
              <img 
                src="/images-sec-5/1-1.jpg" 
                alt="المتحف المصري" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex-1 grow text-right">
              <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-1.5 block">رياضة</span>
              <h4 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug line-clamp-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
                اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-['Alexandria']">
                لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان
              </p>
            </div>
          </div>

          {/* Dotted Divider 2 */}
          <div className="border-t border-dotted border-slate-300 w-full mb-5"></div>

          {/* Small Article 3 */}
          <div 
            className="group flex flex-row gap-4 cursor-pointer items-start pt-5 w-full" 
            onClick={() => onArticleClick(
              'علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير',
              'رياضة',
              'نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التليفزيونية',
              '/images-sec-5/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg'
            )}
          >
            <div className="w-36 h-26 sm:w-44 sm:h-32 shrink-0 overflow-hidden bg-slate-100" style={{ borderRadius: 0 }}>
              <img 
                src="/images-sec-5/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg" 
                alt="مبارك" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex-1 grow text-right">
              <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-1.5 block">رياضة</span>
              <h4 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug line-clamp-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
                علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-['Alexandria']">
                نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التليفزيونية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Horizontal Dotted Divider */}
      <div className="border-t border-dotted border-slate-300 w-full my-8"></div>

      {/* Bottom Row: 2 Equal-Width Articles Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Bottom Right Card (DOM first → visual right in RTL) */}
        <div 
          className="group flex flex-row gap-4 cursor-pointer items-start w-full md:border-l md:border-dotted md:border-slate-300 md:pl-8 pb-6 md:pb-0" 
          onClick={() => onArticleClick(
            'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
            'رياضة',
            'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان',
            '/images-sec-5/5-2.jpg'
          )}
        >
          <div className="w-36 h-26 sm:w-44 sm:h-32 shrink-0 overflow-hidden bg-slate-100" style={{ borderRadius: 0 }}>
            <img 
              src="/images-sec-5/5-2.jpg" 
              alt="المتحف" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 grow text-right">
            <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-1.5 block">رياضة</span>
            <h4 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug line-clamp-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
              اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
            </h4>
            <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-['Alexandria']">
              لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان
            </p>
          </div>
        </div>

        {/* Bottom Left Card (DOM second → visual left in RTL) */}
        <div 
          className="group flex flex-row gap-4 cursor-pointer items-start w-full md:pr-8 pt-6 md:pt-0" 
          onClick={() => onArticleClick(
            'علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير',
            'رياضة',
            'نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التليفزيونية',
            '/images-sec-5/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg'
          )}
        >
          <div className="w-36 h-26 sm:w-44 sm:h-32 shrink-0 overflow-hidden bg-slate-100" style={{ borderRadius: 0 }}>
            <img 
              src="/images-sec-5/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg" 
              alt="مبارك" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 grow text-right">
            <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-1.5 block">رياضة</span>
            <h4 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug line-clamp-3 font-['Alyamama'] group-active:text-[#155EE7] transition-colors">
              علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير
            </h4>
            <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-['Alexandria']">
              نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التليفزيونية
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
