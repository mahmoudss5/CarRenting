import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, ExternalLink } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { INITIAL_VERIFICATIONS } from "../mockData";
import AvatarInitials from "../../components/ui/AvatarInitials";
import ActionButton from "../../components/ui/ActionButton";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

function DocLink({ name }) {
  return (
    <a href="#"
      className="inline-flex items-center gap-1.5 no-underline font-body text-body-md"
      style={{ color: "#0891b2" }}>
      <FileText size={13} className="opacity-60" strokeWidth={2} />
      {name}
      <ExternalLink size={11} className="opacity-60" strokeWidth={2} />
    </a>
  );
}

export default function AdminVerificationsPage() {
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const approve = (id) => {
    const v = verifications.find((x) => x.id === id);
    setVerifications((prev) => prev.filter((x) => x.id !== id));
    setApproved((prev) => [...prev, { ...v, resolvedAt: "Just now" }]);
  };

  const reject = (id) => {
    const v = verifications.find((x) => x.id === id);
    setVerifications((prev) => prev.filter((x) => x.id !== id));
    setRejected((prev) => [...prev, { ...v, resolvedAt: "Just now" }]);
  };

  return (
    <AdminLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={fadeUp}
          className="rounded-2xl p-7 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)" }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Identity Verification</p>
            <h1 className="text-white font-display font-extrabold text-2xl mb-1">Renter Verifications</h1>
            <p className="text-white/65 text-sm">Review driver's license submissions and approve or reject renters.</p>
          </div>
        </motion.div>

        {/* Summary row */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending",  value: verifications.length, gradient: "linear-gradient(135deg,#d97706,#f59e0b)" },
            { label: "Approved", value: approved.length,      gradient: "linear-gradient(135deg,#059669,#34d399)" },
            { label: "Rejected", value: rejected.length,      gradient: "linear-gradient(135deg,#e11d48,#f87171)" },
          ].map(({ label, value, gradient }) => (
            <div key={label} className="rounded-xl p-5 text-white flex items-center gap-4"
              style={{ background: gradient }}>
              <ShieldCheck size={24} strokeWidth={1.8} className="opacity-80" />
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-extrabold font-display">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pending Table */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-ambient border border-surface-dim overflow-hidden mb-6">
          <div className="px-6 pt-6 pb-4 border-b border-surface-dim flex items-center gap-3">
            <h2 className="font-display font-bold text-lg text-on-surface">Pending Reviews</h2>
            {verifications.length > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)" }}>
                {verifications.length} Pending
              </span>
            )}
          </div>

          {verifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <ShieldCheck size={26} className="text-emerald-500" strokeWidth={1.8} />
              </div>
              <p className="font-body font-semibold text-on-surface/60">All verifications cleared!</p>
              <p className="font-body text-body-md text-on-surface/35 mt-1">No pending reviews at the moment.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-dim">
                  {["Applicant", "Driver's License", "Submitted", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {verifications.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-[rgba(99,102,120,0.07)] last:border-0 hover:bg-surface-low/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarInitials initials={v.initials} />
                        <div>
                          <p className="font-body font-semibold text-body-md text-on-surface">{v.name}</p>
                          <p className="font-body text-label-sm text-on-surface/45">{v.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><DocLink name={v.documentName} /></td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/55">{v.submittedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ActionButton label="Approve" variant="approve" onClick={() => approve(v.id)} />
                        <ActionButton label="Reject"  variant="reject"  onClick={() => reject(v.id)}  />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Resolved Table */}
        {(approved.length > 0 || rejected.length > 0) && (
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-ambient border border-surface-dim overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-surface-dim">
              <h2 className="font-display font-bold text-lg text-on-surface">Resolved This Session</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-dim">
                  {["Applicant", "Document", "Decision", "Resolved"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...approved.map((v) => ({ ...v, decision: "approved" })), ...rejected.map((v) => ({ ...v, decision: "rejected" }))].map((v) => (
                  <tr key={v.id + v.decision} className="border-b border-[rgba(99,102,120,0.07)] last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarInitials initials={v.initials} />
                        <span className="font-body font-semibold text-body-md text-on-surface">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><DocLink name={v.documentName} /></td>
                    <td className="px-6 py-4">
                      {v.decision === "approved" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase"
                          style={{ background: "#dcfce7", color: "#166534" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase"
                          style={{ background: "#ffe4e6", color: "#9f1239" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/45">{v.resolvedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

      </motion.div>
    </AdminLayout>
  );
}
