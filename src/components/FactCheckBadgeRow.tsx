/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface FactCheckBadgeRowProps {
  categoryLabel: string;
  verdictLabel: string;
  size?: 'sm' | 'md';
}

const PINK = '#EC0EC0';

function BadgeConnector({ size }: { size: 'sm' | 'md' }) {
  if (size === 'md') {
    return (
      <svg
        className="fact-check-badge-connector"
        viewBox="0 0 44 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="4" fill={PINK} />
        <rect x="14" y="4.5" width="2.5" height="2.5" fill={PINK} />
        <rect x="18.5" y="4.5" width="2.5" height="2.5" fill={PINK} />
        <rect x="23" y="4.5" width="2.5" height="2.5" fill={PINK} />
        <rect x="27.5" y="4.5" width="2.5" height="2.5" fill={PINK} />
        <rect x="32" y="4.5" width="2.5" height="2.5" fill={PINK} />
        <circle cx="38" cy="6" r="4" fill={PINK} />
      </svg>
    );
  }

  return (
    <svg
      className="fact-check-badge-connector"
      viewBox="0 0 36 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="5" cy="5" r="3.5" fill={PINK} />
      <rect x="11.5" y="3.75" width="2" height="2" fill={PINK} />
      <rect x="15.5" y="3.75" width="2" height="2" fill={PINK} />
      <rect x="19.5" y="3.75" width="2" height="2" fill={PINK} />
      <rect x="23.5" y="3.75" width="2" height="2" fill={PINK} />
      <circle cx="31" cy="5" r="3.5" fill={PINK} />
    </svg>
  );
}

export default function FactCheckBadgeRow({
  categoryLabel,
  verdictLabel,
  size = 'sm',
}: FactCheckBadgeRowProps) {
  const sizeClass = size === 'md' ? 'fact-check-badge-row--md' : 'fact-check-badge-row--sm';

  return (
    <div className={`fact-check-badge-row ${sizeClass}`} dir="rtl">
      <span className="fact-check-badge fact-check-badge--category">{categoryLabel}</span>
      <BadgeConnector size={size} />
      <span className="fact-check-badge fact-check-badge--verdict">{verdictLabel}</span>
    </div>
  );
}
