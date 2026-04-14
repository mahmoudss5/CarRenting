export default function Stats({ users, cars, pending }) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <div>Users: {users}</div>
      <div>Active Cars: {cars}</div>
      <div>Pending: {pending}</div>
    </div>
  );
}