import AvatarInitials from "../../components/ui/AvatarInitials";
import TableHead from "./TableHead";

const COLUMNS = ["OWNER NAME", "EMAIL ADDRESS", "DATE REGISTERED"];
const GHOST_ROW = "border-b border-[rgba(99,102,120,0.08)] last:border-0";
const CELL = "px-6 py-4";

export default function UsersTable({ users }) {
  if (users.length === 0) {
    return (
      <p className="px-6 pb-6 font-body text-body-md text-on-surface/40">
        No pending users.
      </p>
    );
  }

  return (
    <table className="w-full">
      <TableHead columns={COLUMNS} />
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className={GHOST_ROW}>
            <td className={CELL}>
              <div className="flex items-center gap-3">
                <AvatarInitials initials={u.initials} />
                <span className="font-body font-semibold text-body-md text-on-surface">
                  {u.fullName}
                </span>
              </div>
            </td>
            <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
              {u.email}
            </td>
            <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
              {u.dateRegistered}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
