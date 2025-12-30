import { useState } from 'react';
import { getProperties } from '@/lib/multiProperty';

export function PropertySelector({ onSelect }: { onSelect: (id: string) => void }) {
  const properties = getProperties();
  const [selected, setSelected] = useState(properties[0]?.id || '');

  return (
    <div className="mb-4">
      <label htmlFor="property-select" className="font-semibold mr-2">Select Property:</label>
      <select
        id="property-select"
        value={selected}
        onChange={e => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        className="border rounded px-2 py-1"
      >
        {properties.map(p => (
          <option key={p.id} value={p.id}>{p.headline}</option>
        ))}
      </select>
    </div>
  );
}
