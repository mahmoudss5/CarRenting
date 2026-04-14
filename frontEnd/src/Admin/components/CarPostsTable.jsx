import { useState } from "react";
import StatusChip from "../../components/ui/StatusChip";
import ActionButton from "../../components/ui/ActionButton";
import TableHead from "./TableHead";

const COLUMNS = ["STATUS", "CAR MODEL", "OWNER", "DATE SUBMITTED", "ACTIONS"];
const GHOST_ROW = "border-b border-[rgba(99,102,120,0.08)] last:border-0";
const CELL = "px-6 py-4";

function CarThumbnail() {
  return (
    <div className="w-[52px] h-9 rounded-md bg-surface-mid flex items-center justify-center shrink-0 overflow-hidden">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface/30">
        <path d="M5 11l1.5-4.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
        <rect x="3" y="11" width="18" height="7" rx="1.5" />
        <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
      </svg>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3.5 py-1.5 rounded-full font-body text-label-sm uppercase tracking-[0.05em] transition-colors cursor-pointer border-0",
        active
          ? "bg-primary text-on-primary"
          : "bg-surface-low text-on-surface/50 hover:bg-surface-mid",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function CarPostsTable({ carPosts, onApprove, onReject }) {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <>
      <div className="flex items-center gap-2 px-6 pb-4">
        <TabButton
          label={`Pending (${carPosts.length})`}
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
        <TabButton
          label="Approved"
          active={activeTab === "approved"}
          onClick={() => setActiveTab("approved")}
        />
      </div>

      {activeTab === "approved" ? (
        <p className="px-6 pb-6 font-body text-body-md text-on-surface/40">
          No approved car posts yet.
        </p>
      ) : carPosts.length === 0 ? (
        <p className="px-6 pb-6 font-body text-body-md text-on-surface/40">
          No pending car posts.
        </p>
      ) : (
        <table className="w-full">
          <TableHead columns={COLUMNS} />
          <tbody>
            {carPosts.map((c) => (
              <tr key={c.id} className={GHOST_ROW}>
                <td className={CELL}>
                  <StatusChip label="Pending" variant="pending" />
                </td>
                <td className={CELL}>
                  <div className="flex items-center gap-3">
                    <CarThumbnail />
                    <span className="font-body font-semibold text-body-md text-on-surface">
                      {c.carModel}
                    </span>
                  </div>
                </td>
                <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                  {c.owner}
                </td>
                <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                  {c.dateSubmitted}
                </td>
                <td className={CELL}>
                  <div className="flex items-center gap-2">
                    <ActionButton label="Review" variant="review" />
                    <ActionButton label="Approve" variant="approve" onClick={() => onApprove(c.id)} />
                    <ActionButton label="Reject" variant="reject" onClick={() => onReject(c.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
