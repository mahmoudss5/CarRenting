import { FileText, ExternalLink } from "lucide-react";
import AvatarInitials from "../../components/ui/AvatarInitials";
import ActionButton from "../../components/ui/ActionButton";
import TableHead from "./TableHead";

const COLUMNS = ["APPLICANT", "DRIVER'S LICENSE DOCUMENT", "SUBMISSION DATE", "REVIEW ACTION"];
const GHOST_ROW = "border-b border-[rgba(99,102,120,0.08)] last:border-0";
const CELL = "px-6 py-4";

function DocLink({ name }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-1.5 text-primary font-body text-body-md no-underline hover:underline"
    >
      <FileText size={13} className="text-on-surface/30" strokeWidth={2} />
      {name}
      <ExternalLink size={11} className="text-on-surface/30" strokeWidth={2} />
    </a>
  );
}

function ApplicantCell({ initials, name, email }) {
  return (
    <div className="flex items-center gap-3">
      <AvatarInitials initials={initials} />
      <div>
        <p className="font-body font-semibold text-body-md text-on-surface">{name}</p>
        <p className="font-body text-label-sm text-on-surface/45">{email}</p>
      </div>
    </div>
  );
}

export default function VerificationsTable({ verifications, onApprove, onReject }) {
  if (verifications.length === 0) {
    return (
      <p className="px-6 pb-6 font-body text-body-md text-on-surface/40">
        No pending verifications.
      </p>
    );
  }

  return (
    <table className="w-full">
      <TableHead columns={COLUMNS} />
      <tbody>
        {verifications.map((v) => (
          <tr key={v.id} className={GHOST_ROW}>
            <td className={CELL}>
              <ApplicantCell initials={v.initials} name={v.name} email={v.email} />
            </td>
            <td className={CELL}>
              <DocLink name={v.documentName} />
            </td>
            <td className={`${CELL} font-body text-body-md text-on-surface/55`}>
              {v.submittedAt}
            </td>
            <td className={CELL}>
              <div className="flex items-center gap-2">
                <ActionButton label="Approve" variant="approve" onClick={() => onApprove(v.id)} />
                <ActionButton label="Reject" variant="reject" onClick={() => onReject(v.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
