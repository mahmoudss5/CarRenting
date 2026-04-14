export default function CarCard({ car, onApprove, onReject }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <div>
        {car.carModel} - {car.owner}
      </div>

      <button onClick={() => onApprove(car.id)}>Approve</button>
      <button onClick={() => onReject(car.id)}>Reject</button>
    </div>
  );
}