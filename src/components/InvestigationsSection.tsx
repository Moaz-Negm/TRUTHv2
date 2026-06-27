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
    <section className="mb-3 bg-[#f4f8fc] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10" id="investigations-section" dir="rtl">
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
        {/* RIGHT: Big Featured Article (lg:col-span-6, first in DOM for RTL → visual right) */}
        <div
          className="lg:col-span-6 min-w-0 flex flex-col group cursor-pointer lg:pl-8 lg:border-l lg:border-dotted lg:border-slate-300 pb-8 lg:pb-0"
          onClick={() => onArticleClick(
            'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
            'رياضة',
            'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان',
            '/images-sec-5/1-1.jpg'
          )}
        >
          <div
            style={{
              width: '580px',
              height: '309px',
              opacity: 1,
              transform: 'rotate(0deg)',
              overflow: 'hidden',
              borderRadius: 0
            }}
            className="bg-slate-100 mb-4"
          >
            <img
              src="/images-sec-5/1-1.jpg"
              alt="المتحف المصري الكبير"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#155EE7] font-['Alexandria'] font-normal text-[14px] leading-[1.4] mb-2 block">رياضة</span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              padding: '0px',
              gap: '6px',
              width: '100%',
              maxWidth: '580px',
              height: '112px',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0,
            }}
          >
            <h3
              style={{
                width: '100%',
                maxWidth: '580px',
                height: '86px',
                fontFamily: "'Alyamama'",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '120%',
                textAlign: 'right',
                color: '#070B16',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
              className="group-active:text-[#155EE7] transition-colors"
            >
              اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
            </h3>
            <p
              style={{
                width: '100%',
                maxWidth: '580px',
                height: '20px',
                fontFamily: "'Alexandria'",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                textAlign: 'right',
                color: '#565A63',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان
            </p>
          </div>
        </div>

        {/* LEFT: Small Articles Stacked (lg:col-span-6, second in DOM for RTL → visual left) */}
        {/* Figma Spec: width: 580px; height: 484px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0px; gap: 24px; */}
        <div
          className="lg:col-span-6 min-w-0 flex flex-col justify-start items-start p-0 gap-6 lg:pr-8 pt-8 lg:pt-0"
          style={{ width: '580px', height: '484px', flex: 'none', order: 0, flexGrow: 0 }}
          id="investigations-left-stack"
        >
          {/* Small Article 1 */}
          <div
            className="group flex flex-row justify-end items-start p-0 gap-6 cursor-pointer w-full"
            style={{ width: '580px', height: '218px', flex: 'none', order: 0, flexGrow: 0 }}
            onClick={() => onArticleClick(
              'من صمم لوجو القاهرة المشبوه؟',
              'رياضة',
              'تشابه إلى حد كبير مع تصميمات شركة تنمية زراعية إيطالية، في واقعة أعادت إلى الأذهان سرقة تصميمات مترو الأنفاق',
              '/images-sec-6/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg'
            )}
          >
            {/* Rectangle 10 (Image container) on the right */}
            <div
              style={{ width: '273px', height: '161px', flex: 'none', order: 0, flexGrow: 0, overflow: 'hidden' }}
            >
              <img
                src="/images-sec-6/feae664ae8bb95dfd02f9ac08309dc44a67d5211.jpg"
                alt="لوجو القاهرة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text container on the left */}
            <div
              className="flex flex-col items-end p-0 gap-3"
              style={{ width: '283px', height: '170px', flex: 'none', order: 1, flexGrow: 1 }}
            >
              <span
                style={{
                  width: '283px',
                  height: '20px',
                  fontFamily: 'Alexandria',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'right',
                  color: '#155EE7',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}
              >
                رياضة
              </span>

              <div
                className="flex flex-col items-end p-0 gap-1.5"
                style={{ width: '283px', height: '138px', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}
              >
                <h4
                  style={{
                    width: '283px',
                    height: '72px',
                    fontFamily: 'Alyamama',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '28px',
                    lineHeight: '130%',
                    textAlign: 'right',
                    color: '#070B16',
                    flex: 'none',
                    order: 0,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  من صمم لوجو القاهرة المشبوه؟
                </h4>

                <p
                  style={{
                    width: '283px',
                    height: '60px',
                    fontFamily: 'Alexandria',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    textAlign: 'right',
                    color: '#565A63',
                    flex: 'none',
                    order: 1,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  تشابه إلى حد كبير مع تصميمات شركة تنمية زراعية إيطالية، في واقعة أعادت إلى الأذهان سرقة تصميمات مترو الأنفاق
                </p>
              </div>
            </div>
          </div>

          {/* Line 4 (Divider) */}
          <div
            className="border-t border-dotted w-full mt-2"
            style={{
              height: '0px',
              transform: 'rotate(-180deg)',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
          ></div>

          {/* Small Article 2 */}
          <div
            className="group flex flex-row justify-end items-start p-0 gap-6 cursor-pointer w-full"
            style={{ width: '580px', height: '218px', flex: 'none', order: 2, flexGrow: 0 }}
            onClick={() => onArticleClick(
              'اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات',
              'رياضة',
              'لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان',
              '/images-sec-6/2de6dab241d3eea71ef2bc6e0f07ddbbdf59ded8.jpg'
            )}
          >
            {/* Rectangle 10 (Image container) on the right */}
            <div
              style={{ width: '273px', height: '161px', flex: 'none', order: 0, flexGrow: 0, overflow: 'hidden' }}
            >
              <img
                src="/images-sec-6/2de6dab241d3eea71ef2bc6e0f07ddbbdf59ded8.jpg"
                alt="المتحف المصري"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text container on the left */}
            <div
              className="flex flex-col items-end p-0 gap-3"
              style={{ width: '283px', height: '206px', flex: 'none', order: 1, flexGrow: 1 }}
            >
              <span
                style={{
                  width: '283px',
                  height: '20px',
                  fontFamily: 'Alexandria',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'right',
                  color: '#155EE7',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}
              >
                رياضة
              </span>

              {/* Title & snippet container */}
              <div
                className="flex flex-col items-end p-0 gap-1.5"
                style={{ width: '283px', height: '174px', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}
              >
                <h4
                  style={{
                    width: '283px',
                    height: '108px',
                    fontFamily: 'Alyamama',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '28px',
                    lineHeight: '130%',
                    textAlign: 'right',
                    color: '#070B16',
                    flex: 'none',
                    order: 0,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
                </h4>

                {/* Snippet */}
                <p
                  style={{
                    width: '283px',
                    height: '60px',
                    fontFamily: 'Alexandria',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    textAlign: 'right',
                    color: '#565A63',
                    flex: 'none',
                    order: 1,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Horizontal Dotted Divider */}
      <div className="border-t border-dotted border-slate-300 w-full my-8"></div>

      {/* Bottom Row: 2 Equal-Width Articles Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-7">
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
            <span
              style={{
                fontFamily: "'Alexandria'",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                textAlign: 'right',
                color: '#155EE7',
              }}
              className="mb-1.5 block"
            >
              رياضة
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '6px',
                width: '320px',
                height: '104px',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              <h4
                style={{
                  width: '320px',
                  height: '58px',
                  fontFamily: "'Alyamama'",
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '130%',
                  textAlign: 'right',
                  color: '#070B16',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
                className="group-active:text-[#155EE7] transition-colors"
              >
                اليابان لم تحصل على حق انتفاع المتحف المصري الكبير لعشر سنوات
              </h4>
              <p
                style={{
                  width: '320px',
                  height: '40px',
                  fontFamily: "'Alexandria'",
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'right',
                  color: '#565A63',
                  flex: 'none',
                  order: 1,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
              >
                لم تنص أي من اتفاقيتي القرضين على منح حق الانتفاع أو إدارة المتحف المصري الكبير لليابان
              </p>
            </div>
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
            <span
              style={{
                fontFamily: "'Alexandria'",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                textAlign: 'right',
                color: '#155EE7',
              }}
              className="mb-1.5 block"
            >
              رياضة
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '6px',
                width: '320px',
                height: '104px',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
            >
              <h4
                style={{
                  width: '320px',
                  height: '58px',
                  fontFamily: "'Alyamama'",
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '22px',
                  lineHeight: '130%',
                  textAlign: 'right',
                  color: '#070B16',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
                className="group-active:text-[#155EE7] transition-colors"
              >
                علاء وجمال مبارك لم يحضرا حفل افتتاح المتحف المصري الكبير
              </h4>
              <p
                style={{
                  width: '320px',
                  height: '40px',
                  fontFamily: "'Alexandria'",
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'right',
                  color: '#565A63',
                  flex: 'none',
                  order: 1,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}
              >
                نفى علاء مبارك حضور الحفل، مؤكداً أنه تابع الاحتفال من خلال المشاهدة التليفزيونية
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
