/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HumanRightsBannerProps {
  onArticleClick: (title: string, category: string, snippet: string, imageUrl?: string) => void;
}

export default function HumanRightsBanner({ onArticleClick }: HumanRightsBannerProps) {
  const bannerData = {
    category: 'حقوق إنسان',
    title: 'لماذا يموت السودانيون على الحدود المصرية؟',
    snippet: 'تسببت درجات الحرارة المرتفعة التي تعرضت لها مصر خلال الأيام الماضية، في وفاة نحو 50 مهاجرًا سودانيًا',
    imageUrl: '/images-sec-4/sudan.jpg',
  };

  return (
    <div className="mb-12">
      <div
        onClick={() => onArticleClick(bannerData.title, bannerData.category, bannerData.snippet, bannerData.imageUrl)}
        className="overflow-hidden grid grid-cols-1 md:grid-cols-2 cursor-pointer shadow-3xs border border-slate-100"
        id="human-rights-banner"
        dir="rtl"
      >

        {/* Right Column in RTL: Beautiful Desert Landscape Image (renders on the right visually) */}
        <div className="h-60 sm:h-auto overflow-hidden bg-slate-900 relative">
          <img
            src={bannerData.imageUrl}
            alt={bannerData.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Subtle radial shading overlay fading from text container */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/40 to-transparent pointer-events-none" />
        </div>

        {/* Left Column in RTL: Solid Block with centered text (renders on the left visually) */}
        <div
          style={{
            background: '#070B16',
            color: '#ffffff'
          }}
          className="p-8 sm:p-10 flex flex-col justify-center items-center text-center select-none"
        >
          <span
            style={{
              fontFamily: 'Alexandria',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '140%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#3B82F6'
            }}
            className="mb-3 block"
          >
            {bannerData.category}
          </span>
          <h3
            style={{
              fontFamily: 'Alyamama',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '36px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#ffffff'
            }}
            className="mb-4 max-w-md mx-auto"
          >
            لماذا يموت السودانيون<br />على الحدود المصرية؟
          </h3>
          <p
            style={{
              width: '344px',
              height: '40px',
              fontFamily: 'Alexandria',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              textAlign: 'center',
              color: '#9BBBF5',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
            className="mx-auto"
          >
            {bannerData.snippet}
          </p>
        </div>

      </div>
      <div className="border-t border-dotted border-blue-200 w-full mt-5" style={{ height: '0px' }}></div>
    </div>
  );
}
