import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Manages the hero search form state.
 * Returns values and handlers to be passed into SearchBar.
 */
export function useSearch() {
  const navigate = useNavigate();
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
    const params = new URLSearchParams();

    if (values.location.trim()) params.set('location', values.location.trim());
    if (values.carType) params.set('carType', values.carType);
    if (values.from) params.set('from', values.from);
    if (values.to) params.set('to', values.to);

    const query = params.toString();
    navigate(query ? `/renter-explore?${query}` : '/renter-explore');
  };

  return { values, handleChange, handleSearch };
}
