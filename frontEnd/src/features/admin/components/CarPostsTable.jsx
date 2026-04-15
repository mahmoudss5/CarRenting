import StatusChip from '../../../shared/components/StatusChip';

const TABLE_HEADERS = ['Status', 'Car Model', 'Owner', 'Date Submitted', 'Actions'];

function ActionButton({ onClick, variant, children }) {
  const classes = {
    review:
      'px-3.5 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 bg-surface-container text-on-surface/70 hover:bg-surface-container-high',
    approve:
      'px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-white',
    reject:
      'px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200 bg-[#fce4e4] text-[#b71c1c] hover:bg-[#b71c1c] hover:text-white',
  };

  return (
    <button onClick={onClick} className={classes[variant]}>
      {children}
    </button>
  );
}

/**
 * Pending car posts table — receives data and handlers as props.
 */
export default function CarPostsTable({ carPosts, onApprove, onReject }) {
  return (
    <div
      className="bg-surface rounded-xl p-6"
      style={{ boxShadow: '0 2px 12px rgba(20, 27, 44, 0.06)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-manrope font-bold text-headline-sm text-on-surface">
          Manage Car Posts
        </h2>
        <div className="flex gap-2">
          <StatusChip label={`Pending (${carPosts.length})`} variant="pending" />
          <StatusChip label="Approved" variant="electric" />
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            {TABLE_HEADERS.map((h) => (
              <th
                key={h}
                className="text-left font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 pb-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {carPosts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center font-inter text-body-md text-on-surface/40">
                No pending car posts.
              </td>
            </tr>
          )}
          {carPosts.map((post) => (
            <tr
              key={post.id}
              className="border-t border-outline-variant/15 hover:bg-surface-container-low/40 transition-colors duration-150"
            >
              <td className="py-4">
                <StatusChip label="Pending" variant="pending" />
              </td>
              <td className="py-4 font-inter font-semibold text-body-md text-on-surface">
                {post.carModel}
              </td>
              <td className="py-4 font-inter text-body-md text-on-surface/60">
                {post.owner}
              </td>
              <td className="py-4 font-inter text-body-md text-on-surface/60">
                {post.dateSubmitted}
              </td>
              <td className="py-4">
                <div className="flex gap-2">
                  <ActionButton variant="review">Review</ActionButton>
                  <ActionButton variant="approve" onClick={() => onApprove(post.id)}>
                    Approve
                  </ActionButton>
                  <ActionButton variant="reject" onClick={() => onReject(post.id)}>
                    Reject
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
