import { useState } from 'react';

/**
 * Manages the hero search form state.
 * Returns values and handlers to be passed into SearchBar.
 */
export function useSearch() {
  const [values, setValues] = useState({
    location: '',
    from: '',
    to: '',
    carType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: navigate to /search?location=...&from=...&to=...&carType=...
    console.log('Search submitted:', values);
  };

  return { values, handleChange, handleSearch };
}
