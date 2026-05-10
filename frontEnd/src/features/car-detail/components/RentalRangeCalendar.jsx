import { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function todayYmdLocal() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, '0');
  const d = String(t.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ymdFromDate(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Inclusive list of yyyy-MM-dd strings from start to end (valid range). */
function eachDayInclusive(startStr, endStr) {
  const out = [];
  const [ys, ms, ds] = startStr.split('-').map(Number);
  const [ye, me, de] = endStr.split('-').map(Number);
  const cur = new Date(ys, ms - 1, ds);
  const end = new Date(ye, me - 1, de);
  while (cur <= end) {
    out.push(ymdFromDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

function rangeTouchesBlocked(startStr, endStr, blockedSet) {
  for (const d of eachDayInclusive(startStr, endStr)) {
    if (blockedSet.has(d)) return true;
  }
  return false;
}

const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Dark-themed range picker: unavailable dates use pink wash + strikethrough (owner blocks + bookings).
 */
export default function RentalRangeCalendar({
  startDate,
  endDate,
  onRangeChange,
  unavailableDates = [],
}) {
  const blockedSet = useMemo(
    () => new Set(unavailableDates.map((s) => String(s).slice(0, 10))),
    [unavailableDates],
  );

  const initialMonth = useMemo(() => {
    if (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      const [y, m] = startDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }, [startDate]);

  const [visibleMonth, setVisibleMonth] = useState(initialMonth);
  const [phase, setPhase] = useState('complete');
  const [hint, setHint] = useState('');

  useEffect(() => {
    setVisibleMonth(initialMonth);
  }, [initialMonth]);

  const today = todayYmdLocal();

  const year = visibleMonth.getFullYear();
  const monthIndex = visibleMonth.getMonth();
  const monthLabel = visibleMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const firstDow = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push({ kind: 'pad' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, monthIndex, d);
    cells.push({ kind: 'day', ymd: ymdFromDate(dt), dt });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ kind: 'pad' });
  }

  const goPrev = () => {
    setVisibleMonth(new Date(year, monthIndex - 1, 1));
    setHint('');
  };
  const goNext = () => {
    setVisibleMonth(new Date(year, monthIndex + 1, 1));
    setHint('');
  };

  const handleDayClick = (ymd) => {
    if (blockedSet.has(ymd)) return;
    if (ymd < today) return;

    if (phase === 'need-second-click') {
      let s = startDate;
      let e = ymd;
      if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        s = ymd;
        e = ymd;
      } else if (e < s) {
        [s, e] = [e, s];
      }
      if (rangeTouchesBlocked(s, e, blockedSet)) {
        setHint('That range includes unavailable dates. Choose different dates.');
        return;
      }
      onRangeChange({ startDate: s, endDate: e });
      setPhase('complete');
      setHint('');
      return;
    }

    onRangeChange({ startDate: ymd, endDate: ymd });
    setPhase('need-second-click');
    setHint('');
  };

  const dayClass = (ymd) => {
    const unavailable = blockedSet.has(ymd);
    const past = ymd < today;
    const inRange =
      startDate &&
      endDate &&
      ymd >= startDate &&
      ymd <= endDate &&
      !unavailable;
    const isStart = ymd === startDate && startDate;
    const isEnd = ymd === endDate && endDate;
    const midRange = inRange && !isStart && !isEnd;

    if (unavailable) {
      return 'rounded-lg bg-rose-200/35 text-rose-900 line-through decoration-rose-700 decoration-2 cursor-not-allowed';
    }
    if (past) {
      return 'rounded-lg text-zinc-600 cursor-not-allowed opacity-40';
    }
    if (isStart || isEnd) {
      return [
        'rounded-lg font-bold text-white shadow-sm cursor-pointer',
        'bg-gradient-to-br from-[#1e40af] to-[#2563eb]',
      ].join(' ');
    }
    if (midRange) {
      return 'rounded-lg bg-sky-500/25 text-sky-100 cursor-pointer hover:bg-sky-500/35';
    }
    return 'rounded-lg text-zinc-100 hover:bg-white/10 cursor-pointer';
  };

  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2a2f3f 0%, #232734 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
        <button
          type="button"
          onClick={goPrev}
          className="p-2 rounded-lg text-zinc-300 hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <span className="font-manrope font-bold text-base text-zinc-100 tracking-tight">{monthLabel}</span>
        <button
          type="button"
          onClick={goNext}
          className="p-2 rounded-lg text-zinc-300 hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent"
          aria-label="Next month"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="px-3 pt-2 pb-1 grid grid-cols-7 gap-y-1">
        {WEEK.map((w) => (
          <div
            key={w}
            className="text-center font-inter text-[0.65rem] font-bold uppercase tracking-[0.08em] text-zinc-500 py-1"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="px-3 pb-3 grid grid-cols-7 gap-1">
        {cells.map((c, idx) => {
          if (c.kind !== 'day') {
            return <div key={`pad-${idx}`} className="aspect-square min-h-[2rem]" />;
          }
          const { ymd } = c;
          const isToday = ymd === today;
          return (
            <button
              key={ymd}
              type="button"
              onClick={() => handleDayClick(ymd)}
              disabled={blockedSet.has(ymd) || ymd < today}
              className={[
                'aspect-square min-h-[2rem] max-h-10 flex items-center justify-center text-sm font-inter transition-colors',
                dayClass(ymd),
                isToday && !blockedSet.has(ymd) && ymd >= today ? 'ring-1 ring-sky-400/50 ring-inset' : '',
              ].join(' ')}
            >
              {c.dt.getDate()}
            </button>
          );
        })}
      </div>

      <div className="px-3 pb-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-3 mt-1">
        <span className="inline-flex items-center gap-2 font-inter text-[0.7rem] text-zinc-400">
          <span className="w-3 h-3 rounded-sm bg-rose-200/50 ring-1 ring-rose-300/40 shrink-0" />
          Unavailable
        </span>
        <span className="inline-flex items-center gap-2 font-inter text-[0.7rem] text-zinc-400">
          <span className="w-3 h-3 rounded-sm bg-sky-500/35 shrink-0" />
          Selected range
        </span>
        <span className="inline-flex items-center gap-2 font-inter text-[0.7rem] text-zinc-400">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}
          />
          Start / end
        </span>
      </div>

      {phase === 'need-second-click' && (
        <p className="px-3 pb-3 font-inter text-[0.7rem] text-sky-300/90">
          Select your return date to finish the range.
        </p>
      )}
      {hint && (
        <p className="px-3 pb-3 font-inter text-[0.7rem] text-amber-300">{hint}</p>
      )}
    </div>
  );
}
