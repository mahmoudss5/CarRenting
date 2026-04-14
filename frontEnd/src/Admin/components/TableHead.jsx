export default function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 px-6 py-3 bg-surface-low/50"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
