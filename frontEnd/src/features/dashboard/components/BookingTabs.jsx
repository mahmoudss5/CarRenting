const TABS = [
  { id: 'all', label: 'All Bookings' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];

/**
 * Underline-style tab navigation.
 */
export default function BookingTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-8 mb-8 border-b border-outline-variant/20">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={[
            'pb-3 font-inter text-[0.9375rem] font-medium transition-colors duration-200 -mb-px',
            activeTab === tab.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface/50 hover:text-on-surface border-b-2 border-transparent',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
