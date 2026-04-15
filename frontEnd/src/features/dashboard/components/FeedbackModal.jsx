import { useState, useEffect, useCallback } from 'react';

/**
 * FeedbackModal — lets the user submit a star rating + optional comment
 * for a completed booking.
 *
 * Props:
 *   booking      – the completed booking object (car name, dates, image)
 *   onClose()    – called when the modal should be dismissed
 *   onSubmit(payload) – called with { bookingId, rating, comment }
 */
export default function FeedbackModal({ booking, onClose, onSubmit }) {
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /* Close on Escape key */
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleSubmit() {
    if (rating === 0) return;
    onSubmit({ bookingId: booking.id, rating, comment });
    setSubmitted(true);
  }

  const active  = hovered || rating;
  const labels  = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10, 14, 27, 0.62)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md bg-surface rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(10,14,27,0.28)', animation: 'modalIn 0.22s ease' }}
      >
        {/* Car image header */}
        <div className="relative h-40 bg-[#111] flex-shrink-0">
          <img
            src={booking.car.image}
            alt={booking.car.name}
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)' }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors duration-150"
          >
            ✕
          </button>
          {/* Car name overlay */}
          <div className="absolute bottom-3 left-4">
            <p className="font-manrope font-bold text-white text-lg leading-tight">{booking.car.name}</p>
            <p className="font-inter text-white/70 text-xs mt-0.5">{booking.dates}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!submitted ? (
            <>
              <h2 className="font-manrope font-bold text-on-surface text-xl mb-1">
                How was your experience?
              </h2>
              <p className="font-inter text-on-surface/50 text-sm mb-5">
                Your honest feedback helps our community make better choices.
              </p>

              {/* Star picker */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-label={`${s} star${s > 1 ? 's' : ''}`}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      style={{
                        fontSize: '2rem',
                        color: s <= active ? '#f59e0b' : 'rgba(0,0,0,0.15)',
                        transform: s <= active ? 'scale(1.18)' : 'scale(1)',
                        transition: 'color 0.15s, transform 0.15s',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        lineHeight: 1,
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span
                  className="font-inter text-sm font-semibold transition-opacity duration-150"
                  style={{
                    color: active ? '#f59e0b' : 'transparent',
                    minHeight: '1.25rem',
                  }}
                >
                  {labels[active]}
                </span>
              </div>

              {/* Comment */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment (optional)…"
                maxLength={400}
                rows={3}
                className="w-full rounded-xl border font-inter text-sm text-on-surface placeholder:text-on-surface/35 resize-none p-3 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  background: 'rgba(0,0,0,0.03)',
                  borderColor: 'rgba(0,0,0,0.10)',
                  focusRingColor: 'var(--color-primary)',
                }}
              />
              <p className="font-inter text-xs text-on-surface/30 text-right mt-1 mb-5">
                {comment.length}/400
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border font-inter font-semibold text-sm text-on-surface/60 py-2.5 hover:bg-black/5 transition-colors duration-150"
                  style={{ borderColor: 'rgba(0,0,0,0.12)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="flex-1 rounded-xl font-inter font-semibold text-sm text-white py-2.5 transition-all duration-150"
                  style={{
                    background: rating === 0
                      ? 'rgba(0,0,0,0.20)'
                      : 'var(--color-primary)',
                    cursor: rating === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Submit Feedback
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="flex flex-col items-center text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
                style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}
              >
                ✓
              </div>
              <h2 className="font-manrope font-bold text-on-surface text-xl mb-2">
                Thank you!
              </h2>
              <p className="font-inter text-on-surface/50 text-sm mb-6">
                Your feedback has been submitted successfully.
              </p>
              <button
                onClick={onClose}
                className="rounded-xl font-inter font-semibold text-sm text-white px-8 py-2.5 transition-colors duration-150"
                style={{ background: 'var(--color-primary)' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}
