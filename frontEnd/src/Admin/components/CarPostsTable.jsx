import { useState } from "react";
import { Car, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import StatusChip from "../../components/ui/StatusChip";
import ActionButton from "../../components/ui/ActionButton";
import TableHead from "./TableHead";

const PENDING_COLUMNS = ["STATUS", "CAR MODEL", "OWNER", "PRICE / DAY", "DATE SUBMITTED", "ACTIONS"];
const APPROVED_COLUMNS = ["STATUS", "CAR MODEL", "OWNER", "PRICE / DAY", "DATE SUBMITTED"];
const GHOST_ROW = "border-b border-[rgba(99,102,120,0.08)] last:border-0";
const CELL = "px-6 py-4";

function CarThumbnail() {
  return (
    <div className="w-[52px] h-9 rounded-md bg-surface-mid flex items-center justify-center shrink-0 overflow-hidden">
      <Car size={20} className="text-on-surface/30" strokeWidth={1.6} />
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

function EmptyState({ message }) {
  return (
    <p className="px-6 pb-6 font-body text-body-md text-on-surface/40">{message}</p>
  );
}

export default function CarPostsTable({ carPosts, approvedCars = [], onApprove, onReject }) {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <>
      {/* Tab bar */}
      <div className="flex items-center gap-2 px-6 pb-4">
        <TabButton
          label={`Pending (${carPosts.length})`}
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
        <TabButton
          label={`Approved (${approvedCars.length})`}
          active={activeTab === "approved"}
          onClick={() => setActiveTab("approved")}
        />
      </div>

      {/* Pending tab */}
      {activeTab === "pending" && (
        carPosts.length === 0 ? (
          <EmptyState message="No pending car posts — all caught up! 🎉" />
        ) : (
          <table className="w-full">
            <TableHead columns={PENDING_COLUMNS} />
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
                    {c.pricePerDay}
                  </td>
                  <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                    {c.dateSubmitted}
                  </td>
                  <td className={CELL}>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/renter-car-detail/${c.id}`}
                        className="inline-flex items-center gap-1 font-body text-label-sm text-primary font-semibold hover:underline no-underline"
                        title="View car detail"
                      >
                        <ExternalLink size={12} strokeWidth={2} />
                        Review
                      </Link>
                      <ActionButton label="Approve" variant="approve" onClick={() => onApprove(c.id)} />
                      <ActionButton label="Reject" variant="reject" onClick={() => onReject(c.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}

      {/* Approved tab */}
      {activeTab === "approved" && (
        approvedCars.length === 0 ? (
          <EmptyState message="No approved car posts yet." />
        ) : (
          <table className="w-full">
            <TableHead columns={APPROVED_COLUMNS} />
            <tbody>
              {approvedCars.map((c) => (
                <tr key={c.id} className={GHOST_ROW}>
                  <td className={CELL}>
                    <StatusChip label="Approved" variant="verified" />
                  </td>
                  <td className={CELL}>
                    <div className="flex items-center gap-3">
                      <CarThumbnail />
                      <Link
                        to={`/renter-car-detail/${c.id}`}
                        className="font-body font-semibold text-body-md text-primary hover:underline no-underline"
                      >
                        {c.carModel}
                      </Link>
                    </div>
                  </td>
                  <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                    {c.owner}
                  </td>
                  <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                    {c.pricePerDay}
                  </td>
                  <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
                    {c.dateSubmitted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </>
  );
}
