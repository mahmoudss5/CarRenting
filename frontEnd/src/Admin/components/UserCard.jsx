export default function UserCard({ user, onApprove, onReject }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <div>
        {user.ownerName} - {user.email}
      </div>

      <button onClick={() => onApprove(user.id)}>Approve</button>
      <button onClick={() => onReject(user.id)}>Reject</button>
    </div>
  );
}