const TABLE_HEADERS = ['Owner Name', 'Email Address', 'Date Registered', 'Actions'];

function ActionButton({ onClick, variant, children }) {
  const classes = {
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
 * Pending users table — receives data and handlers as props.
 */
export default function UsersTable({ users, onApprove, onReject }) {
  return (
    <div
      className="bg-surface rounded-xl p-6 mb-6"
      style={{ boxShadow: '0 2px 12px rgba(20, 27, 44, 0.06)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-manrope font-bold text-headline-sm text-on-surface">
          Manage Users
        </h2>
        <span className="font-inter text-[0.875rem] font-semibold text-primary cursor-pointer hover:underline">
          View All Users
        </span>
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
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center font-inter text-body-md text-on-surface/40">
                No pending users.
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-outline-variant/15 hover:bg-surface-container-low/40 transition-colors duration-150"
            >
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs flex-shrink-0">
                    {user.initials}
                  </div>
                  <span className="font-inter font-semibold text-body-md text-on-surface">
                    {user.fullName}
                  </span>
                </div>
              </td>
              <td className="py-4 font-inter text-body-md text-on-surface/60">
                {user.email}
              </td>
              <td className="py-4 font-inter text-body-md text-on-surface/60">
                {user.dateRequested}
              </td>
              <td className="py-4">
                <div className="flex gap-2">
                  <ActionButton variant="approve" onClick={() => onApprove(user.id)}>
                    Approve
                  </ActionButton>
                  <ActionButton variant="reject" onClick={() => onReject(user.id)}>
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
