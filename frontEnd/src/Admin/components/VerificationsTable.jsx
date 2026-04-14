import AvatarInitials from "../../components/ui/AvatarInitials";
import ActionButton from "../../components/ui/ActionButton";
import TableHead from "./TableHead";

const COLUMNS = ["APPLICANT", "DRIVER'S LICENSE DOCUMENT", "SUBMISSION DATE", "REVIEW ACTION"];

const GHOST_ROW = "border-b border-[rgba(99,102,120,0.08)] last:border-0";
const CELL = "px-6 py-4";

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function DocLink({ name }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-1.5 text-primary font-body text-body-md no-underline hover:underline"
    >
      <span className="text-on-surface/30"><FileIcon /></span>
      {name}
      <span className="text-on-surface/30"><ExternalLinkIcon /></span>
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
