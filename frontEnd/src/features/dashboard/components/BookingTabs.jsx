const TABS = [
  { id: 'all',       label: 'All Bookings' },
  { id: 'pending',   label: 'Pending'      },
  { id: 'upcoming',  label: 'Upcoming'     },
  { id: 'completed', label: 'Completed'    },
];

/**
 * Underline-style tab navigation with an optional badge on Pending.
 */
export default function BookingTabs({ activeTab, onTabChange, pendingCount = 0 }) {
  return (
    <div className="flex gap-8 mb-8 border-b border-outline-variant/20">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={[
            'pb-3 font-inter text-[0.9375rem] font-medium transition-colors duration-200 -mb-px flex items-center gap-2',
            activeTab === tab.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-on-surface/50 hover:text-on-surface border-b-2 border-transparent',
          ].join(' ')}
        >
          {tab.label}
          {tab.id === 'pending' && pendingCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.6rem] font-bold text-white"
              style={{ background: '#d97706' }}>
              {pendingCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
