/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onSubmitClaimClick: () => void;
  onActiveTabChange?: (tab: 'home' | 'analytics' | 'analyzer') => void;
  activeTab?: 'home' | 'analytics' | 'analyzer';
}

export default function Header({
  onSearch,
  onSelectCategory,
  activeCategory,
  onSubmitClaimClick,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ['تصريحات', 'أخبار كاذبة', 'تقارير', 'تحقيقات', 'تعلم'];

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
    setSearchOpen(false);
  };

  // Blue-tinted border color matching the screenshot
  const borderColor = 'border-[#9BBBF5]';

  return (
    <header className="#f5f9ff" id="main-header" dir="rtl">

      {/* LINE 1: Top border of the header */}
      {/* Top bar row — white background */}
      <div className={`bg-[#f5f9ff] border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">

          {/* Right vertical line (touching top/bottom borders) */}
          <div className="absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-[1px] bg-[#9BBBF5] z-10" id="logo-vertical-line"></div>

          {/* Right: Logo */}
          <div
            className="flex items-center cursor-pointer pr-4 relative z-10"
            onClick={() => onSelectCategory('الكل')}
            id="logo-container"
          >
            <img
              src="/images/logo.png"
              alt="صحيح مصر"
              className="h-7 w-auto select-none"
              draggable={false}
              id="header-logo-img"
            />
          </div>

          {/* Left: Search icon + Button */}
          <div className="flex items-center gap-3 pl-4 relative z-10" id="desktop-actions">

            {/* Search: icon only, expands on click — appears on RIGHT in RTL (closer to center) */}
            {searchOpen ? (
              <div className="relative flex items-center w-[212px] h-[43px] border-b border-[#6F9CF1] py-2 gap-[10px] bg-transparent">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="اكتب اسم الشخص هنا..."
                  className="bg-transparent border-none text-[12px] font-normal font-['Alexandria'] text-[#155EE7] placeholder-[#155EE7] text-right w-full h-full focus:outline-none pr-8 pl-6"
                  id="search-input-field"
                />
                <Search className="absolute right-1 top-1/2 -translate-y-1/2 w-[19px] h-[19px] text-[#155EE7]" />
                <button
                  onClick={handleClearSearch}
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#155EE7] cursor-pointer transition-colors p-1"
                  id="btn-close-search"
                  title="إغلاق البحث"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-slate-500 cursor-pointer p-1"
                id="btn-open-search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            )}

            {/* Blue button — appears on far LEFT in RTL */}
            <button
              onClick={onSubmitClaimClick}
              className="px-4 py-1.5 rounded bg-[#155EE7] text-white font-['Alexandria'] font-normal text-[12px] leading-[1.5] cursor-pointer whitespace-nowrap"
              id="btn-submit-claim"
            >
              أرسل ادعاء للتصحيح
            </button>

          </div>

          {/* Left vertical line (touching top/bottom borders) */}
          <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-[1px] bg-[#9BBBF5] z-10" id="button-vertical-line"></div>

        </div>
      </div>

      {/* LINE 2 + LINE 3: borders on nav row */}
      <nav className={`border-t border-b ${borderColor} py-2 bg-[#F5F9FF]`} id="desktop-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 md:gap-10">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`py-1 text-sm font-semibold cursor-pointer nav-link ${isSelected
                    ? 'text-pink-600 font-bold nav-link-active'
                    : 'text-slate-800 hover:text-pink-600'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

    </header>
  );
}
